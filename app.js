// ============================================================================
// LÒGICA DE L'APLICACIÓ — REGLETES DE CUISENAIRE (INTERFÍCIE SIMPLE I FÀCIL)
// Inclou Multiplicació Estil Tècnica Italiana (Factor Horitzontal × Vertical)
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

  if (state.currentModule === "laboratori") {
    levelBar.style.display = "none";
    problemBar.classList.remove("visible");
    navGroup.style.display = "none";
    verifyBtn.style.display = "none";
    hintBtn.style.display = "none";
    wrapperRowA.style.display = "none";
    matCanvas.style.display = "flex";
    italianContainer.style.display = "none";

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

  if (state.currentModule === "multiplicacions") {
    problemBar.classList.remove("visible");
    matCanvas.style.display = "none";
    italianContainer.style.display = "flex";
    document.getElementById("challengeInstruction").textContent = current.instruction;
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
    document.getElementById("challengeInstruction").textContent = `${current.contextIcon} ${current.statement}`;
    document.getElementById("problemQuestionLabel").textContent = current.question;
    document.getElementById("problemUnitSpan").textContent = current.unit || "";
    document.getElementById("problemNumericInput").value = "";
    state.rowA = [];
    state.rowB = [];
  } else {
    problemBar.classList.remove("visible");
    wrapperRowA.style.display = "flex";
    document.getElementById("challengeInstruction").textContent = current.instruction;
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

    // Busquem la primera fila que tingui espai suficient per a aquesta regleta
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
        showFeedback("El rectangle ja està completament ple! Prem el botó verd '✅ Comprova!'", "success");
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

  // Etiquetes dels factors
  if (current.hFactorRods.length > 1) {
    topLabel.textContent = `Factor horitzontal: ${hTotal} (${current.hFactorRods.join(" + ")})`;
  } else {
    topLabel.textContent = `Factor horitzontal: ${hTotal}`;
  }
  leftLabel.textContent = `Factor vertical: ${vFactor}`;

  // Dibuixem el/s reglet/s del factor horitzontal a dalt
  topRodsEl.innerHTML = "";
  current.hFactorRods.forEach(val => {
    topRodsEl.appendChild(createRodElement(val));
  });

  // Dibuixem el reglet del factor vertical a l'esquerra (en vertical!)
  leftRodWrap.innerHTML = "";
  leftRodWrap.appendChild(createVerticalRodElement(vFactor));

  // Configurem les dimensions exactes del rectangle interior a omplir
  interiorArea.innerHTML = "";
  interiorArea.style.width = `${hTotal * 36 + 6}px`;
  interiorArea.style.height = `${vFactor * 40 + 6}px`;

  // Si el factor horitzontal està descompost (ex: 10 + 3), dibuixem la línia divisòria vertical de la graella italiana
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

  // Dibuixem cada fila interior del rectangle amb les regletes que l'alumne hi ha posat
  let totalFilled = 0;
  let completedRows = 0;

  for (let r = 0; r < vFactor; r++) {
    const rowEl = document.createElement("div");
    rowEl.className = "italian-interior-row";
    rowEl.style.width = `${hTotal * 36}px`;

    const rowRods = state.multRows[r] || [];
    const rowSum = rowRods.reduce((a, b) => a + b, 0);
    totalFilled += rowSum;
    if (rowSum === hTotal) completedRows++;

    rowRods.forEach((val, cIdx) => {
      rowEl.appendChild(createRodElement(val, {
        onClick: () => removeRodFromItalianGrid(r, cIdx)
      }));
    });

    interiorArea.appendChild(rowEl);
  }

  // Actualitzem el resum simbòlic superior
  const symEl = document.getElementById("symbolicRowB");
  if (totalFilled === 0) {
    symEl.textContent = `0  (Omple les ${vFactor} files de ${hTotal})`;
  } else if (current.hFactorRods.length > 1 && totalFilled === current.targetValue) {
    const p1 = vFactor * current.hFactorRods[0];
    const p2 = vFactor * current.hFactorRods[1];
    symEl.textContent = `${vFactor} × (${current.hFactorRods.join(" + ")}) = ${p1} + ${p2} = ${totalFilled}`;
  } else {
    symEl.textContent = `Àrea omplerta: ${totalFilled} de ${current.targetValue} (${completedRows}/${vFactor} files completes)`;
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
  if (currentChallenge && state.currentModule !== "laboratori") {
    const targetUnits = state.currentModule === "problemes"
      ? currentChallenge.targetRodUnits
      : currentChallenge.targetValue;

    if (targetUnits && targetUnits <= 36) {
      const marker = document.createElement("div");
      marker.className = "target-marker-line";
      marker.style.left = `${targetUnits * 36}px`;
      const flag = document.createElement("span");
      flag.className = "target-marker-flag";
      flag.textContent = `Meta: ${targetUnits}`;
      marker.appendChild(flag);
      trackB.appendChild(marker);
    }
  }

  const sumA = state.rowA.reduce((a, b) => a + b, 0);
  const sumB = state.rowB.reduce((a, b) => a + b, 0);

  document.getElementById("sumPillRowA").textContent = sumA;
  document.getElementById("sumPillRowB").textContent = sumB;

  const symEl = document.getElementById("symbolicRowB");
  if (state.rowB.length === 0) {
    symEl.textContent = "0";
  } else if (currentChallenge && currentChallenge.operationMode === "subtraction") {
    const subUnits = (currentChallenge.initialRowB || []).reduce((a, b) => a + b, 0);
    const addedUnits = Math.max(0, sumB - subUnits);
    symEl.textContent = `${sumA} - ${subUnits} = ${addedUnits}   (perquè ${subUnits} + ${addedUnits} = ${sumB})`;
  } else {
    symEl.textContent = `${state.rowB.join(" + ")} = ${sumB}`;
  }

  updateProgressBadges();
}

// Comprovació de la resposta de l'alumne
function verifyCurrentChallenge() {
  const current = getCurrentChallenge();
  if (!current) return;

  const starsStr = "⭐".repeat(current.level || 1);

  // 1) Multiplicacions (Tècnica Italiana)
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
      const missing = current.targetValue - totalFilled;
      showFeedback(
        `📏 Encara queden buits dins del rectangle! Has omplert ${totalFilled} i l'àrea total és ${current.targetValue} (et falten ${missing}).`,
        "warning"
      );
      return;
    }

    markCompleted(current.id);
    showFeedback(`🌟 Fantàstic! Has guanyat ${starsStr}! ${current.explanation}`, "success");
    renderWorkspace();
    return;
  }

  // 2) Problemes
  if (state.currentModule === "problemes") {
    const numericVal = parseInt(document.getElementById("problemNumericInput").value, 10);
    const sumB = state.rowB.reduce((a, b) => a + b, 0);

    if (numericVal === current.expectedAnswer || sumB === current.targetRodUnits) {
      markCompleted(current.id);
      document.getElementById("problemNumericInput").value = current.expectedAnswer;
      showFeedback(`🎉 Molt bé! Has guanyat ${starsStr}! Resposta: ${current.expectedAnswer} ${current.unit}. ${current.explanation}`, "success");
    } else {
      showFeedback(`Encara no és correcte. Pots escriure el número a la casella o fer-lo amb les regletes (ara tens ${sumB}). Prem "💡 Necessito una pista" si vols ajuda!`, "warning");
    }
    return;
  }

  // 3) Descomposició, Sumes i Restes
  const sumB = state.rowB.reduce((a, b) => a + b, 0);
  const target = current.targetValue;

  if (sumB !== target) {
    const diff = Math.abs(target - sumB);
    if (sumB < target) {
      showFeedback(`📏 El teu tren suma ${sumB} i ha d'arribar a ${target}. Et falten ${diff}!`, "warning");
    } else {
      showFeedback(`📏 T'has passat! El teu tren suma ${sumB} i l'objectiu és ${target}. Et sobren ${diff}!`, "warning");
    }
    return;
  }

  const c = current.constraints || {};
  if (c.exactCount && state.rowB.length !== c.exactCount) {
    showFeedback(`La suma dóna ${target}, però ho has de fer amb exactament ${c.exactCount} regletes (ara en tens ${state.rowB.length}).`, "warning");
    return;
  }
  if (c.minTotalRods && state.rowB.length < c.minTotalRods) {
    showFeedback(`La suma és correcta, però has de posar com a mínim ${c.minTotalRods} regletes.`, "warning");
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
    hideFeedback();
    renderWorkspace();
  });

  document.getElementById("btnVerifyChallenge").addEventListener("click", verifyCurrentChallenge);

  document.getElementById("btnLoadSuggestedModel").addEventListener("click", () => {
    const current = getCurrentChallenge();
    if (current && current.suggestedModelRods) {
      state.rowB = [...current.suggestedModelRods];
      renderWorkspace();
      showFeedback("🪄 S'han col·locat les regletes del problema al tauler. Compta quant sumen!", "success");
    }
  });

  loadChallengeState();
});
