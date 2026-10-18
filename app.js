// ============================================================================
// LÒGICA INTERACTIVA DE L'APLICACIÓ — ESPAI CUISENAIRE 6è (DUA · CATALÀ)
// ============================================================================

const state = {
  currentModule: "descomposicio", // laboratori | descomposicio | sumes | restes | multiplicacions | problemes
  selectedLevel: 1,               // "all" | 1 | 2 | 3
  scale: 1,                       // 0.1 | 1 | 10 | 100
  activeChallengeIndex: 0,
  targetRow: "B",                 // "A" | "B"
  rowA: [],                       // Array de valors de regleta (1..10)
  rowB: [],                       // Array de valors de regleta (1..10)
  splitMode: false,               // Mode tisores per descompondre una regleta en dues
  matrixVisible: false,
  customChallenge: null,
  completedIds: JSON.parse(localStorage.getItem("cuisenaire_6e_completed") || "[]"),
  studentMood: localStorage.getItem("cuisenaire_6e_mood") || "practicant",
  studentReflection: localStorage.getItem("cuisenaire_6e_reflection") || "",
  placeValueDigits: [
    { key: "UM", label: "Unitats de Miler (UM)", multiplier: 1000, value: 2 },
    { key: "C",  label: "Centenes (C)",          multiplier: 100,  value: 4 },
    { key: "D",  label: "Desenes (D)",           multiplier: 10,   value: 3 },
    { key: "U",  label: "Unitats (U)",           multiplier: 1,    value: 5 },
    { key: "d",  label: "Dècimes (d)",           multiplier: 0.1,  value: 6 },
    { key: "c",  label: "Centèsimes (c)",        multiplier: 0.01, value: 0 }
  ]
};

// Utilitat per formatar nombres en català (coma decimal i punt de milers)
function formatCatNumber(num) {
  if (typeof num === "string") return num;
  const rounded = Math.round(num * 100) / 100;
  const parts = rounded.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

function getScaledValue(rodUnits) {
  return Math.round(rodUnits * state.scale * 100) / 100;
}

function getRodMeta(val) {
  return CUISENAIRE_RODS.find(r => r.value === val) || CUISENAIRE_RODS[0];
}

// ============================================================================
// SÍNTESI DE VEU EN CATALÀ (WEB SPEECH API - DUA)
// ============================================================================
function speakTextCatalan(text) {
  if (!("speechSynthesis" in window)) {
    alert("El teu navegador no admet síntesi de veu.");
    return;
  }
  window.speechSynthesis.cancel();
  const cleanText = text
    .replace(/×/g, " multiplicat per ")
    .replace(/\+/g, " més ")
    .replace(/ - /g, " menys ")
    .replace(/=/g, " igual a ");

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();
  const catVoice = voices.find(v => v.lang.toLowerCase().includes("ca")) ||
                   voices.find(v => v.lang.toLowerCase().includes("es"));
  if (catVoice) utterance.voice = catVoice;
  utterance.lang = "ca-ES";
  utterance.rate = 0.96;

  const stopBtn = document.getElementById("btnStopSpeak");
  if (stopBtn) stopBtn.style.display = "inline-flex";

  utterance.onend = () => {
    if (stopBtn) stopBtn.style.display = "none";
  };
  utterance.onerror = () => {
    if (stopBtn) stopBtn.style.display = "none";
  };

  window.speechSynthesis.speak(utterance);
}

// ============================================================================
// CREACIÓ VISUAL D'UNA REGLETA DE CUISENAIRE
// ============================================================================
function createRodElement(rodValue, options = {}) {
  const meta = getRodMeta(rodValue);
  const el = document.createElement("div");
  el.className = "cuisenaire-rod";
  const unitPx = options.unitPx || 34;
  el.style.width = `${rodValue * unitPx}px`;
  el.style.backgroundColor = meta.color;
  el.style.borderColor = meta.border;
  el.style.color = meta.text;

  const scaledNumber = formatCatNumber(getScaledValue(rodValue));
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", `Regleta ${meta.name}, valor ${scaledNumber}`);
  el.title = `Regleta ${meta.name} (${scaledNumber})`;

  const labelSpan = document.createElement("span");
  labelSpan.className = "rod-text-span";
  labelSpan.innerHTML = `<span class="rod-code-badge" style="display:none; margin-right:3px;">[${meta.code}]</span>${scaledNumber}`;
  el.appendChild(labelSpan);

  if (options.onClick) {
    el.addEventListener("click", options.onClick);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        options.onClick(e);
      }
    });
  }

  return el;
}

// ============================================================================
// RENDERITZACIÓ DE LA PALETA DE REGLETES I EL REGLE NUMÈRIC
// ============================================================================
function renderPalette() {
  const tray = document.getElementById("rodPaletteTray");
  tray.innerHTML = "";

  CUISENAIRE_RODS.forEach(rod => {
    const item = document.createElement("div");
    item.className = "palette-rod-item";

    const scaledText = formatCatNumber(getScaledValue(rod.value));
    const label = document.createElement("span");
    label.className = "palette-rod-label";
    label.textContent = scaledText;

    const rodEl = createRodElement(rod.value, {
      unitPx: 21, // A la paleta les mostrem compactes perquè hi càpiga la del 10
      onClick: () => addRodToActiveRow(rod.value)
    });

    item.appendChild(label);
    item.appendChild(rodEl);
    item.addEventListener("click", (e) => {
      if (e.target === item || e.target === label) {
        addRodToActiveRow(rod.value);
      }
    });

    tray.appendChild(item);
  });
}

function renderRuler() {
  const ruler = document.getElementById("numberLineRuler");
  ruler.innerHTML = "";
  const maxUnits = 36;

  for (let i = 1; i <= maxUnits; i++) {
    const tick = document.createElement("div");
    const isMajor = i % 5 === 0;
    tick.className = `ruler-tick ${isMajor ? "major-tick" : ""}`;

    if (isMajor || i === 1) {
      const lbl = document.createElement("span");
      lbl.className = "ruler-tick-label";
      lbl.textContent = formatCatNumber(getScaledValue(i));
      tick.appendChild(lbl);
    }
    ruler.appendChild(tick);
  }
}

// ============================================================================
// GESTIÓ DELS REPTES I PROBLEMES ACTIUS
// ============================================================================
function getActiveChallengeList() {
  if (state.customChallenge && state.currentModule === "custom") {
    return [state.customChallenge];
  }
  if (state.currentModule === "laboratori") {
    return [];
  }
  const sourceList = state.currentModule === "problemes"
    ? WORD_PROBLEMS
    : (MODULE_EXERCISES[state.currentModule] || []);

  if (state.selectedLevel === "all") return sourceList;
  const filtered = sourceList.filter(item => item.level === Number(state.selectedLevel));
  return filtered.length > 0 ? filtered : sourceList;
}

function getCurrentChallenge() {
  const list = getActiveChallengeList();
  if (list.length === 0) return null;
  if (state.activeChallengeIndex >= list.length) {
    state.activeChallengeIndex = 0;
  }
  return list[state.activeChallengeIndex];
}

function loadChallengeState() {
  hideFeedback();
  document.getElementById("hintDisplayBox").classList.remove("visible");

  const challengeCard = document.getElementById("challengeCard");
  const problemBar = document.getElementById("problemSolverBar");
  const pvSection = document.getElementById("placeValueSection");
  const verifyBtn = document.getElementById("btnVerifyChallenge");

  if (state.currentModule === "laboratori") {
    challengeCard.style.display = "block";
    problemBar.classList.remove("visible");
    pvSection.classList.add("visible");
    verifyBtn.style.display = "none";

    document.getElementById("challengeBadge").textContent = "🧪 Mode Exploració Lliure";
    document.getElementById("challengeTitle").textContent = "Laboratori Lliure i Tauler de Valor Posicional";
    document.getElementById("challengeInstruction").textContent =
      "Afegeix regletes a la Fila A i a la Fila B per comparar longituds, provar el Mode Tisores ✂️ per partir regletes en dues, visualitzar multiplicacions en matriu o explorar el Tauler de Valor Posicional a sota.";
    document.getElementById("challengeNavGroup").style.display = "none";
    document.getElementById("scaffoldingBar").style.display = "none";

    if (state.rowA.length === 0 && state.rowB.length === 0) {
      state.rowA = [10, 4];
      state.rowB = [8, 6];
    }
    syncScaleButtons();
    renderWorkspace();
    renderPlaceValueBoard();
    return;
  }

  pvSection.classList.remove("visible");
  challengeCard.style.display = "flex";
  document.getElementById("challengeNavGroup").style.display = "flex";
  document.getElementById("scaffoldingBar").style.display = "flex";
  verifyBtn.style.display = "inline-flex";

  const list = getActiveChallengeList();
  const current = getCurrentChallenge();
  if (!current) return;

  // Actualitzem l'escala definida per l'exercici
  state.scale = current.scale || 1;
  syncScaleButtons();

  const isCompleted = state.completedIds.includes(current.id);
  const levelNames = {
    1: "⭐ Principiant",
    2: "⭐⭐ Mitjà",
    3: "⭐⭐⭐ Expert"
  };
  document.getElementById("challengeBadge").textContent =
    `${levelNames[current.level] || "⭐ Repte"} · (${state.activeChallengeIndex + 1}/${list.length}) ${isCompleted ? "✅ Completat" : ""}`;
  document.getElementById("challengeTitle").textContent = current.title;

  if (state.currentModule === "problemes") {
    problemBar.classList.add("visible");
    document.getElementById("challengeInstruction").textContent = `${current.contextIcon} ${current.statement}`;
    document.getElementById("problemQuestionLabel").textContent = current.question;
    document.getElementById("problemUnitSpan").textContent = current.unit || "";
    document.getElementById("problemNumericInput").value = "";

    const pillsContainer = document.getElementById("problemDataPills");
    pillsContainer.innerHTML = "";
    (current.keyData || []).forEach(d => {
      const pill = document.createElement("span");
      pill.className = "data-pill";
      pill.textContent = d;
      pillsContainer.appendChild(pill);
    });

    state.rowA = [];
    state.rowB = [];
    state.targetRow = "B";
    document.getElementById("constraintSummaryText").textContent =
      "Pots construir el teu model amb regletes al tauler i escriure la resposta numèrica.";
  } else {
    problemBar.classList.remove("visible");
    document.getElementById("challengeInstruction").textContent = current.instruction;
    state.rowA = [...(current.referenceRods || [])];
    state.rowB = [...(current.initialRowB || [])];
    state.targetRow = "B";
    document.getElementById("constraintSummaryText").textContent = formatConstraintsText(current.constraints);
  }

  updateTargetRowUI();
  renderWorkspace();
}

function formatConstraintsText(constraints) {
  if (!constraints) return "";
  const parts = [];
  if (constraints.exactCount) parts.push(`Exactament ${constraints.exactCount} regletes`);
  if (constraints.minTotalRods) parts.push(`Mínim ${constraints.minTotalRods} regletes`);
  if (constraints.forbiddenRods && constraints.forbiddenRods.length) {
    const names = constraints.forbiddenRods.map(r => formatCatNumber(getScaledValue(r))).join(", ");
    parts.push(`Sense usar la regleta de ${names}`);
  }
  if (constraints.sameColorOnly) parts.push(`Totes les regletes del mateix color`);
  if (constraints.maxCountOf10) parts.push(`Màxim ${constraints.maxCountOf10} regletes taronges`);
  return parts.length ? `📌 Condició: ${parts.join(" · ")}` : "";
}

// ============================================================================
// MANIPULACIÓ DE REGLETES A LES FILES A I B
// ============================================================================
function addRodToActiveRow(rodValue) {
  hideFeedback();
  const arr = state.targetRow === "A" ? state.rowA : state.rowB;
  const currentSum = arr.reduce((a, b) => a + b, 0);
  if (currentSum + rodValue > 65) {
    showFeedback("Has arribat al límit d'espai de la fila. Elimina alguna regleta abans d'afegir-ne més.", "warning");
    return;
  }
  arr.push(rodValue);
  renderWorkspace();
}

function handleRodOnTrackClick(rowKey, index) {
  hideFeedback();
  const arr = rowKey === "A" ? state.rowA : state.rowB;
  const rodValue = arr[index];

  // Si estem en un exercici guiat i la Fila A és el model de referència, evitem esborrar-la per error
  if (rowKey === "A" && state.currentModule !== "laboratori" && state.currentModule !== "problemes") {
    showFeedback("La Fila A és el model de referència d'aquest repte. Modifica les regletes de la Fila B!", "warning");
    return;
  }

  // Si el Mode Tisores ✂️ està actiu i la regleta és > 1, obrim el selector de descomposició
  if (state.splitMode) {
    if (rodValue <= 1) {
      showFeedback("La regleta blanca (1 unitat) és la més petita i no es pot partir en dues regletes senceres.", "warning");
      return;
    }
    openSplitRodModal(rowKey, index, rodValue);
    return;
  }

  // Altrament, eliminem la regleta amb un clic
  arr.splice(index, 1);
  renderWorkspace();
}

function openSplitRodModal(rowKey, index, rodValue) {
  const modal = document.getElementById("modalSplitRod");
  const subtitle = document.getElementById("splitModalSubtitle");
  const container = document.getElementById("splitOptionsContainer");
  const scaledTotal = formatCatNumber(getScaledValue(rodValue));

  subtitle.textContent = `Tria com vols descompondre la regleta de valor ${scaledTotal} en dues regletes:`;
  container.innerHTML = "";

  for (let a = rodValue - 1; a >= 1; a--) {
    const b = rodValue - a;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tool-btn";
    btn.style.justifyContent = "space-between";
    btn.style.padding = "0.55rem 0.9rem";

    const valA = formatCatNumber(getScaledValue(a));
    const valB = formatCatNumber(getScaledValue(b));
    const metaA = getRodMeta(a);
    const metaB = getRodMeta(b);

    btn.innerHTML = `
      <span>✂️ <strong>${scaledTotal} = ${valA} + ${valB}</strong> (${metaA.name} + ${metaB.name})</span>
      <span style="display:inline-flex; gap:3px; align-items:center;">
        <span style="display:inline-block; width:${a * 14}px; height:16px; background:${metaA.color}; border:1px solid ${metaA.border}; border-radius:3px;"></span>
        <span>+</span>
        <span style="display:inline-block; width:${b * 14}px; height:16px; background:${metaB.color}; border:1px solid ${metaB.border}; border-radius:3px;"></span>
      </span>
    `;

    btn.addEventListener("click", () => {
      const targetArr = rowKey === "A" ? state.rowA : state.rowB;
      targetArr.splice(index, 1, a, b);
      modal.classList.remove("open");
      renderWorkspace();
    });

    container.appendChild(btn);
  }

  modal.classList.add("open");
}

// ============================================================================
// RENDERITZACIÓ DEL TAULER INTERACTIU I DE L'EXPRESSIÓ SIMBÒLICA (CPA)
// ============================================================================
function renderWorkspace() {
  renderPalette();
  renderRuler();

  const trackA = document.getElementById("trackRowA");
  const trackB = document.getElementById("trackRowB");
  trackA.innerHTML = "";
  trackB.innerHTML = "";

  const currentChallenge = getCurrentChallenge();
  const isGuided = state.currentModule !== "laboratori" && state.currentModule !== "problemes";
  trackA.classList.toggle("locked-track", isGuided);

  // Renderitzem Fila A
  if (state.rowA.length === 0) {
    const empty = document.createElement("span");
    empty.className = "track-empty-hint";
    empty.textContent = "Fila A buida (selecciona 'Fila A' a l'esquerra si hi vols afegir regletes)";
    trackA.appendChild(empty);
  } else {
    state.rowA.forEach((val, idx) => {
      trackA.appendChild(createRodElement(val, {
        onClick: () => handleRodOnTrackClick("A", idx)
      }));
    });
  }

  // Renderitzem Fila B
  if (state.rowB.length === 0) {
    const empty = document.createElement("span");
    empty.className = "track-empty-hint";
    empty.textContent = "Fes clic a les regletes de la caixa de l'esquerra per construir aquí el teu tren...";
    trackB.appendChild(empty);
  } else {
    state.rowB.forEach((val, idx) => {
      trackB.appendChild(createRodElement(val, {
        onClick: () => handleRodOnTrackClick("B", idx)
      }));
    });
  }

  // Si hi ha un valor objectiu en el repte, dibuixem la bandera d'objectiu a la Fila B
  if (currentChallenge) {
    const targetUnits = state.currentModule === "problemes"
      ? currentChallenge.targetRodUnits
      : currentChallenge.targetValue;

    if (targetUnits && targetUnits <= 35) {
      const marker = document.createElement("div");
      marker.className = "target-marker-line";
      marker.style.left = `${targetUnits * 34}px`;
      const flag = document.createElement("span");
      flag.className = "target-marker-flag";
      flag.textContent = `Objectiu: ${formatCatNumber(getScaledValue(targetUnits))}`;
      marker.appendChild(flag);
      trackB.appendChild(marker);
    }
  }

  // Actualitzem píndoles de suma i traducció simbòlica CPA
  const sumUnitsA = state.rowA.reduce((a, b) => a + b, 0);
  const sumUnitsB = state.rowB.reduce((a, b) => a + b, 0);
  const valA = getScaledValue(sumUnitsA);
  const valB = getScaledValue(sumUnitsB);

  document.getElementById("sumPillRowA").textContent = formatCatNumber(valA);
  document.getElementById("sumPillRowB").textContent = formatCatNumber(valB);

  document.getElementById("symbolicRowA").textContent = buildSymbolicExpression(state.rowA, valA);
  document.getElementById("symbolicRowB").textContent = buildSymbolicExpression(state.rowB, valB);

  const compEl = document.getElementById("symbolicComparison");
  if (currentChallenge && currentChallenge.operationMode === "subtraction") {
    // En el mòdul de restes mostrem l'equació de resta i complement
    const subUnits = (currentChallenge.initialRowB || []).reduce((a, b) => a + b, 0);
    const addedUnits = Math.max(0, sumUnitsB - subUnits);
    const minText = formatCatNumber(valA);
    const subText = formatCatNumber(getScaledValue(subUnits));
    const diffText = formatCatNumber(getScaledValue(addedUnits));
    compEl.textContent = `${minText} - ${subText} = ${diffText}  (perquè ${subText} + ${diffText} = ${ formatCatNumber(valB) })`;
  } else if (sumUnitsA === sumUnitsB) {
    compEl.textContent = `${formatCatNumber(valA)} = ${formatCatNumber(valB)} (Longituds iguals!)`;
  } else if (sumUnitsB < sumUnitsA) {
    const missing = formatCatNumber(getScaledValue(sumUnitsA - sumUnitsB));
    compEl.textContent = `${formatCatNumber(valB)} < ${formatCatNumber(valA)} (Falten ${missing} per igualar la Fila A)`;
  } else {
    const extra = formatCatNumber(getScaledValue(sumUnitsB - sumUnitsA));
    compEl.textContent = `${formatCatNumber(valB)} > ${formatCatNumber(valA)} (La Fila B supera la Fila A en ${extra})`;
  }

  renderMatrixView();
  updateProgressBadges();
}

function buildSymbolicExpression(rodsArray, totalScaled) {
  if (rodsArray.length === 0) return "0";
  const scaledTerms = rodsArray.map(r => formatCatNumber(getScaledValue(r)));
  const additive = `${scaledTerms.join(" + ")} = ${formatCatNumber(totalScaled)}`;

  // Si hi ha regletes repetides, mostrem també l'agrupació multiplicativa!
  const counts = {};
  rodsArray.forEach(r => { counts[r] = (counts[r] || 0) + 1; });
  const uniqueKeys = Object.keys(counts);
  const hasRepeats = uniqueKeys.some(k => counts[k] > 1);

  if (hasRepeats && rodsArray.length > 1) {
    const multParts = uniqueKeys.map(k => {
      const c = counts[k];
      const v = formatCatNumber(getScaledValue(Number(k)));
      return c > 1 ? `(${c} × ${v})` : v;
    });
    return `${additive}   ⟹   ${multParts.join(" + ")} = ${formatCatNumber(totalScaled)}`;
  }
  return additive;
}

// ============================================================================
// VISTA DE MATRIU / MODEL D'ÀREA PER A MULTIPLICACIONS I PROPIETAT DISTRIBUTIVA
// ============================================================================
function renderMatrixView() {
  const box = document.getElementById("areaMatrixBox");
  if (!state.matrixVisible) {
    box.classList.remove("visible");
    return;
  }
  box.classList.add("visible");

  const rows = Math.max(1, Math.min(10, Number(document.getElementById("matrixRowsInput").value) || 1));
  const cols = Math.max(1, Math.min(18, Number(document.getElementById("matrixColsInput").value) || 1));
  const container = document.getElementById("matrixRowsContainer");
  container.innerHTML = "";

  // Si cols > 10, apliquem visualment la propietat distributiva (10 + resta)!
  const rowDecomposition = cols > 10 ? [10, cols - 10] : [cols];

  for (let r = 0; r < rows; r++) {
    const line = document.createElement("div");
    line.style.display = "flex";
    line.style.gap = "2px";
    rowDecomposition.forEach(part => {
      line.appendChild(createRodElement(part, { unitPx: 26 }));
    });
    container.appendChild(line);
  }

  const formulaEl = document.getElementById("matrixFormulaText");
  const scaledCol = formatCatNumber(getScaledValue(cols));
  const totalVal = formatCatNumber(getScaledValue(rows * cols));

  if (cols > 10) {
    const p1 = formatCatNumber(getScaledValue(10));
    const p2 = formatCatNumber(getScaledValue(cols - 10));
    const prod1 = formatCatNumber(getScaledValue(rows * 10));
    const prod2 = formatCatNumber(getScaledValue(rows * (cols - 10)));
    formulaEl.textContent =
      `Propietat distributiva: ${rows} × ${scaledCol} = ${rows} × (${p1} + ${p2}) = (${rows} × ${p1}) + (${rows} × ${p2}) = ${prod1} + ${prod2} = ${totalVal}`;
  } else {
    formulaEl.textContent = `Àrea del rectangle: ${rows} files × regleta de ${scaledCol} = ${totalVal}`;
  }
}

// ============================================================================
// VALIDACIÓ I RETROALIMENTACIÓ FORMATIVA (DUA)
// ============================================================================
function verifyCurrentChallenge() {
  const current = getCurrentChallenge();
  if (!current) return;

  // 1) Validació de Problemes Contextualitzats
  if (state.currentModule === "problemes") {
    const rawInput = document.getElementById("problemNumericInput").value.trim().replace(",", ".");
    const numericVal = parseFloat(rawInput);
    const sumUnitsB = state.rowB.reduce((a, b) => a + b, 0);
    const modelMatches = sumUnitsB === current.targetRodUnits;
    const inputMatches = !isNaN(numericVal) && Math.abs(numericVal - current.expectedAnswer) < 0.001;

    if (inputMatches || modelMatches) {
      markCompleted(current.id);
      const ansFormatted = formatCatNumber(current.expectedAnswer);
      showFeedback(
        `🎉 Molt bé! Resposta correcta: ${ansFormatted} ${current.unit}. ${current.explanation}`,
        "success"
      );
      document.getElementById("problemNumericInput").value = ansFormatted;
    } else {
      showFeedback(
        `🧭 Revisem-ho junts: escriu el resultat numèric a la casella o construeix el valor amb les regletes a la Fila B (ara mateix la teva Fila B val ${formatCatNumber(getScaledValue(sumUnitsB))}). Fes servir les Pistes 1, 2 o 3 si necessites ajuda!`,
        "warning"
      );
    }
    return;
  }

  // 2) Validació dels mòduls de Descomposició, Sumes, Restes i Multiplicacions
  const sumB = state.rowB.reduce((a, b) => a + b, 0);
  const target = current.targetValue;

  if (sumB !== target) {
    const diff = Math.abs(target - sumB);
    const diffFormatted = formatCatNumber(getScaledValue(diff));
    const currentFormatted = formatCatNumber(getScaledValue(sumB));
    const targetFormatted = formatCatNumber(getScaledValue(target));

    if (sumB < target) {
      showFeedback(
        `📏 Encara no tenen la mateixa longitud: la teva Fila B mesura ${currentFormatted} i l'objectiu és ${targetFormatted}. Et falten ${diffFormatted}!`,
        "warning"
      );
    } else {
      showFeedback(
        `📏 T'has passat una mica: la teva Fila B mesura ${currentFormatted} i l'objectiu és ${targetFormatted}. Et sobren ${diffFormatted}!`,
        "warning"
      );
    }
    return;
  }

  // Comprovem les restriccions pedagògiques del repte
  const c = current.constraints || {};
  if (c.exactCount && state.rowB.length !== c.exactCount) {
    showFeedback(
      `La longitud és correcta (${formatCatNumber(getScaledValue(target))}), però aquest repte demana fer-ho amb exactament ${c.exactCount} regletes (tu n'has posat ${state.rowB.length}).`,
      "warning"
    );
    return;
  }

  if (c.minTotalRods && state.rowB.length < c.minTotalRods) {
    showFeedback(
      `La suma és correcta, però has d'utilitzar com a mínim ${c.minTotalRods} regletes per descompondre el nombre.`,
      "warning"
    );
    return;
  }

  if (c.forbiddenRods && c.forbiddenRods.some(f => state.rowB.includes(f))) {
    const forbiddenNames = c.forbiddenRods.map(f => formatCatNumber(getScaledValue(f))).join(", ");
    showFeedback(
      `Atenció! En aquest repte no es pot fer servir la regleta de valor ${forbiddenNames}. Substitueix-la per altres regletes!`,
      "warning"
    );
    return;
  }

  if (c.maxCountOf10) {
    const tensCount = state.rowB.filter(r => r === 10).length;
    if (tensCount > c.maxCountOf10) {
      showFeedback(
        `Tens ${tensCount} regletes taronges, però el repte demana fer-ne servir com a màxim ${c.maxCountOf10}. Prova de partir una desena amb les tisores ✂️!`,
        "warning"
      );
      return;
    }
  }

  if (c.sameColorOnly) {
    const first = state.rowB[0];
    if (!state.rowB.every(r => r === first)) {
      showFeedback(
        `La longitud és correcta, però el repte demana que totes les regletes de la Fila B siguin del mateix color (parts iguals)!`,
        "warning"
      );
      return;
    }
  }

  if (c.requiredRods && !c.requiredRods.every(req => state.rowB.includes(req))) {
    const reqText = c.requiredRods.map(r => formatCatNumber(getScaledValue(r))).join(" i ");
    showFeedback(
      `La longitud és exacta, però recorda utilitzar les regletes de valor ${reqText} tal com demana l'estratègia del repte.`,
      "warning"
    );
    return;
  }

  // Repte superat!
  markCompleted(current.id);
  showFeedback(`🌟 Excel·lent! Ho has aconseguit! ${current.explanation}`, "success");
  renderWorkspace();
}

function showFeedback(message, type) {
  const banner = document.getElementById("feedbackBanner");
  const msgEl = document.getElementById("feedbackMessage");
  banner.className = `feedback-banner visible ${type}`;
  msgEl.textContent = message;
}

function hideFeedback() {
  const banner = document.getElementById("feedbackBanner");
  if (banner) banner.className = "feedback-banner";
}

function markCompleted(id) {
  if (!id) return;
  if (!state.completedIds.includes(id)) {
    state.completedIds.push(id);
    localStorage.setItem("cuisenaire_6e_completed", JSON.stringify(state.completedIds));
  }
  updateProgressBadges();
}

function getAllChallenges() {
  return [
    ...MODULE_EXERCISES.descomposicio,
    ...MODULE_EXERCISES.sumes,
    ...MODULE_EXERCISES.restes,
    ...MODULE_EXERCISES.multiplicacions,
    ...WORD_PROBLEMS
  ];
}

function updateProgressBadges() {
  document.getElementById("completedCountBadge").textContent = state.completedIds.length;

  const allItems = getAllChallenges();
  const totalStars = allItems
    .filter(item => state.completedIds.includes(item.id))
    .reduce((acc, item) => acc + (item.level || 1), 0);
  const starsBadge = document.getElementById("earnedStarsBadge");
  if (starsBadge) starsBadge.textContent = totalStars;

  ["descomposicio", "sumes", "restes", "multiplicacions"].forEach(mod => {
    const total = MODULE_EXERCISES[mod].length;
    const done = MODULE_EXERCISES[mod].filter(e => state.completedIds.includes(e.id)).length;
    const badge = document.getElementById(`prog-${mod}`);
    if (badge) badge.textContent = `${done}/${total}`;
  });

  const probTotal = WORD_PROBLEMS.length;
  const probDone = WORD_PROBLEMS.filter(p => state.completedIds.includes(p.id)).length;
  const probBadge = document.getElementById("prog-problemes");
  if (probBadge) probBadge.textContent = `${probDone}/${probTotal}`;
}

// ============================================================================
// TAULER DE VALOR POSICIONAL I DESCOMPOSICIÓ POLINÒMICA (6è DE PRIMÀRIA)
// ============================================================================
function renderPlaceValueBoard() {
  const grid = document.getElementById("pvGrid");
  if (!grid) return;
  grid.innerHTML = "";

  state.placeValueDigits.forEach((col, idx) => {
    const card = document.createElement("div");
    card.className = "pv-column";

    const title = document.createElement("div");
    title.className = "pv-col-title";
    title.textContent = col.label;

    const sub = document.createElement("div");
    sub.className = "pv-col-sub";
    sub.textContent = `× ${formatCatNumber(col.multiplier)}`;

    const slot = document.createElement("div");
    slot.className = "pv-rod-slot";
    if (col.value === 0) {
      slot.innerHTML = `<span style="font-weight:800; color:var(--text-muted);">0 (Cap regleta)</span>`;
    } else {
      const meta = getRodMeta(col.value);
      const rodBadge = document.createElement("div");
      rodBadge.className = "cuisenaire-rod";
      rodBadge.style.width = `${Math.max(36, col.value * 14)}px`;
      rodBadge.style.backgroundColor = meta.color;
      rodBadge.style.borderColor = meta.border;
      rodBadge.style.color = meta.text;
      rodBadge.textContent = col.value;
      slot.appendChild(rodBadge);
    }

    const controls = document.createElement("div");
    controls.className = "pv-controls";

    const btnMinus = document.createElement("button");
    btnMinus.type = "button";
    btnMinus.className = "mini-btn";
    btnMinus.textContent = "➖";
    btnMinus.addEventListener("click", () => {
      state.placeValueDigits[idx].value = Math.max(0, col.value - 1);
      renderPlaceValueBoard();
    });

    const valSpan = document.createElement("span");
    valSpan.style.fontWeight = "800";
    valSpan.textContent = col.value;

    const btnPlus = document.createElement("button");
    btnPlus.type = "button";
    btnPlus.className = "mini-btn";
    btnPlus.textContent = "➕";
    btnPlus.addEventListener("click", () => {
      state.placeValueDigits[idx].value = Math.min(9, col.value + 1);
      renderPlaceValueBoard();
    });

    controls.appendChild(btnMinus);
    controls.appendChild(valSpan);
    controls.appendChild(btnPlus);

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(slot);
    card.appendChild(controls);
    grid.appendChild(card);
  });

  // Càlcul del nombre i descomposicions
  let total = 0;
  const posParts = [];
  const polyParts = [];

  state.placeValueDigits.forEach(col => {
    total += col.value * col.multiplier;
    if (col.value > 0) {
      posParts.push(`${col.value} ${col.key}`);
      polyParts.push(`(${col.value} × ${formatCatNumber(col.multiplier)})`);
    }
  });

  document.getElementById("pvNumberResult").textContent = formatCatNumber(total);
  document.getElementById("pvAdditiveResult").textContent = posParts.length ? posParts.join(" + ") : "0";
  document.getElementById("pvPolynomialResult").textContent = polyParts.length ? polyParts.join(" + ") : "0";
}

// ============================================================================
// ESDEVENIMENTS D'INTERFÍCIE, BARRA DUA I MODALS
// ============================================================================
function syncScaleButtons() {
  document.querySelectorAll(".scale-btn").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.scale) === state.scale);
  });
}

function updateTargetRowUI() {
  const isA = state.targetRow === "A";
  document.getElementById("btnTargetRowA").classList.toggle("active", isA);
  document.getElementById("btnTargetRowB").classList.toggle("active", !isA);
  document.getElementById("trackRowA").classList.toggle("active-target", isA);
  document.getElementById("trackRowB").classList.toggle("active-target", !isA);
}

function renderGlossaryModal() {
  const container = document.getElementById("glossaryListContainer");
  container.innerHTML = "";
  MATH_GLOSSARY.forEach(item => {
    const div = document.createElement("div");
    div.className = "glossary-item";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
        <strong>${item.icon} ${item.term}</strong>
        <button type="button" class="tts-btn" data-speak="${item.term}. ${item.definition}">🔊 Escolta</button>
      </div>
      <p style="margin-top:0.35rem; font-size:0.92rem;">${item.definition}</p>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll("[data-speak]").forEach(btn => {
    btn.addEventListener("click", () => speakTextCatalan(btn.dataset.speak));
  });
}

function renderProgressModal() {
  const container = document.getElementById("progressSummaryCards");
  const modulesInfo = [
    { key: "descomposicio",   label: "🧩 Descomposició",   total: MODULE_EXERCISES.descomposicio.length },
    { key: "sumes",           label: "➕ Sumes",           total: MODULE_EXERCISES.sumes.length },
    { key: "restes",          label: "➖ Restes",          total: MODULE_EXERCISES.restes.length },
    { key: "multiplicacions", label: "✖️ Multiplicacions", total: MODULE_EXERCISES.multiplicacions.length },
    { key: "problemes",       label: "📖 Problemes",       total: WORD_PROBLEMS.length }
  ];

  container.innerHTML = "";
  modulesInfo.forEach(m => {
    const source = m.key === "problemes" ? WORD_PROBLEMS : MODULE_EXERCISES[m.key];
    const completedItems = source.filter(item => state.completedIds.includes(item.id));
    const done = completedItems.length;
    const earnedStars = completedItems.reduce((acc, item) => acc + (item.level || 1), 0);
    const maxStars = source.reduce((acc, item) => acc + (item.level || 1), 0);

    const card = document.createElement("div");
    card.className = "symbolic-card";
    card.innerHTML = `
      <span class="symbolic-label">${m.label}</span>
      <div class="symbolic-equation">${done} / ${m.total} reptes ${done === m.total ? "🏆" : ""}</div>
      <div style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">
        ⭐ ${earnedStars} / ${maxStars} estrelles
      </div>
    `;
    container.appendChild(card);
  });

  // Resum per nivell d'estrelles (⭐ Principiant, ⭐⭐ Mitjà, ⭐⭐⭐ Expert)
  const allItems = getAllChallenges();
  [
    { level: 1, title: "⭐ Nivell Principiant (1 estrella)" },
    { level: 2, title: "⭐⭐ Nivell Mitjà (2 estrelles)" },
    { level: 3, title: "⭐⭐⭐ Nivell Expert (3 estrelles)" }
  ].forEach(lvl => {
    const lvlItems = allItems.filter(i => i.level === lvl.level);
    const lvlDone = lvlItems.filter(i => state.completedIds.includes(i.id)).length;
    const card = document.createElement("div");
    card.className = "symbolic-card";
    card.style.borderColor = "var(--accent)";
    card.innerHTML = `
      <span class="symbolic-label">${lvl.title}</span>
      <div class="symbolic-equation" style="color:var(--accent);">${lvlDone} / ${lvlItems.length} superats</div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll("#moodSelector .mood-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.mood === state.studentMood);
  });
  document.getElementById("studentReflectionInput").value = state.studentReflection;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Barra d'accessibilitat DUA
  const btnToggleDua = document.getElementById("btnToggleDuaPanel");
  const duaPanel = document.getElementById("duaToolbarPanel");
  btnToggleDua.addEventListener("click", () => {
    const isOpen = duaPanel.classList.toggle("open");
    btnToggleDua.classList.toggle("active", isOpen);
    btnToggleDua.setAttribute("aria-expanded", String(isOpen));
  });

  // Tipografia Lectura Fàcil / Dislèxia
  const btnFontStandard = document.getElementById("btnFontStandard");
  const btnFontDyslexia = document.getElementById("btnFontDyslexia");
  btnFontStandard.addEventListener("click", () => {
    document.body.classList.remove("dyslexia-mode");
    btnFontStandard.classList.add("active");
    btnFontDyslexia.classList.remove("active");
  });
  btnFontDyslexia.addEventListener("click", () => {
    document.body.classList.add("dyslexia-mode");
    btnFontDyslexia.classList.add("active");
    btnFontStandard.classList.remove("active");
  });

  // Mida de lletra
  document.querySelectorAll("[data-fontsize]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-fontsize]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.body.classList.remove("font-large", "font-xlarge");
      if (btn.dataset.fontsize === "large") document.body.classList.add("font-large");
      if (btn.dataset.fontsize === "xlarge") document.body.classList.add("font-xlarge");
    });
  });

  // Tema visual (Clar, Fosc, Alt Contrast)
  document.querySelectorAll("[data-theme]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-theme]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.body.classList.remove("theme-dark", "theme-contrast");
      if (btn.dataset.theme === "dark") document.body.classList.add("theme-dark");
      if (btn.dataset.theme === "contrast") document.body.classList.add("theme-contrast");
    });
  });

  // Ajuts visuals a les regletes
  const btnTicks = document.getElementById("btnToggleTicks");
  btnTicks.addEventListener("click", () => {
    const active = document.body.classList.toggle("show-rod-ticks");
    btnTicks.classList.toggle("active", active);
  });

  const btnColorblind = document.getElementById("btnToggleColorblind");
  btnColorblind.addEventListener("click", () => {
    const active = document.body.classList.toggle("colorblind-mode");
    btnColorblind.classList.toggle("active", active);
  });

  const btnBlindNumbers = document.getElementById("btnToggleBlindNumbers");
  btnBlindNumbers.addEventListener("click", () => {
    const active = document.body.classList.toggle("hide-rod-numbers");
    btnBlindNumbers.classList.toggle("active", active);
  });

  // 2. Navegació per pestanyes de mòduls
  document.querySelectorAll("#moduleTabs .nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#moduleTabs .nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentModule = tab.dataset.module;
      state.activeChallengeIndex = 0;
      loadChallengeState();
    });
  });

  // 3. Selector de nivell DUA (1, 2, 3)
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedLevel = btn.dataset.level === "all" ? "all" : Number(btn.dataset.level);
      state.activeChallengeIndex = 0;
      loadChallengeState();
    });
  });

  // 4. Selector d'escala de valor (×0,1, ×1, ×10, ×100)
  document.querySelectorAll(".scale-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scale = Number(btn.dataset.scale);
      syncScaleButtons();
      renderWorkspace();
    });
  });

  // 5. Navegació Anterior / Següent repte
  document.getElementById("btnPrevChallenge").addEventListener("click", () => {
    const list = getActiveChallengeList();
    if (!list.length) return;
    state.activeChallengeIndex = (state.activeChallengeIndex - 1 + list.length) % list.length;
    loadChallengeState();
  });

  document.getElementById("btnNextChallenge").addEventListener("click", () => {
    const list = getActiveChallengeList();
    if (!list.length) return;
    state.activeChallengeIndex = (state.activeChallengeIndex + 1) % list.length;
    loadChallengeState();
  });

  // 6. Síntesi de veu en català
  document.getElementById("btnSpeakInstruction").addEventListener("click", () => {
    const title = document.getElementById("challengeTitle").textContent;
    const text = document.getElementById("challengeInstruction").textContent;
    speakTextCatalan(`${title}. ${text}`);
  });

  document.getElementById("btnStopSpeak").addEventListener("click", () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    document.getElementById("btnStopSpeak").style.display = "none";
  });

  document.getElementById("btnSpeakHint").addEventListener("click", () => {
    speakTextCatalan(document.getElementById("hintTextContent").textContent);
  });

  document.getElementById("btnSpeakFeedback").addEventListener("click", () => {
    speakTextCatalan(document.getElementById("feedbackMessage").textContent);
  });

  // 7. Pistes graduades DUA (1, 2, 3)
  document.querySelectorAll(".hint-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = getCurrentChallenge();
      if (!current || !current.hints) return;
      const idx = Number(btn.dataset.hint);
      const hintText = current.hints[idx] || current.hints[0];
      document.getElementById("hintTextContent").textContent = `💡 Pista ${idx + 1}: ${hintText}`;
      document.getElementById("hintDisplayBox").classList.add("visible");
    });
  });

  // 8. Selecció de Fila A / Fila B
  document.getElementById("btnTargetRowA").addEventListener("click", () => {
    if (state.currentModule !== "laboratori" && state.currentModule !== "problemes") {
      showFeedback("En els reptes guiats, la Fila A és el model fix. Afegeix les teves regletes a la Fila B!", "warning");
      return;
    }
    state.targetRow = "A";
    updateTargetRowUI();
  });

  document.getElementById("btnTargetRowB").addEventListener("click", () => {
    state.targetRow = "B";
    updateTargetRowUI();
  });

  // 9. Eines del tauler (Mode Tisores, Ordena, Matriu, Buida, Comprova)
  const btnSplit = document.getElementById("btnSplitMode");
  btnSplit.addEventListener("click", () => {
    state.splitMode = !state.splitMode;
    btnSplit.classList.toggle("active", state.splitMode);
    if (state.splitMode) {
      showFeedback("✂️ Mode Tisores activat: fes clic sobre qualsevol regleta de la Fila B per descompondre-la en dues peces!", "success");
    } else {
      hideFeedback();
    }
  });

  document.getElementById("btnSortRowB").addEventListener("click", () => {
    state.rowB.sort((a, b) => b - a);
    renderWorkspace();
  });

  const btnMatrix = document.getElementById("btnToggleMatrix");
  btnMatrix.addEventListener("click", () => {
    state.matrixVisible = !state.matrixVisible;
    btnMatrix.classList.toggle("active", state.matrixVisible);
    renderMatrixView();
  });

  document.getElementById("matrixRowsInput").addEventListener("input", renderMatrixView);
  document.getElementById("matrixColsInput").addEventListener("input", renderMatrixView);

  document.getElementById("btnBuildMatrixToRowB").addEventListener("click", () => {
    const rows = Math.max(1, Math.min(10, Number(document.getElementById("matrixRowsInput").value) || 1));
    const cols = Math.max(1, Math.min(18, Number(document.getElementById("matrixColsInput").value) || 1));
    const newRods = [];
    for (let i = 0; i < rows; i++) {
      if (cols > 10) {
        newRods.push(10, cols - 10);
      } else {
        newRods.push(cols);
      }
    }
    state.rowB = newRods;
    renderWorkspace();
  });

  document.getElementById("btnClearRowB").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (current && current.operationMode === "subtraction" && current.initialRowB) {
      state.rowB = [...current.initialRowB];
    } else {
      state.rowB = [];
    }
    hideFeedback();
    renderWorkspace();
  });

  document.getElementById("btnVerifyChallenge").addEventListener("click", verifyCurrentChallenge);

  document.getElementById("btnLoadSuggestedModel").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (current && current.suggestedModelRods) {
      state.rowB = [...current.suggestedModelRods];
      renderWorkspace();
      showFeedback("🪄 S'ha carregat el model de regletes del problema a la Fila B. Observa quant sumen en total!", "success");
    }
  });

  document.getElementById("btnResetPlaceValue").addEventListener("click", () => {
    state.placeValueDigits.forEach(d => { d.value = 0; });
    renderPlaceValueBoard();
  });

  // 10. Obertura i tancament de Modals (Glossari, Progrés, Docent)
  document.getElementById("btnOpenGlossary").addEventListener("click", () => {
    renderGlossaryModal();
    document.getElementById("modalGlossary").classList.add("open");
  });

  document.getElementById("btnOpenProgress").addEventListener("click", () => {
    renderProgressModal();
    document.getElementById("modalProgress").classList.add("open");
  });

  document.getElementById("btnOpenTeacherModal").addEventListener("click", () => {
    document.getElementById("modalTeacher").classList.add("open");
  });

  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.closeModal).classList.remove("open");
    });
  });

  // Autoregulació i reflexió de l'alumne
  document.querySelectorAll("#moodSelector .mood-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.studentMood = btn.dataset.mood;
      localStorage.setItem("cuisenaire_6e_mood", state.studentMood);
      renderProgressModal();
    });
  });

  document.getElementById("studentReflectionInput").addEventListener("input", (e) => {
    state.studentReflection = e.target.value;
    localStorage.setItem("cuisenaire_6e_reflection", state.studentReflection);
  });

  document.getElementById("btnResetProgress").addEventListener("click", () => {
    state.completedIds = [];
    localStorage.removeItem("cuisenaire_6e_completed");
    renderProgressModal();
    updateProgressBadges();
  });

  document.getElementById("btnPrintReport").addEventListener("click", () => {
    window.print();
  });

  // Generador de reptes en viu per al docent
  document.getElementById("btnLaunchCustomChallenge").addEventListener("click", () => {
    const title = document.getElementById("customTitleInput").value.trim() || "Repte personalitzat de l'aula";
    const instruction = document.getElementById("customInstructionInput").value.trim() ||
      "Construeix el valor indicat a la Fila B utilitzant les regletes de Cuisenaire.";
    const customLevel = Number(document.getElementById("customLevelSelect")?.value) || 2;
    const targetVal = Math.max(1, Math.min(60, Number(document.getElementById("customTargetInput").value) || 24));
    const customScale = Number(document.getElementById("customScaleSelect").value) || 1;
    const starsStr = "⭐".repeat(customLevel);

    // Construïm les regletes de referència automàticament en base 10
    const refRods = [];
    let rem = targetVal;
    while (rem >= 10) {
      refRods.push(10);
      rem -= 10;
    }
    if (rem > 0) refRods.push(rem);

    state.customChallenge = {
      id: "custom-teacher",
      level: customLevel,
      scale: customScale,
      title,
      instruction,
      targetValue: targetVal,
      referenceRods: refRods,
      constraints: {},
      hints: [
        `Observa el valor de la Fila A: l'objectiu és ${formatCatNumber(targetVal * customScale)}.`,
        "Pots combinar regletes taronges i regletes d'unitats o partir-les amb el Mode Tisores ✂️.",
        `Comprova que la suma de la Fila B sigui igual a ${formatCatNumber(targetVal * customScale)}.`
      ],
      explanation: `Has guanyat ${starsStr}! Has resolt correctament el repte proposat pel mestre/a!`
    };

    document.getElementById("modalTeacher").classList.remove("open");
    state.currentModule = "custom";
    state.activeChallengeIndex = 0;
    loadChallengeState();
  });

  // Inicialització inicial
  loadChallengeState();
});
