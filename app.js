// ============================================================================
// LÒGICA DE L'APLICACIÓ — REGLETES DE CUISENAIRE (INTERFÍCIE SIMPLE I FÀCIL)
// 1) Representar l'operació amb regletes (inclosa Tècnica Italiana en multiplicació)
// 2) Escriure el resultat exacte a la casella després de representar-ho
// ============================================================================

const state = {
  currentModule: "descomposicio", // descomposicio | sumes | restes | multiplicacions | problemes | laboratori
  selectedLevel: 1,               // 1 (⭐ Principiant) | 2 (⭐⭐ Mitjà) | 3 (⭐⭐⭐ Expert)
  activeChallengeIndex: 0,
  hintStep: 0,
  rowA: [],
  rowB: [],
  multRows: [],                   // Files del rectangle per a la multiplicació italiana
  completedIds: JSON.parse(localStorage.getItem("cuisenaire_6e_completed_v2") || "[]")
};

function getRodMeta(val) {
  return CUISENAIRE_RODS.find(r => r.value === val) || CUISENAIRE_RODS[0];
}

// Síntesi de veu en català (DUA)
function speakTextCatalan(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const cleanText = text
    .replace(/×/g, " per ")
    .replace(/\+/g, " més ")
    .replace(/ - /g, " menys ")
    .replace(/=/g, " igual a ");

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();
  const catVoice = voices.find(v => v.lang.toLowerCase().includes("ca")) ||
                   voices.find(v => v.lang.toLowerCase().includes("es"));
  if (catVoice) utterance.voice = catVoice;
  utterance.lang = "ca-ES";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

// Creació d'una regleta horitzontal
function createRodElement(rodValue, options = {}) {
  const meta = getRodMeta(rodValue);
  const el = document.createElement("div");
  el.className = "cuisenaire-rod";
  const unitPx = options.unitPx || 36;
  el.style.width = `${rodValue * unitPx}px`;
  el.style.backgroundColor = meta.color;
  el.style.borderColor = meta.border;
  el.style.color = meta.text;

  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.title = `Regleta ${meta.name} (${rodValue})`;

  const labelSpan = document.createElement("span");
  labelSpan.className = "rod-text-span";
  labelSpan.textContent = rodValue;
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

// Creació d'una regleta VERTICAL (per al factor vertical de la Tècnica Italiana)
function createVerticalRodElement(rodValue) {
  const meta = getRodMeta(rodValue);
  const el = document.createElement("div");
  el.className = "cuisenaire-rod-vertical";
  el.style.height = `${rodValue * 40}px`;
  el.style.backgroundColor = meta.color;
  el.style.borderColor = meta.border;
  el.style.color = meta.text;
  el.title = `Factor vertical: Regleta ${meta.name} (${rodValue})`;

  const labelSpan = document.createElement("span");
  labelSpan.className = "rod-text-span";
  labelSpan.textContent = rodValue;
  el.appendChild(labelSpan);

  return el;
}

// Caixa de regletes de l'1 al 10 a l'esquerra
function renderPalette() {
  const tray = document.getElementById("rodPaletteTray");
  tray.innerHTML = "";

  CUISENAIRE_RODS.forEach(rod => {
    const item = document.createElement("div");
    item.className = "palette-rod-item";

    const label = document.createElement("span");
    label.className = "palette-rod-label";
    label.textContent = rod.value;

    const rodEl = createRodElement(rod.value, {
      unitPx: 19,
      onClick: () => addRodToStudentRow(rod.value)
    });

    item.appendChild(label);
    item.appendChild(rodEl);
    item.addEventListener("click", (e) => {
      if (e.target === item || e.target === label) {
        addRodToStudentRow(rod.value);
      }
    });

    tray.appendChild(item);
  });
}

// Regle numèric superior de l'1 al 36
function renderRuler() {
  const ruler = document.getElementById("numberLineRuler");
  ruler.innerHTML = "";
  for (let i = 1; i <= 36; i++) {
    const tick = document.createElement("div");
    const isMajor = i % 5 === 0;
    tick.className = `ruler-tick ${isMajor ? "major-tick" : ""}`;
    if (isMajor || i === 1) {
      const lbl = document.createElement("span");
      lbl.className = "ruler-tick-label";
      lbl.textContent = i;
      tick.appendChild(lbl);
    }
    ruler.appendChild(tick);
  }
}

// Llista de reptes del mòdul i nivell actual
function getActiveChallengeList() {
  if (state.currentModule === "laboratori") return [];
  const sourceList = state.currentModule === "problemes"
    ? WORD_PROBLEMS
    : (MODULE_EXERCISES[state.currentModule] || []);
  return sourceList.filter(item => item.level === Number(state.selectedLevel));
}

function getCurrentChallenge() {
  const list = getActiveChallengeList();
  if (list.length === 0) return null;
  if (state.activeChallengeIndex >= list.length) {
    state.activeChallengeIndex = 0;
  }
  return list[state.activeChallengeIndex];
}

// Calcula quin és el resultat numèric exacte que l'alumne ha d'escriure
function getExpectedExactResult(current) {
  if (!current) return null;
  if (state.currentModule === "problemes") return current.expectedAnswer;
  if (state.currentModule === "restes") return current.minuend - current.subtrahend;
  return current.targetValue;
}

// Carrega l'enunciat i les regletes inicials del repte
function loadChallengeState() {
  hideFeedback();
  state.hintStep = 0;
  document.getElementById("hintDisplayBox").classList.remove("visible");

  const levelBar = document.getElementById("levelBarSection");
  const problemBar = document.getElementById("problemSolverBar");
  const navGroup = document.getElementById("challengeNavGroup");
  const verifyBtn = document.getElementById("btnVerifyChallenge");
  const hintBtn = document.getElementById("btnShowHint");
  const wrapperRowA = document.getElementById("wrapperRowA");
  const matCanvas = document.getElementById("matCanvas");
  const italianContainer = document.getElementById("italianMultContainer");
  const exactResultBox = document.getElementById("exactResultBox");
  const exactResultLabel = document.getElementById("exactResultLabel");
  const exactResultInput = document.getElementById("exactResultInput");

  exactResultInput.value = "";

  if (state.currentModule === "laboratori") {
    levelBar.style.display = "none";
    problemBar.classList.remove("visible");
    navGroup.style.display = "none";
    verifyBtn.style.display = "none";
    hintBtn.style.display = "none";
    wrapperRowA.style.display = "none";
    matCanvas.style.display = "flex";
    italianContainer.style.display = "none";
    exactResultBox.style.display = "none";

    document.getElementById("challengeBadge").textContent = "🧪 Tauler Lliure";
    document.getElementById("challengeTitle").textContent = "Practica i explora lliurement amb les regletes";
    document.getElementById("challengeInstruction").textContent =
      "Fes clic a les regletes de l'esquerra per posar-les al tauler i veure quant sumen.";
    state.rowA = [];
    state.rowB = [10, 5];
    renderWorkspace();
    return;
  }

  levelBar.style.display = "flex";
  navGroup.style.display = "flex";
  verifyBtn.style.display = "inline-flex";
  hintBtn.style.display = "inline-flex";

  const list = getActiveChallengeList();
  const current = getCurrentChallenge();
  if (!current) return;

  const isCompleted = state.completedIds.includes(current.id);
  const levelNames = {
    1: "⭐ Principiant",
    2: "⭐⭐ Mitjà",
    3: "⭐⭐⭐ Expert"
  };

  document.getElementById("challengeBadge").textContent =
    `${levelNames[current.level]} · Repte ${state.activeChallengeIndex + 1} de ${list.length} ${isCompleted ? "✅" : ""}`;
  document.getElementById("challengeTitle").textContent = current.title;

  // Configurem la casella de resultat exacte per a les operacions (Sumes, Restes, Multiplicacions)
  if (state.currentModule === "sumes") {
    exactResultBox.style.display = "inline-flex";
    const sumExpr = (current.referenceRods || []).join(" + ");
    exactResultLabel.textContent = `✍️ Resultat (${sumExpr} =):`;
  } else if (state.currentModule === "restes") {
    exactResultBox.style.display = "inline-flex";
    exactResultLabel.textContent = `✍️ Resultat (${current.minuend} - ${current.subtrahend} =):`;
  } else if (state.currentModule === "multiplicacions") {
    exactResultBox.style.display = "inline-flex";
    const hTotal = current.hFactorRods.reduce((a, b) => a + b, 0);
    exactResultLabel.textContent = `✍️ Resultat (${current.vFactor} × ${hTotal} =):`;
  } else {
    exactResultBox.style.display = "none";
  }

  if (state.currentModule === "multiplicacions") {
    problemBar.classList.remove("visible");
    matCanvas.style.display = "none";
    italianContainer.style.display = "flex";
    document.getElementById("challengeInstruction").textContent =
      `${current.instruction} Després, escriu el resultat exacte a la casella!`;
    state.multRows = Array.from({ length: current.vFactor }, () => []);
    renderWorkspace();
    return;
  }

  // Resta de mòduls (Descomposició, Sumes, Restes, Problemes)
  matCanvas.style.display = "flex";
  italianContainer.style.display = "none";

  if (state.currentModule === "problemes") {
    problemBar.classList.add("visible");
    wrapperRowA.style.display = "none";
    document.getElementById("challengeInstruction").textContent =
      `${current.contextIcon} ${current.statement} (Representa-ho amb les regletes al tauler i escriu la resposta exacta!)`;
    document.getElementById("problemQuestionLabel").textContent = `✍️ ${current.question}`;
    document.getElementById("problemUnitSpan").textContent = current.unit || "";
    document.getElementById("problemNumericInput").value = "";
    state.rowA = [];
    state.rowB = [];
  } else {
    problemBar.classList.remove("visible");
    wrapperRowA.style.display = "flex";
    const extraPrompt = (state.currentModule === "sumes" || state.currentModule === "restes")
      ? " Després d'usar les regletes, escriu el resultat exacte a la casella!"
      : "";
    document.getElementById("challengeInstruction").textContent = current.instruction + extraPrompt;
    state.rowA = [...(current.referenceRods || [])];
    state.rowB = [...(current.initialRowB || [])];
  }

  renderWorkspace();
}

// Afegir una regleta quan l'alumne fa clic a la paleta de l'esquerra
function addRodToStudentRow(rodValue) {
  hideFeedback();

  // Si som a Multiplicacions (Tècnica Italiana), col·loquem la regleta a la primera fila del rectangle on hi càpiga!
  if (state.currentModule === "multiplicacions") {
    const current = getCurrentChallenge();
    if (!current) return;
    const hTotal = current.hFactorRods.reduce((a, b) => a + b, 0);

    let placed = false;
    for (let r = 0; r < state.multRows.length; r++) {
      const rowSum = state.multRows[r].reduce((a, b) => a + b, 0);
      if (rowSum + rodValue <= hTotal) {
        state.multRows[r].push(rodValue);
        placed = true;
        break;
      }
    }

    if (!placed) {
      const allFull = state.multRows.every(row => row.reduce((a, b) => a + b, 0) === hTotal);
      if (allFull) {
        showFeedback("El rectangle ja està ple! Ara escriu el resultat exacte a la casella i prem '✅ Comprova!'", "success");
      } else {
        showFeedback(`La regleta del ${rodValue} és massa llarga per a l'espai que queda a les files (amplada del factor horitzontal: ${hTotal}). Prova amb una regleta que hi càpiga!`, "warning");
      }
      return;
    }

    renderWorkspace();
    return;
  }

  // Resta de mòduls (tren lineal)
  const currentSum = state.rowB.reduce((a, b) => a + b, 0);
  if (currentSum + rodValue > 36) {
    showFeedback("Ja no hi caben més regletes a la fila! Fes clic en una regleta per treure-la.", "warning");
    return;
  }
  state.rowB.push(rodValue);
  renderWorkspace();
}

function removeRodFromStudentRow(index) {
  hideFeedback();
  const current = getCurrentChallenge();
  if (current && current.operationMode === "subtraction" && current.initialRowB) {
    if (index < current.initialRowB.length) {
      showFeedback(`Aquesta peça (${current.subtrahend}) és la part inicial de la resta. Afegeix al seu costat la peça que falta!`, "warning");
      return;
    }
  }
  state.rowB.splice(index, 1);
  renderWorkspace();
}

function removeRodFromItalianGrid(rowIndex, colIndex) {
  hideFeedback();
  state.multRows[rowIndex].splice(colIndex, 1);
  renderWorkspace();
}

// Renderització del tauler de Multiplicació Estil Tècnica Italiana
function renderItalianMultiplicationBoard(current) {
  const topLabel = document.getElementById("italianTopLabel");
  const topRodsEl = document.getElementById("italianTopRods");
  const leftLabel = document.getElementById("italianLeftLabel");
  const leftRodWrap = document.getElementById("italianLeftRodWrap");
  const interiorArea = document.getElementById("italianInteriorArea");

  const hTotal = current.hFactorRods.reduce((a, b) => a + b, 0);
  const vFactor = current.vFactor;

  if (current.hFactorRods.length > 1) {
    topLabel.textContent = `Factor horitzontal: ${hTotal} (${current.hFactorRods.join(" + ")})`;
  } else {
    topLabel.textContent = `Factor horitzontal: ${hTotal}`;
  }
  leftLabel.textContent = `Factor vertical: ${vFactor}`;

  // Reglet/s del factor horitzontal a dalt
  topRodsEl.innerHTML = "";
  current.hFactorRods.forEach(val => {
    topRodsEl.appendChild(createRodElement(val));
  });

  // Reglet del factor vertical a l'esquerra (en vertical)
  leftRodWrap.innerHTML = "";
  leftRodWrap.appendChild(createVerticalRodElement(vFactor));

  // Rectangle interior a omplir
  interiorArea.innerHTML = "";
  interiorArea.style.width = `${hTotal * 36 + 6}px`;
  interiorArea.style.height = `${vFactor * 40 + 6}px`;

  if (current.hFactorRods.length > 1) {
    let accUnits = 0;
    for (let i = 0; i < current.hFactorRods.length - 1; i++) {
      accUnits += current.hFactorRods[i];
      const divider = document.createElement("div");
      divider.className = "italian-box-divider";
      divider.style.left = `${accUnits * 36}px`;
      interiorArea.appendChild(divider);
    }
  }

  let completedRows = 0;
  for (let r = 0; r < vFactor; r++) {
    const rowEl = document.createElement("div");
    rowEl.className = "italian-interior-row";
    rowEl.style.width = `${hTotal * 36}px`;

    const rowRods = state.multRows[r] || [];
    const rowSum = rowRods.reduce((a, b) => a + b, 0);
    if (rowSum === hTotal) completedRows++;

    rowRods.forEach((val, cIdx) => {
      rowEl.appendChild(createRodElement(val, {
        onClick: () => removeRodFromItalianGrid(r, cIdx)
      }));
    });

    interiorArea.appendChild(rowEl);
  }

  // No revelem el producte total perquè el nen l'hagi de calcular i escriure!
  const symEl = document.getElementById("symbolicRowB");
  const isCompleted = state.completedIds.includes(current.id);
  if (isCompleted) {
    symEl.textContent = `${vFactor} × ${hTotal} = ${current.targetValue}`;
  } else {
    symEl.textContent = `Files del rectangle completes: ${completedRows} de ${vFactor}`;
  }
}

function renderWorkspace() {
  if (state.currentModule === "multiplicacions") {
    const current = getCurrentChallenge();
    if (current) renderItalianMultiplicationBoard(current);
    updateProgressBadges();
    return;
  }

  const trackA = document.getElementById("trackRowA");
  const trackB = document.getElementById("trackRowB");
  trackA.innerHTML = "";
  trackB.innerHTML = "";

  // Fila A (Model)
  state.rowA.forEach(val => {
    trackA.appendChild(createRodElement(val));
  });

  // Fila B (Tren de l'alumne)
  if (state.rowB.length === 0) {
    const empty = document.createElement("span");
    empty.className = "track-empty-hint";
    empty.textContent = "👈 Fes clic a les regletes de l'esquerra per posar-les aquí...";
    trackB.appendChild(empty);
  } else {
    state.rowB.forEach((val, idx) => {
      trackB.appendChild(createRodElement(val, {
        onClick: () => removeRodFromStudentRow(idx)
      }));
    });
  }

  // Bandera d'objectiu visual
  const currentChallenge = getCurrentChallenge();
  const isSolved = currentChallenge && state.completedIds.includes(currentChallenge.id);

  if (currentChallenge && state.currentModule !== "laboratori") {
    const targetUnits = state.currentModule === "problemes"
      ? currentChallenge.targetRodUnits
      : currentChallenge.targetValue;

    if (targetUnits && targetUnits <= 36 && state.currentModule !== "problemes") {
      const marker = document.createElement("div");
      marker.className = "target-marker-line";
      marker.style.left = `${targetUnits * 36}px`;
      const flag = document.createElement("span");
      flag.className = "target-marker-flag";
      // En Sumes no mostrem el número a la bandera per no donar el resultat abans que el nen el calculi!
      flag.textContent = state.currentModule === "sumes" ? "Final de la suma" : `Meta: ${targetUnits}`;
      marker.appendChild(flag);
      trackB.appendChild(marker);
    }
  }

  const sumA = state.rowA.reduce((a, b) => a + b, 0);
  const sumB = state.rowB.reduce((a, b) => a + b, 0);

  // Evitem revelar el resultat de l'operació a les píndoles abans que el nen l'escrigui!
  const pillA = document.getElementById("sumPillRowA");
  const pillB = document.getElementById("sumPillRowB");
  const symEl = document.getElementById("symbolicRowB");

  if (state.currentModule === "sumes" && !isSolved) {
    pillA.textContent = state.rowA.join(" + ");
    pillB.textContent = state.rowB.length ? `${state.rowB.join(" + ")} = ?` : "0";
    symEl.textContent = state.rowB.length ? `${state.rowB.join(" + ")} = ?` : "0";
  } else if (state.currentModule === "restes" && !isSolved) {
    pillA.textContent = sumA;
    pillB.textContent = state.rowB.join(" + ");
    const subUnits = (currentChallenge.initialRowB || []).reduce((a, b) => a + b, 0);
    const addedRods = state.rowB.slice((currentChallenge.initialRowB || []).length);
    symEl.textContent = addedRods.length
      ? `Has afegit: ${addedRods.join(" + ")}  (${sumA} - ${subUnits} = ?)`
      : `Afegeix la regleta que falta de ${subUnits} fins a ${sumA}`;
  } else if (state.currentModule === "problemes" && !isSolved) {
    pillB.textContent = state.rowB.length ? `${state.rowB.join(" + ")} = ?` : "0";
    symEl.textContent = state.rowB.length ? `${state.rowB.join(" + ")} = ?` : "0";
  } else {
    pillA.textContent = sumA;
    pillB.textContent = sumB;
    symEl.textContent = state.rowB.length ? `${state.rowB.join(" + ")} = ${sumB}` : "0";
  }

  updateProgressBadges();
}

// Comprovació: 1r) Representació amb regletes i 2n) Resultat exacte escrit pel nen
function verifyCurrentChallenge() {
  const current = getCurrentChallenge();
  if (!current) return;

  const starsStr = "⭐".repeat(current.level || 1);

  // ==========================================================================
  // 1) MULTIPLICACIONS (TÈCNICA ITALIANA + RESULTAT EXACTE)
  // ==========================================================================
  if (state.currentModule === "multiplicacions") {
    const hTotal = current.hFactorRods.reduce((a, b) => a + b, 0);
    const totalFilled = state.multRows.reduce(
      (acc, row) => acc + row.reduce((a, b) => a + b, 0),
      0
    );
    const allRowsFull = state.multRows.every(
      row => row.reduce((a, b) => a + b, 0) === hTotal
    );

    if (!allRowsFull || totalFilled !== current.targetValue) {
      showFeedback(
        `📏 Primer acaba d'omplir totes les files del rectangle amb les regletes!`,
        "warning"
      );
      return;
    }

    const inputEl = document.getElementById("exactResultInput");
    const writtenVal = parseInt(inputEl.value, 10);
    if (isNaN(writtenVal)) {
      inputEl.focus();
      showFeedback(
        `✅ El rectangle de regletes està perfecte! Ara escriu el resultat exacte de ${current.vFactor} × ${hTotal} a la casella i prem Comprova!`,
        "warning"
      );
      return;
    }

    if (writtenVal !== current.targetValue) {
      inputEl.focus();
      showFeedback(
        `📏 El rectangle de regletes està molt bé, però el resultat escrit (${writtenVal}) no és exacte. Compta bé quant sumen les regletes del rectangle!`,
        "warning"
      );
      return;
    }

    markCompleted(current.id);
    showFeedback(`🌟 Fantàstic! Has representat la multiplicació i has escrit el resultat exacte (${current.targetValue}). Has guanyat ${starsStr}!`, "success");
    renderWorkspace();
    return;
  }

  // ==========================================================================
  // 2) PROBLEMES (REPRESENTACIÓ AMB REGLETES + RESPOSTA EXACTA)
  // ==========================================================================
  if (state.currentModule === "problemes") {
    const inputEl = document.getElementById("problemNumericInput");
    const numericVal = parseInt(inputEl.value, 10);
    const sumB = state.rowB.reduce((a, b) => a + b, 0);

    if (sumB !== current.targetRodUnits) {
      showFeedback(
        `📏 Primer representa el resultat del problema posant les regletes al tauler! (Pots prémer "🪄 Ajuda'm amb les regletes" o "💡 Necessito una pista").`,
        "warning"
      );
      return;
    }

    if (isNaN(numericVal)) {
      inputEl.focus();
      showFeedback(
        `✅ Les regletes estan molt bé! Ara escriu el resultat exacte a la casella de Resposta i prem Comprova!`,
        "warning"
      );
      return;
    }

    if (numericVal !== current.expectedAnswer) {
      inputEl.focus();
      showFeedback(
        `📏 Les regletes del tauler són correctes, però el número escrit (${numericVal}) no coincideix. Compta el valor de les teves regletes!`,
        "warning"
      );
      return;
    }

    markCompleted(current.id);
    showFeedback(`🎉 Molt bé! Has guanyat ${starsStr}! Resposta exacta: ${current.expectedAnswer} ${current.unit}. ${current.explanation}`, "success");
    renderWorkspace();
    return;
  }

  // ==========================================================================
  // 3) DESCOMPOSICIÓ, SUMES I RESTES
  // ==========================================================================
  const sumB = state.rowB.reduce((a, b) => a + b, 0);
  const target = current.targetValue;

  if (sumB !== target) {
    if (sumB < target) {
      showFeedback(`📏 El teu tren de regletes encara és massa curt! Afegeix les regletes que falten per igualar el model.`, "warning");
    } else {
      showFeedback(`📏 T'has passat de llargada amb les regletes! Fes clic en una peça per treure-la.`, "warning");
    }
    return;
  }

  const c = current.constraints || {};
  if (c.exactCount && state.rowB.length !== c.exactCount) {
    showFeedback(`La llargada és correcta, però ho has de fer amb exactament ${c.exactCount} regletes (ara en tens ${state.rowB.length}).`, "warning");
    return;
  }
  if (c.minTotalRods && state.rowB.length < c.minTotalRods) {
    showFeedback(`La llargada és correcta, però has de posar com a mínim ${c.minTotalRods} regletes.`, "warning");
    return;
  }
  if (c.forbiddenRods && c.forbiddenRods.some(f => state.rowB.includes(f))) {
    showFeedback(`En aquest repte no es pot fer servir la regleta del ${c.forbiddenRods.join(", ")}. Prova-ho amb altres regletes!`, "warning");
    return;
  }
  if (c.maxCountOf10) {
    const tensCount = state.rowB.filter(r => r === 10).length;
    if (tensCount > c.maxCountOf10) {
      showFeedback(`Només pots posar ${c.maxCountOf10} regleta del 10 en aquest repte!`, "warning");
      return;
    }
  }
  if (c.sameColorOnly) {
    const first = state.rowB[0];
    if (!state.rowB.every(r => r === first)) {
      showFeedback(`Totes les regletes del teu tren han de ser del MATEIX color!`, "warning");
      return;
    }
  }
  if (c.requiredRods && !c.requiredRods.every(req => state.rowB.includes(req))) {
    showFeedback(`Recorda utilitzar les regletes del ${c.requiredRods.join(" i ")} com demana l'enunciat.`, "warning");
    return;
  }

  // Si som a Sumes o Restes, comprovem també que el nen hagi escrit el resultat exacte!
  if (state.currentModule === "sumes" || state.currentModule === "restes") {
    const expectedExact = getExpectedExactResult(current);
    const inputEl = document.getElementById("exactResultInput");
    const writtenVal = parseInt(inputEl.value, 10);

    if (isNaN(writtenVal)) {
      inputEl.focus();
      showFeedback(
        `✅ Molt bé les regletes! Ara escriu el resultat exacte de l'operació a la casella i torna a prémer Comprova!`,
        "warning"
      );
      return;
    }

    if (writtenVal !== expectedExact) {
      inputEl.focus();
      if (state.currentModule === "restes") {
        showFeedback(
          `📏 Les regletes estan molt bé, però el resultat de la resta (${current.minuend} - ${current.subtrahend}) és el valor de les regletes que has afegit! Revisa el número escrit.`,
          "warning"
        );
      } else {
        showFeedback(
          `📏 Les regletes estan molt bé, però el número escrit (${writtenVal}) no és exacte. Suma el valor de les teves regletes!`,
          "warning"
        );
      }
      return;
    }
  }

  markCompleted(current.id);
  showFeedback(`🌟 Fantàstic! Has guanyat ${starsStr}! ${current.explanation}`, "success");
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

function getAllChallenges() {
  return [
    ...MODULE_EXERCISES.descomposicio,
    ...MODULE_EXERCISES.sumes,
    ...MODULE_EXERCISES.restes,
    ...MODULE_EXERCISES.multiplicacions,
    ...WORD_PROBLEMS
  ];
}

function markCompleted(id) {
  if (!id) return;
  if (!state.completedIds.includes(id)) {
    state.completedIds.push(id);
    localStorage.setItem("cuisenaire_6e_completed_v2", JSON.stringify(state.completedIds));
  }
  updateProgressBadges();
}

function updateProgressBadges() {
  document.getElementById("completedCountBadge").textContent = state.completedIds.length;

  const allItems = getAllChallenges();
  const totalStars = allItems
    .filter(item => state.completedIds.includes(item.id))
    .reduce((acc, item) => acc + (item.level || 1), 0);
  document.getElementById("earnedStarsBadge").textContent = totalStars;

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
// INICIALITZACIÓ D'ESDEVENIMENTS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderPalette();
  renderRuler();

  // Botó desplegable d'opcions DUA
  const btnToggleDua = document.getElementById("btnToggleDuaPanel");
  const duaPanel = document.getElementById("duaToolbarPanel");
  btnToggleDua.addEventListener("click", () => {
    const isOpen = duaPanel.classList.toggle("open");
    btnToggleDua.classList.toggle("active", isOpen);
  });

  // 3 commutadors simples DUA
  const btnEasyRead = document.getElementById("btnToggleEasyRead");
  btnEasyRead.addEventListener("click", () => {
    const active = document.body.classList.toggle("easy-read-mode");
    btnEasyRead.classList.toggle("active", active);
  });

  const btnDark = document.getElementById("btnToggleDarkTheme");
  btnDark.addEventListener("click", () => {
    const active = document.body.classList.toggle("theme-dark");
    btnDark.classList.toggle("active", active);
  });

  const btnBlind = document.getElementById("btnToggleBlindNumbers");
  btnBlind.addEventListener("click", () => {
    const active = document.body.classList.toggle("hide-rod-numbers");
    btnBlind.classList.toggle("active", active);
  });

  document.getElementById("btnResetProgress").addEventListener("click", () => {
    state.completedIds = [];
    localStorage.removeItem("cuisenaire_6e_completed_v2");
    updateProgressBadges();
    loadChallengeState();
  });

  // Pestanyes de temes
  document.querySelectorAll("#moduleTabs .nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#moduleTabs .nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentModule = tab.dataset.module;
      state.activeChallengeIndex = 0;
      loadChallengeState();
    });
  });

  // Selector de 3 nivells (⭐ Principiant, ⭐⭐ Mitjà, ⭐⭐⭐ Expert)
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedLevel = Number(btn.dataset.level);
      state.activeChallengeIndex = 0;
      loadChallengeState();
    });
  });

  // Anterior / Següent
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

  // Botó únic de Pista
  document.getElementById("btnShowHint").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (!current || !current.hints || !current.hints.length) return;
    const hintText = current.hints[state.hintStep % current.hints.length];
    state.hintStep++;
    document.getElementById("hintTextContent").textContent = `💡 Pista: ${hintText}`;
    document.getElementById("hintDisplayBox").classList.add("visible");
  });

  // Botons de veu en català
  document.getElementById("btnSpeakInstruction").addEventListener("click", () => {
    const title = document.getElementById("challengeTitle").textContent;
    const text = document.getElementById("challengeInstruction").textContent;
    speakTextCatalan(`${title}. ${text}`);
  });

  document.getElementById("btnSpeakHint").addEventListener("click", () => {
    speakTextCatalan(document.getElementById("hintTextContent").textContent);
  });

  document.getElementById("btnSpeakFeedback").addEventListener("click", () => {
    speakTextCatalan(document.getElementById("feedbackMessage").textContent);
  });

  // Esborrar i Comprovar
  document.getElementById("btnClearRowB").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (state.currentModule === "multiplicacions" && current) {
      state.multRows = Array.from({ length: current.vFactor }, () => []);
    } else if (current && current.operationMode === "subtraction" && current.initialRowB) {
      state.rowB = [...current.initialRowB];
    } else {
      state.rowB = [];
    }
    document.getElementById("exactResultInput").value = "";
    hideFeedback();
    renderWorkspace();
  });

  document.getElementById("btnVerifyChallenge").addEventListener("click", verifyCurrentChallenge);

  // Permetre prémer Enter dins de la casella de resultat exacte per comprovar directament
  document.getElementById("exactResultInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyCurrentChallenge();
    }
  });

  document.getElementById("problemNumericInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyCurrentChallenge();
    }
  });

  document.getElementById("btnLoadSuggestedModel").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (current && current.suggestedModelRods) {
      state.rowB = [...current.suggestedModelRods];
      renderWorkspace();
      showFeedback("🪄 S'han col·locat les regletes del problema al tauler. Ara compta quant valen i escriu la resposta a la casella!", "success");
    }
  });

  // ==========================================================================
  // MODAL I GENERADOR DE FITXES IMPRIMIBLES EN PAPER / PDF
  // ==========================================================================
  const printModal = document.getElementById("printModal");
  const btnOpenPrint = document.getElementById("btnOpenPrintModal");
  const btnClosePrint = document.getElementById("btnClosePrintModal");
  const btnCancelPrint = document.getElementById("btnCancelPrintModal");
  const btnGenerateAndPrint = document.getElementById("btnGenerateAndPrint");

  function openPrintModal() {
    printModal.classList.add("open");
    printModal.setAttribute("aria-hidden", "false");
  }

  function closePrintModal() {
    printModal.classList.remove("open");
    printModal.setAttribute("aria-hidden", "true");
  }

  btnOpenPrint.addEventListener("click", openPrintModal);
  btnClosePrint.addEventListener("click", closePrintModal);
  btnCancelPrint.addEventListener("click", closePrintModal);
  printModal.addEventListener("click", (e) => {
    if (e.target === printModal) closePrintModal();
  });

  btnGenerateAndPrint.addEventListener("click", () => {
    const modChoice = document.getElementById("printModuleSelect").value;
    const lvlChoice = document.getElementById("printLevelSelect").value;
    buildPrintableWorksheet(modChoice, lvlChoice);
    closePrintModal();
    setTimeout(() => {
      window.print();
    }, 120);
  });

  loadChallengeState();
});

// Construeix l'HTML de la fitxa per imprimir segons l'apartat i nivell triats
function buildPrintableWorksheet(modChoice, lvlChoice) {
  const container = document.getElementById("printWorksheetContainer");
  const PRINT_UNIT_PX = 18;

  const moduleTitles = {
    descomposicio: "🧩 1. Descomposició de nombres amb Regletes",
    sumes: "➕ 2. Sumes amb Regletes i Resultat Exacte",
    restes: "➖ 3. Restes amb Regletes (Quina regleta falta?) i Resultat Exacte",
    multiplicacions: "✖️ 4. Multiplicacions · Tècnica Italiana i Resultat Exacte",
    problemes: "📖 5. Problemes de Matemàtiques amb Regletes"
  };

  const levelLabels = {
    1: "⭐ Nivell Principiant (1 estrella)",
    2: "⭐⭐ Nivell Mitjà (2 estrelles)",
    3: "⭐⭐⭐ Nivell Expert (3 estrelles)"
  };

  // Quins apartats incloem
  let targetModules = [];
  if (modChoice === "all") {
    targetModules = ["descomposicio", "sumes", "restes", "multiplicacions", "problemes"];
  } else if (modChoice === "current") {
    const activeMod = state.currentModule === "laboratori" ? "descomposicio" : state.currentModule;
    targetModules = [activeMod];
  } else {
    targetModules = [modChoice];
  }

  // Quins nivells incloem
  let targetLevels = [];
  if (lvlChoice === "all") {
    targetLevels = [1, 2, 3];
  } else if (lvlChoice === "current") {
    targetLevels = [Number(state.selectedLevel) || 1];
  } else {
    targetLevels = [Number(lvlChoice)];
  }

  // Llegenda de colors de les Regletes de Cuisenaire
  const legendHtml = CUISENAIRE_RODS.map(r => `
    <span class="print-legend-chip">
      <span class="print-legend-swatch" style="background:${r.color}; border-color:${r.border};"></span>
      ${r.value} = ${r.name}
    </span>
  `).join("");

  let html = `
    <header class="print-sheet-header">
      <div class="print-sheet-title-row">
        <h1>📏 Fitxa de Matemàtiques · Regletes de Cuisenaire (6è de Primària)</h1>
        <span style="font-weight:800; font-size:9.5pt;">Disseny Universal (DUA)</span>
      </div>
      <div class="print-student-fields">
        <span>Nom i cognoms: _____________________________________________</span>
        <span>Data: ____ / ____ / 202__</span>
        <span>Curs: 6è ____</span>
      </div>
      <div class="print-legend-bar">
        <strong>🎨 Codi de Regletes:</strong> ${legendHtml}
      </div>
    </header>
  `;

  function renderPrintRodHtml(val) {
    const meta = getRodMeta(val);
    return `<span class="print-rod" style="width:${val * PRINT_UNIT_PX}px; background:${meta.color}; border-color:${meta.border}; color:${meta.text};">${val}</span>`;
  }

  function renderPrintVerticalRodHtml(val) {
    const meta = getRodMeta(val);
    return `<span class="print-rod-vertical" style="height:${val * 22}px; background:${meta.color}; border-color:${meta.border}; color:${meta.text};">${val}</span>`;
  }

  targetModules.forEach(modKey => {
    const sourceList = modKey === "problemes"
      ? WORD_PROBLEMS
      : (MODULE_EXERCISES[modKey] || []);

    targetLevels.forEach(lvl => {
      const items = sourceList.filter(item => item.level === lvl);
      if (!items.length) return;

      html += `<h2 class="print-section-heading">${moduleTitles[modKey]} — ${levelLabels[lvl]}</h2>`;

      items.forEach((ex, idx) => {
        if (modKey === "multiplicacions") {
          const hTotal = ex.hFactorRods.reduce((a, b) => a + b, 0);
          const topRodsMarkup = ex.hFactorRods.map(v => renderPrintRodHtml(v)).join("");
          const leftRodMarkup = renderPrintVerticalRodHtml(ex.vFactor);

          html += `
            <article class="print-exercise-card">
              <div class="print-ex-top">
                <div>
                  <div class="print-ex-title">${idx + 1}. ${ex.title}</div>
                  <div class="print-ex-instruction">${ex.instruction} Després, escriu el resultat exacte.</div>
                </div>
                <div class="print-result-box">
                  ✍️ Resultat (${ex.vFactor} × ${hTotal}) = <span class="print-blank-input"></span>
                </div>
              </div>
              <div class="print-italian-wrap">
                <div class="print-italian-corner">✖️</div>
                <div class="print-italian-top">${topRodsMarkup}</div>
                <div class="print-italian-left">${leftRodMarkup}</div>
                <div class="print-italian-interior" style="width:${hTotal * PRINT_UNIT_PX}px; height:${ex.vFactor * 22}px;"></div>
              </div>
            </article>
          `;
        } else if (modKey === "problemes") {
          const gridWidthUnits = Math.min(Math.max(ex.targetRodUnits || 20, 16), 34);
          html += `
            <article class="print-exercise-card">
              <div class="print-ex-top">
                <div>
                  <div class="print-ex-title">${idx + 1}. ${ex.contextIcon} ${ex.title}</div>
                  <div class="print-ex-instruction">${ex.statement}</div>
                </div>
                <div class="print-result-box">
                  ✍️ ${ex.question} <span class="print-blank-input"></span> ${ex.unit || ""}
                </div>
              </div>
              <div class="print-workspace-area">
                <div class="print-track-row">
                  <span class="print-track-label">🛠️ Regletes:</span>
                  <div class="print-student-grid-track" style="width:${gridWidthUnits * PRINT_UNIT_PX}px;"></div>
                </div>
              </div>
            </article>
          `;
        } else {
          // Descomposició, Sumes o Restes
          const refRodsMarkup = (ex.referenceRods || []).map(v => renderPrintRodHtml(v)).join("");
          const initialBRodsMarkup = (ex.initialRowB || []).map(v => renderPrintRodHtml(v)).join("");
          const targetUnits = ex.targetValue || 15;

          let resultBoxMarkup = "";
          if (modKey === "sumes") {
            const sumExpr = (ex.referenceRods || []).join(" + ");
            resultBoxMarkup = `<div class="print-result-box">✍️ Resultat (${sumExpr}) = <span class="print-blank-input"></span></div>`;
          } else if (modKey === "restes") {
            resultBoxMarkup = `<div class="print-result-box">✍️ Resultat (${ex.minuend} - ${ex.subtrahend}) = <span class="print-blank-input"></span></div>`;
          } else {
            resultBoxMarkup = `<div class="print-result-box">🎯 Objectiu: <strong>${ex.targetValue}</strong></div>`;
          }

          html += `
            <article class="print-exercise-card">
              <div class="print-ex-top">
                <div>
                  <div class="print-ex-title">${idx + 1}. ${ex.title}</div>
                  <div class="print-ex-instruction">${ex.instruction}</div>
                </div>
                ${resultBoxMarkup}
              </div>
              <div class="print-workspace-area">
                <div class="print-track-row">
                  <span class="print-track-label">📌 Model:</span>
                  <div class="print-rod-strip">${refRodsMarkup}</div>
                </div>
                <div class="print-track-row">
                  <span class="print-track-label">🛠️ El teu tren:</span>
                  <div class="print-student-grid-track" style="width:${targetUnits * PRINT_UNIT_PX}px;">
                    ${initialBRodsMarkup}
                  </div>
                </div>
              </div>
            </article>
          `;
        }
      });
    });
  });

  container.innerHTML = html;
}
