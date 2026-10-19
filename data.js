// ============================================================================
// DADES EDUCATIVES — REGLETES DE CUISENAIRE (CATALÀ · DUA · SENSE DECIMALS)
// Tres nivells d'estrelles: ⭐ Principiant (1), ⭐⭐ Mitjà (2), ⭐⭐⭐ Expert (3)
// 5 exercicis per nivell a cada apartat (15 per apartat · 75 en total)
// ============================================================================

const CUISENAIRE_RODS = [
  { value: 1,  name: "Blanca",    color: "#FFFFFF", border: "#94A3B8", text: "#1E293B" },
  { value: 2,  name: "Vermella",  color: "#EF4444", border: "#B91C1C", text: "#FFFFFF" },
  { value: 3,  name: "Verd clar", color: "#84CC16", border: "#4D7C0F", text: "#1E293B" },
  { value: 4,  name: "Rosa",      color: "#EC4899", border: "#BE185D", text: "#FFFFFF" },
  { value: 5,  name: "Groga",     color: "#FACC15", border: "#A16207", text: "#1E293B" },
  { value: 6,  name: "Verd fosc", color: "#15803D", border: "#14532D", text: "#FFFFFF" },
  { value: 7,  name: "Negra",     color: "#1E293B", border: "#0F172A", text: "#FFFFFF" },
  { value: 8,  name: "Marró",     color: "#92400E", border: "#78350F", text: "#FFFFFF" },
  { value: 9,  name: "Blava",     color: "#2563EB", border: "#1D4ED8", text: "#FFFFFF" },
  { value: 10, name: "Taronja",   color: "#F97316", border: "#C2410C", text: "#FFFFFF" }
];

const MODULE_EXERCISES = {
  // ==========================================================================
  // 1. DESCOMPOSICIÓ DE NOMBRES (15 EXERCICIS: 5 PER NIVELL)
  // ==========================================================================
  descomposicio: [
    // ⭐ PRINCIPIANT (5 exercicis)
    {
      id: "desc-1-1",
      level: 1,
      title: "Els amics del 10",
      instruction: "Fes el número 10 utilitzant exactament 2 regletes (no s'hi val la taronja del 10!).",
      targetValue: 10,
      referenceRods: [10],
      constraints: { exactCount: 2, forbiddenRods: [10] },
      hints: [
        "Busca dues regletes que posades juntes siguin igual de llargues que la taronja (10).",
        "Pots provar: 9 + 1, 8 + 2, 7 + 3, 6 + 4 o 5 + 5!"
      ],
      explanation: "Molt bé! Has trobat una parella que suma 10."
    },
    {
      id: "desc-1-2",
      level: 1,
      title: "Descomponem el 8 en dues parts",
      instruction: "Construeix el número 8 utilitzant exactament 2 regletes (sense usar la marró del 8).",
      targetValue: 8,
      referenceRods: [8],
      constraints: { exactCount: 2, forbiddenRods: [8] },
      hints: [
        "Busca dues regletes més petites que juntes mesurin com la marró (8).",
        "Pots posar 4 + 4, 5 + 3, 6 + 2 o 7 + 1!"
      ],
      explanation: "Genial! Has descompost el 8 en dues peces."
    },
    {
      id: "desc-1-3",
      level: 1,
      title: "Desena i unitats: el 14",
      instruction: "Construeix el número 14 amb només 2 regletes: una desena (10) i les unitats que falten.",
      targetValue: 14,
      referenceRods: [10, 4],
      constraints: { exactCount: 2, requiredRods: [10, 4] },
      hints: [
        "El 14 té una desena (10) i 4 unitats.",
        "Posa una regleta Taronja (10) i una regleta Rosa (4)."
      ],
      explanation: "Fantàstic! 14 = 10 + 4 (1 desena i 4 unitats)."
    },
    {
      id: "desc-1-4",
      level: 1,
      title: "El número 12 amb dues peces iguals",
      instruction: "Fes el número 12 utilitzant 2 regletes que siguin del mateix color.",
      targetValue: 12,
      referenceRods: [10, 2],
      constraints: { exactCount: 2, sameColorOnly: true },
      hints: [
        "Quin número sumat amb ell mateix dóna 12?",
        "Posa dues regletes Verd fosc (6 + 6 = 12)!"
      ],
      explanation: "Molt bé! El doble de 6 és 12 (6 + 6 = 12)."
    },
    {
      id: "desc-1-5",
      level: 1,
      title: "Desena i unitats: el 17",
      instruction: "Representa el número 17 amb 2 regletes: una desena (10) i la regleta d'unitats que falta.",
      targetValue: 17,
      referenceRods: [10, 7],
      constraints: { exactCount: 2, requiredRods: [10, 7] },
      hints: [
        "El 17 és 10 més 7.",
        "Col·loca una regleta Taronja (10) i una regleta Negra (7)."
      ],
      explanation: "Perfecte! 17 = 10 + 7."
    },

    // ⭐⭐ MITJÀ (5 exercicis)
    {
      id: "desc-2-1",
      level: 2,
      title: "El 15 amb 3 regletes",
      instruction: "Construeix el número 15 utilitzant exactament 3 regletes (qualsevol combinació que sumi 15).",
      targetValue: 15,
      referenceRods: [10, 5],
      constraints: { exactCount: 3 },
      hints: [
        "Pots posar tres regletes grogues (5 + 5 + 5), o bé una de 10, una de 3 i una de 2!",
        "Comprova que tinguis 3 peces i que sumin 15."
      ],
      explanation: "Molt bé! El 15 es pot descompondre en 3 peces de moltes maneres."
    },
    {
      id: "desc-2-2",
      level: 2,
      title: "Descomponem el 23",
      instruction: "Representa el número 23 amb el mínim de regletes possible (desenes + unitats).",
      targetValue: 23,
      referenceRods: [10, 10, 3],
      constraints: { exactCount: 3, requiredRods: [10, 3] },
      hints: [
        "El 23 té 2 desenes (20) i 3 unitats.",
        "Posa dues regletes Taronges (10 + 10) i una Verd clar (3)."
      ],
      explanation: "Perfecte! 23 = 10 + 10 + 3."
    },
    {
      id: "desc-2-3",
      level: 2,
      title: "El 18 en parts iguals",
      instruction: "Construeix el número 18 fent servir regletes que siguin TOTES del mateix color.",
      targetValue: 18,
      referenceRods: [10, 8],
      constraints: { sameColorOnly: true, minTotalRods: 2 },
      hints: [
        "Pots fer 18 amb dues regletes del 9, o amb tres regletes del 6!",
        "Tria un sol color i repeteix-lo fins a arribar a 18."
      ],
      explanation: "Molt bé! Has trobat divisors del 18 fent grups iguals."
    },
    {
      id: "desc-2-4",
      level: 2,
      title: "El 16 sense usar el 6",
      instruction: "Construeix el número 16 amb 3 regletes i SENSE utilitzar la regleta verd fosc (6).",
      targetValue: 16,
      referenceRods: [10, 6],
      constraints: { exactCount: 3, forbiddenRods: [6] },
      hints: [
        "Si poses una regleta del 10, com pots fer el 6 restant amb dues peces?",
        "Prova: 10 + 4 + 2 = 16, o bé 10 + 3 + 3 = 16!"
      ],
      explanation: "Genial! Has substituït el 6 per dues regletes equivalents."
    },
    {
      id: "desc-2-5",
      level: 2,
      title: "El 21 en tres parts iguals",
      instruction: "Fes el número 21 utilitzant exactament 3 regletes del mateix color.",
      targetValue: 21,
      referenceRods: [10, 10, 1],
      constraints: { exactCount: 3, sameColorOnly: true },
      hints: [
        "Quin número multiplicat per 3 dóna 21?",
        "Posa tres regletes Negres (7 + 7 + 7 = 21)!"
      ],
      explanation: "Fantàstic! 21 dividit en 3 parts iguals és 7 (7 + 7 + 7 = 21)."
    },

    // ⭐⭐⭐ EXPERT (5 exercicis)
    {
      id: "desc-3-1",
      level: 3,
      title: "El 24 sense usar el 4",
      instruction: "Construeix el número 24 amb exactament 4 regletes i SENSE utilitzar la regleta rosa (4).",
      targetValue: 24,
      referenceRods: [10, 10, 4],
      constraints: { exactCount: 4, forbiddenRods: [4] },
      hints: [
        "Si poses dues regletes del 10 (20), pots fer el 4 que falta amb dues regletes del 2 (2 + 2)!",
        "També pots posar quatre regletes del 6 (6 + 6 + 6 + 6 = 24)."
      ],
      explanation: "Repte Expert superat! Has descompost el 24 complint totes les condicions."
    },
    {
      id: "desc-3-2",
      level: 3,
      title: "Desfem una desena del 26",
      instruction: "El 26 és 10 + 10 + 6. Construeix 26 utilitzant com a màxim 1 regleta taronja (10) i la resta amb altres regletes.",
      targetValue: 26,
      referenceRods: [10, 10, 6],
      constraints: { maxCountOf10: 1 },
      hints: [
        "Si poses una sola regleta de 10, et falten 16 per arribar a 26.",
        "Pots fer el 16 amb 8 + 8, o amb 9 + 7! Per exemple: 10 + 8 + 8 = 26."
      ],
      explanation: "Excel·lent! 26 = 10 + 16. Desfer una desena ens ajuda a entendre les restes portant."
    },
    {
      id: "desc-3-3",
      level: 3,
      title: "El 20 sense regletes del 10",
      instruction: "Construeix el número 20 utilitzant exactament 4 regletes i SENSE usar la regleta taronja (10).",
      targetValue: 20,
      referenceRods: [10, 10],
      constraints: { exactCount: 4, forbiddenRods: [10] },
      hints: [
        "Pensa en 4 regletes que sumin 20 sense el 10.",
        "Per exemple: quatre regletes grogues (5 + 5 + 5 + 5 = 20) o bé 8 + 6 + 4 + 2 = 20!"
      ],
      explanation: "Increïble! Has construït el 20 amb 4 peces sense cap regleta del 10."
    },
    {
      id: "desc-3-4",
      level: 3,
      title: "El 28 en 4 parts iguals",
      instruction: "Descompon el número 28 utilitzant exactament 4 regletes que siguin TOTES del mateix color.",
      targetValue: 28,
      referenceRods: [10, 10, 8],
      constraints: { exactCount: 4, sameColorOnly: true },
      hints: [
        "Quin número multiplicat per 4 dóna 28?",
        "Col·loca quatre regletes Negres (7 + 7 + 7 + 7 = 28)!"
      ],
      explanation: "Brillant! 28 = 4 × 7."
    },
    {
      id: "desc-3-5",
      level: 3,
      title: "Descomposició del 32 amb només dues desenes",
      instruction: "Construeix el 32 utilitzant com a màxim 2 regletes taronges (10) i completant la resta amb altres regletes.",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      constraints: { maxCountOf10: 2 },
      hints: [
        "Si poses dues regletes de 10 (que sumen 20), et falten 12 per arribar a 32.",
        "Fes el 12 amb 6 + 6 o 8 + 4! Per exemple: 10 + 10 + 6 + 6 = 32."
      ],
      explanation: "Nivell Expert completat! 32 = 20 + 12."
    }
  ],

  // ==========================================================================
  // 2. SUMES (15 EXERCICIS: 5 PER NIVELL)
  // ==========================================================================
  sumes: [
    // ⭐ PRINCIPIANT (5 exercicis)
    {
      id: "sum-1-1",
      level: 1,
      title: "Sumem: 6 + 4",
      instruction: "A dalt tenim 6 + 4. Quina regleta sola val el mateix que 6 + 4? Posa-la a la teva fila!",
      targetValue: 10,
      referenceRods: [6, 4],
      constraints: { exactCount: 1, requiredRods: [10] },
      hints: [
        "Mira la llargada de 6 + 4. Quina és la regleta que val 10?",
        "Posa una sola regleta Taronja (10)."
      ],
      explanation: "Molt bé! 6 + 4 = 10."
    },
    {
      id: "sum-1-2",
      level: 1,
      title: "Sumem amb una sola peça: 5 + 4",
      instruction: "A dalt hi ha 5 + 4. Posa una sola regleta a la teva fila que valgui el mateix que 5 + 4!",
      targetValue: 9,
      referenceRods: [5, 4],
      constraints: { exactCount: 1, requiredRods: [9] },
      hints: [
        "5 + 4 són 9.",
        "Quina regleta val 9? Posa la regleta Blava (9)!"
      ],
      explanation: "Genial! 5 + 4 = 9."
    },
    {
      id: "sum-1-3",
      level: 1,
      title: "El pont al 10: 8 + 5",
      instruction: "A dalt hi ha 8 + 5. Calcula el total i representa'l amb una desena (10) i la regleta d'unitats que correspongui.",
      targetValue: 13,
      referenceRods: [8, 5],
      constraints: { exactCount: 2, requiredRods: [10, 3] },
      hints: [
        "8 + 5 = 13.",
        "Per fer 13 amb desenes i unitats, posa una regleta Taronja (10) i una Verd clar (3)."
      ],
      explanation: "Fantàstic! 8 + 5 = 10 + 3 = 13."
    },
    {
      id: "sum-1-4",
      level: 1,
      title: "Sumem 9 + 6",
      instruction: "Representa el resultat de 9 + 6 amb una regleta del 10 i la regleta d'unitats que falta.",
      targetValue: 15,
      referenceRods: [9, 6],
      constraints: { exactCount: 2, requiredRods: [10, 5] },
      hints: [
        "Si passem 1 del 6 cap al 9, tenim 10 + 5!",
        "Posa una regleta Taronja (10) i una Groga (5)."
      ],
      explanation: "Molt bé! 9 + 6 = 10 + 5 = 15."
    },
    {
      id: "sum-1-5",
      level: 1,
      title: "Dobles visuals: 7 + 7",
      instruction: "A dalt tenim 7 + 7. Construeix el resultat amb una regleta del 10 i la d'unitats corresponent.",
      targetValue: 14,
      referenceRods: [7, 7],
      constraints: { exactCount: 2, requiredRods: [10, 4] },
      hints: [
        "El doble de 7 és 14.",
        "Col·loca una regleta Taronja (10) i una Rosa (4)."
      ],
      explanation: "Perfecte! 7 + 7 = 14."
    },

    // ⭐⭐ MITJÀ (5 exercicis)
    {
      id: "sum-2-1",
      level: 2,
      title: "Suma de tres nombres: 7 + 5 + 3",
      instruction: "Calcula 7 + 5 + 3 i representa el resultat amb una regleta del 10 i una d'unitats.",
      targetValue: 15,
      referenceRods: [7, 5, 3],
      constraints: { exactCount: 2, requiredRods: [10, 5] },
      hints: [
        "Fixa't que 7 + 3 fan 10! I 10 + 5 fan 15.",
        "Posa una regleta Taronja (10) i una Groga (5)."
      ],
      explanation: "Molt ben vist! Agrupant (7 + 3) + 5 és molt fàcil veure que dóna 15."
    },
    {
      id: "sum-2-2",
      level: 2,
      title: "Sumem desenes i unitats: 12 + 9",
      instruction: "A dalt hi ha 12 (10+2) més 9. Representa el total utilitzant dues regletes del 10 i les unitats sobrants.",
      targetValue: 21,
      referenceRods: [10, 2, 9],
      constraints: { exactCount: 3, requiredRods: [10, 1] },
      hints: [
        "12 + 9 = 21.",
        "Per fer 21, posa dues regletes Taronges (10 + 10) i una Blanca (1)."
      ],
      explanation: "Perfecte! 12 + 9 = 21 (2 desenes i 1 unitat)."
    },
    {
      id: "sum-2-3",
      level: 2,
      title: "Sumem 14 + 13",
      instruction: "A dalt tenim 14 + 13. Construeix el resultat juntant les desenes (10) i sumant les unitats en una sola peça.",
      targetValue: 27,
      referenceRods: [10, 4, 10, 3],
      constraints: { exactCount: 3, requiredRods: [10, 7] },
      hints: [
        "Desenes: 10 + 10 = 20. Unitats: 4 + 3 = 7.",
        "Posa dues regletes Taronges (10 + 10) i una Negra (7). Total: 27."
      ],
      explanation: "Molt bé! 14 + 13 = 20 + 7 = 27."
    },
    {
      id: "sum-2-4",
      level: 2,
      title: "Completem la segona desena: 13 + 7",
      instruction: "A dalt hi ha 13 (10+3) més 7. Representa el resultat amb el mínim nombre de regletes!",
      targetValue: 20,
      referenceRods: [10, 3, 7],
      constraints: { exactCount: 2, requiredRods: [10] },
      hints: [
        "Mira les unitats: 3 + 7 fan una altra desena (10)!",
        "10 + 10 = 20. Posa dues regletes Taronges (10)."
      ],
      explanation: "Genial! 13 + 7 = 10 + (3 + 7) = 20."
    },
    {
      id: "sum-2-5",
      level: 2,
      title: "Sumem 15 + 8",
      instruction: "A dalt tenim 15 (10+5) més 8. Construeix el total amb dues desenes (10) i la regleta d'unitats restant.",
      targetValue: 23,
      referenceRods: [10, 5, 8],
      constraints: { exactCount: 3, requiredRods: [10, 3] },
      hints: [
        "15 + 5 són 20, i ens queden 3 més: 20 + 3 = 23.",
        "Posa dues regletes Taronges (10 + 10) i una Verd clar (3)."
      ],
      explanation: "Molt bé! 15 + 8 = 23."
    },

    // ⭐⭐⭐ EXPERT (5 exercicis)
    {
      id: "sum-3-1",
      level: 3,
      title: "Suma portant: 16 + 15",
      instruction: "Calcula 16 + 15 i representa el total amb el mínim de regletes possible (desenes del 10 + unitats).",
      targetValue: 31,
      referenceRods: [10, 6, 10, 5],
      constraints: { exactCount: 4, requiredRods: [10, 1] },
      hints: [
        "10 + 10 = 20, i 6 + 5 = 11 (que és una altra desena + 1 unitat).",
        "20 + 11 = 31! Posa tres regletes Taronges (10+10+10) i una Blanca (1)."
      ],
      explanation: "Excel·lent! 16 + 15 = 31."
    },
    {
      id: "sum-3-2",
      level: 3,
      title: "Parelles ràpides: 8 + 7 + 2 + 3",
      instruction: "A dalt hi ha 8 + 7 + 2 + 3. Agrupa-ho en desenes completes utilitzant només regletes taronges (10)!",
      targetValue: 20,
      referenceRods: [8, 7, 2, 3],
      constraints: { exactCount: 2, requiredRods: [10] },
      hints: [
        "8 + 2 = 10 i 7 + 3 = 10!",
        "10 + 10 = 20. Posa dues regletes Taronges (10)."
      ],
      explanation: "Brillant! Cercar parelles que sumin 10 fa el càlcul mental super ràpid."
    },
    {
      id: "sum-3-3",
      level: 3,
      title: "Tres sumands: 12 + 11 + 9",
      instruction: "Calcula 12 + 11 + 9 i expressa el resultat amb regletes del 10 i la peça d'unitats.",
      targetValue: 32,
      referenceRods: [10, 2, 10, 1, 9],
      constraints: { exactCount: 4, requiredRods: [10, 2] },
      hints: [
        "Fixa't que 11 + 9 = 20! I 20 + 12 = 32.",
        "Posa tres regletes Taronges (30) i una Vermella (2)."
      ],
      explanation: "Molt bé! 12 + (11 + 9) = 12 + 20 = 32."
    },
    {
      id: "sum-3-4",
      level: 3,
      title: "Suma portant: 18 + 17",
      instruction: "A dalt tenim 18 + 17. Construeix el resultat agrupat en desenes (10) i unitats.",
      targetValue: 35,
      referenceRods: [10, 8, 10, 7],
      constraints: { exactCount: 4, requiredRods: [10, 5] },
      hints: [
        "10 + 10 = 20, i 8 + 7 = 15. En total: 20 + 15 = 35.",
        "Col·loca tres regletes Taronges (30) i una Groga (5)."
      ],
      explanation: "Fantàstic! 18 + 17 = 35."
    },
    {
      id: "sum-3-5",
      level: 3,
      title: "Quatre sumands: 9 + 8 + 6 + 7",
      instruction: "Suma 9 + 8 + 6 + 7 i representa el total amb el mínim nombre de regletes!",
      targetValue: 30,
      referenceRods: [9, 8, 6, 7],
      constraints: { exactCount: 3, requiredRods: [10] },
      hints: [
        "9 + 6 = 15 i 8 + 7 = 15. I 15 + 15 fan 30!",
        "Posa tres regletes Taronges (10 + 10 + 10 = 30)."
      ],
      explanation: "Nivell Expert completat! 9 + 8 + 6 + 7 = 30."
    }
  ],

  // ==========================================================================
  // 3. RESTES (COMPLEMENT: QUINA REGLETA FALTA? · 15 EXERCICIS: 5 PER NIVELL)
  // ==========================================================================
  restes: [
    // ⭐ PRINCIPIANT (5 exercicis)
    {
      id: "res-1-1",
      level: 1,
      title: "Restem: 10 - 6",
      instruction: "A dalt hi ha 10 i a sota ja tenim posat el 6. Afegeix la regleta que falta per arribar fins a 10!",
      targetValue: 10,
      referenceRods: [10],
      initialRowB: [6],
      operationMode: "subtraction",
      minuend: 10,
      subtrahend: 6,
      constraints: { exactCount: 2 },
      hints: [
        "Compta quant falta des de 6 fins a 10: 6 + ? = 10.",
        "Falta 4! Fes clic a la regleta Rosa (4)."
      ],
      explanation: "Molt bé! 10 - 6 = 4, perquè 6 + 4 = 10."
    },
    {
      id: "res-1-2",
      level: 1,
      title: "Restem: 9 - 4",
      instruction: "A dalt hi ha el 9 i a sota ja tenim el 4. Afegeix la regleta que falta per igualar el 9!",
      targetValue: 9,
      referenceRods: [9],
      initialRowB: [4],
      operationMode: "subtraction",
      minuend: 9,
      subtrahend: 4,
      constraints: { exactCount: 2 },
      hints: [
        "Quina regleta sumada amb 4 dóna 9?",
        "Falta 5! Afegeix la regleta Groga (5)."
      ],
      explanation: "Genial! 9 - 4 = 5."
    },
    {
      id: "res-1-3",
      level: 1,
      title: "Restem: 10 - 3",
      instruction: "A dalt hi ha el 10 i a sota tenim el 3. Quina regleta falta per arribar a 10?",
      targetValue: 10,
      referenceRods: [10],
      initialRowB: [3],
      operationMode: "subtraction",
      minuend: 10,
      subtrahend: 3,
      constraints: { exactCount: 2 },
      hints: [
        "Pensa en l'amic del 3 per arribar a 10: 3 + ? = 10.",
        "Afegeix la regleta Negra (7)!"
      ],
      explanation: "Molt bé! 10 - 3 = 7."
    },
    {
      id: "res-1-4",
      level: 1,
      title: "Restem: 12 - 8",
      instruction: "A dalt hi ha 12 (10+2) i a sota hi ha el 8. Afegeix una sola regleta per arribar de 8 fins a 12!",
      targetValue: 12,
      referenceRods: [10, 2],
      initialRowB: [8],
      operationMode: "subtraction",
      minuend: 12,
      subtrahend: 8,
      constraints: { exactCount: 2 },
      hints: [
        "De 8 fins a 10 van 2, i de 10 fins a 12 en van 2 més: 2 + 2 = 4.",
        "Afegeix la regleta Rosa (4)!"
      ],
      explanation: "Fantàstic! 12 - 8 = 4."
    },
    {
      id: "res-1-5",
      level: 1,
      title: "Restem: 14 - 10",
      instruction: "A dalt hi ha 14 (10+4) i a sota ja tenim el 10. Quina regleta falta per igualar el 14?",
      targetValue: 14,
      referenceRods: [10, 4],
      initialRowB: [10],
      operationMode: "subtraction",
      minuend: 14,
      subtrahend: 10,
      constraints: { exactCount: 2 },
      hints: [
        "Ja tens la desena (10). Només et falten les unitats!",
        "Afegeix la regleta Rosa (4)."
      ],
      explanation: "Perfecte! 14 - 10 = 4."
    },

    // ⭐⭐ MITJÀ (5 exercicis)
    {
      id: "res-2-1",
      level: 2,
      title: "Del 8 fins al 15: 15 - 8",
      instruction: "A dalt tenim 15 i a sota ja hi ha el 8. Afegeix la regleta que falta per calcular 15 - 8.",
      targetValue: 15,
      referenceRods: [10, 5],
      initialRowB: [8],
      operationMode: "subtraction",
      minuend: 15,
      subtrahend: 8,
      constraints: { exactCount: 2 },
      hints: [
        "De 8 a 10 van 2, i de 10 a 15 van 5. En total: 2 + 5 = 7.",
        "Afegeix la regleta Negra (7)!"
      ],
      explanation: "Molt bé! 15 - 8 = 7."
    },
    {
      id: "res-2-2",
      level: 2,
      title: "Restem fins a 20: 20 - 13",
      instruction: "A dalt hi ha 20 i a sota ja tenim 13 (10 + 3). Afegeix la regleta que falta per arribar a 20!",
      targetValue: 20,
      referenceRods: [10, 10],
      initialRowB: [10, 3],
      operationMode: "subtraction",
      minuend: 20,
      subtrahend: 13,
      constraints: { exactCount: 3 },
      hints: [
        "De 13 fins a 20 falten les mateixes unitats que de 3 fins a 10.",
        "Afegeix la regleta Negra (7)!"
      ],
      explanation: "Perfecte! 20 - 13 = 7."
    },
    {
      id: "res-2-3",
      level: 2,
      title: "Restem: 24 - 16",
      instruction: "A dalt tenim 24 i a sota ja hi ha 16 (10 + 6). Quina regleta falta per igualar el 24?",
      targetValue: 24,
      referenceRods: [10, 10, 4],
      initialRowB: [10, 6],
      operationMode: "subtraction",
      minuend: 24,
      subtrahend: 16,
      constraints: { exactCount: 3 },
      hints: [
        "De 16 a 20 van 4, i de 20 a 24 van 4 més: 4 + 4 = 8.",
        "Afegeix la regleta Marró (8)!"
      ],
      explanation: "Molt bé! 24 - 16 = 8."
    },
    {
      id: "res-2-4",
      level: 2,
      title: "Restem: 18 - 9",
      instruction: "A dalt hi ha 18 (10+8) i a sota tenim el 9. Afegeix una sola regleta per arribar a 18!",
      targetValue: 18,
      referenceRods: [10, 8],
      initialRowB: [9],
      operationMode: "subtraction",
      minuend: 18,
      subtrahend: 9,
      constraints: { exactCount: 2 },
      hints: [
        "De 9 a 10 va 1, i de 10 a 18 van 8: 1 + 8 = 9.",
        "Afegeix una altra regleta Blava (9)!"
      ],
      explanation: "Genial! 18 - 9 = 9 (perquè el doble de 9 és 18)."
    },
    {
      id: "res-2-5",
      level: 2,
      title: "Restem: 22 - 15",
      instruction: "A dalt hi ha 22 i a sota ja tenim 15 (10 + 5). Afegeix la regleta que falta per arribar a 22!",
      targetValue: 22,
      referenceRods: [10, 10, 2],
      initialRowB: [10, 5],
      operationMode: "subtraction",
      minuend: 22,
      subtrahend: 15,
      constraints: { exactCount: 3 },
      hints: [
        "De 15 a 20 van 5, i de 20 a 22 van 2: 5 + 2 = 7.",
        "Afegeix la regleta Negra (7)!"
      ],
      explanation: "Fantàstic! 22 - 15 = 7."
    },

    // ⭐⭐⭐ EXPERT (5 exercicis)
    {
      id: "res-3-1",
      level: 3,
      title: "Escalada amb desenes: 30 - 17",
      instruction: "A dalt hi ha 30 i a sota ja tenim 17 (10 + 7). Completa la fila amb les regletes que falten per arribar a 30!",
      targetValue: 30,
      referenceRods: [10, 10, 10],
      initialRowB: [10, 7],
      operationMode: "subtraction",
      minuend: 30,
      subtrahend: 17,
      constraints: {},
      hints: [
        "De 17 a 20 van 3, i de 20 a 30 va 1 desena (10). En total falten 13!",
        "Afegeix una regleta Taronja (10) i una Verd clar (3)."
      ],
      explanation: "Excel·lent! 30 - 17 = 13."
    },
    {
      id: "res-3-2",
      level: 3,
      title: "Diferència entre 32 i 18: 32 - 18",
      instruction: "A dalt hi ha 32 i a sota ja hi ha 18 (10 + 8). Afegeix les regletes que falten per arribar a 32!",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      initialRowB: [10, 8],
      operationMode: "subtraction",
      minuend: 32,
      subtrahend: 18,
      constraints: {},
      hints: [
        "De 18 a 20 van 2, i de 20 a 32 van 12. En total la diferència és 14.",
        "Afegeix una regleta Taronja (10) i una Rosa (4)!"
      ],
      explanation: "Molt bé! 32 - 18 = 14."
    },
    {
      id: "res-3-3",
      level: 3,
      title: "Repte de resta: 35 - 19",
      instruction: "A dalt tenim 35 i a sota hi ha 19 (10 + 9). Completa la teva fila per descobrir quant és 35 - 19.",
      targetValue: 35,
      referenceRods: [10, 10, 10, 5],
      initialRowB: [10, 9],
      operationMode: "subtraction",
      minuend: 35,
      subtrahend: 19,
      constraints: {},
      hints: [
        "De 19 a 20 falta 1, i de 20 a 35 falten 15. Per tant, 1 + 15 = 16!",
        "Afegeix una regleta Taronja (10) i una Verd fosc (6)."
      ],
      explanation: "Molt bé! 35 - 19 = 16."
    },
    {
      id: "res-3-4",
      level: 3,
      title: "De 14 fins a 31: 31 - 14",
      instruction: "A dalt hi ha 31 i a sota tenim 14 (10 + 4). Completa la fila amb les regletes que falten per arribar a 31!",
      targetValue: 31,
      referenceRods: [10, 10, 10, 1],
      initialRowB: [10, 4],
      operationMode: "subtraction",
      minuend: 31,
      subtrahend: 14,
      constraints: {},
      hints: [
        "De 14 a 20 van 6, i de 20 a 31 van 11. En total: 6 + 11 = 17!",
        "Afegeix una regleta Taronja (10) i una Negra (7)."
      ],
      explanation: "Brillant! 31 - 14 = 17."
    },
    {
      id: "res-3-5",
      level: 3,
      title: "Repte Expert: 36 - 18",
      instruction: "A dalt tenim 36 i a sota hi ha 18 (10 + 8). Afegeix les regletes que falten per igualar el 36!",
      targetValue: 36,
      referenceRods: [10, 10, 10, 6],
      initialRowB: [10, 8],
      operationMode: "subtraction",
      minuend: 36,
      subtrahend: 18,
      constraints: {},
      hints: [
        "De 18 a 20 van 2, i de 20 a 36 van 16. En total falten 18!",
        "Afegeix una regleta Taronja (10) i una Marró (8)."
      ],
      explanation: "Nivell Expert completat! 36 - 18 = 18."
    }
  ],

  // ==========================================================================
  // 4. MULTIPLICACIONS (TÈCNICA ITALIANA · 15 EXERCICIS: 5 PER NIVELL)
  // ==========================================================================
  multiplicacions: [
    // ⭐ PRINCIPIANT (5 exercicis)
    {
      id: "mul-1-1",
      level: 1,
      title: "2 × 4 (Tècnica Italiana)",
      instruction: "Mira el factor horitzontal a dalt (4) i el factor vertical a l'esquerra (2). Omple les 2 files del rectangle amb regletes del 4!",
      vFactor: 2,
      hFactorRods: [4],
      targetValue: 8,
      hints: [
        "El rectangle té 2 files i una amplada de 4.",
        "Fes clic 2 vegades a la regleta Rosa (4) per omplir-lo (2 × 4 = 8)!"
      ],
      explanation: "Molt bé! 2 × 4 = 8."
    },
    {
      id: "mul-1-2",
      level: 1,
      title: "3 × 4 (Tècnica Italiana)",
      instruction: "Mira el factor horitzontal a dalt (4) i el factor vertical a l'esquerra (3). Omple les 3 files de l'interior del rectangle amb regletes del 4!",
      vFactor: 3,
      hFactorRods: [4],
      targetValue: 12,
      hints: [
        "El reglet vertical del 3 t'indica que hi ha 3 files, i el reglet horitzontal del 4 marca l'amplada.",
        "Fes clic 3 vegades a la regleta Rosa (4) per omplir tot el rectangle (3 × 4 = 12)!"
      ],
      explanation: "Molt bé! Has omplert el rectangle de 3 × 4 = 12."
    },
    {
      id: "mul-1-3",
      level: 1,
      title: "3 × 5 (Tècnica Italiana)",
      instruction: "A dalt tenim el 5 en horitzontal i a l'esquerra el 3 en vertical. Omple el rectangle amb regletes per calcular 3 × 5!",
      vFactor: 3,
      hFactorRods: [5],
      targetValue: 15,
      hints: [
        "Hi ha 3 files i cada fila mesura 5.",
        "Col·loca 3 regletes Grogues (5) dins del rectangle: 3 × 5 = 15."
      ],
      explanation: "Genial! 3 × 5 = 15."
    },
    {
      id: "mul-1-4",
      level: 1,
      title: "4 × 5 (Tècnica Italiana)",
      instruction: "A dalt tenim el 5 en horitzontal i a l'esquerra el 4 en vertical. Omple el rectangle amb regletes per calcular 4 × 5!",
      vFactor: 4,
      hFactorRods: [5],
      targetValue: 20,
      hints: [
        "Hi ha 4 files d'alçada i 5 d'amplada.",
        "Col·loca 4 regletes Grogues (5) dins del rectangle per omplir-lo (4 × 5 = 20)."
      ],
      explanation: "Fantàstic! L'àrea del rectangle és 4 × 5 = 20."
    },
    {
      id: "mul-1-5",
      level: 1,
      title: "3 × 6 (Tècnica Italiana)",
      instruction: "El factor vertical és 3 i el factor horitzontal és 6. Omple les 3 files del rectangle amb regletes per trobar el resultat de 3 × 6!",
      vFactor: 3,
      hFactorRods: [6],
      targetValue: 18,
      hints: [
        "Cada fila té l'amplada de la regleta verd fosc (6).",
        "Posa 3 regletes Verd fosc (6) dins del rectangle: 6 + 6 + 6 = 18."
      ],
      explanation: "Perfecte! 3 × 6 = 18."
    },

    // ⭐⭐ MITJÀ (5 exercicis)
    {
      id: "mul-2-1",
      level: 2,
      title: "4 × 6 (Tècnica Italiana)",
      instruction: "Omple el rectangle format pel factor vertical 4 i el factor horitzontal 6 amb regletes!",
      vFactor: 4,
      hFactorRods: [6],
      targetValue: 24,
      hints: [
        "El rectangle té 4 files i cada fila mesura 6.",
        "Fes clic 4 vegades a la regleta Verd fosc (6) per omplir el rectangle (4 × 6 = 24)."
      ],
      explanation: "Molt bé! 4 × 6 = 24."
    },
    {
      id: "mul-2-2",
      level: 2,
      title: "3 × 8 (Tècnica Italiana)",
      instruction: "A l'esquerra hi ha el 3 en vertical i a dalt el 8 en horitzontal. Omple el rectangle amb regletes per calcular 3 × 8!",
      vFactor: 3,
      hFactorRods: [8],
      targetValue: 24,
      hints: [
        "Hi ha 3 files d'amplada 8 (regleta marró).",
        "Col·loca 3 regletes Marrons (8) per omplir el rectangle: 3 × 8 = 24."
      ],
      explanation: "Genial! 3 × 8 = 24 (la mateixa àrea que 4 × 6!)."
    },
    {
      id: "mul-2-3",
      level: 2,
      title: "5 × 7 (Tècnica Italiana)",
      instruction: "A l'esquerra tenim el 5 en vertical i a dalt el 7 en horitzontal. Omple tot el rectangle amb regletes per calcular 5 × 7!",
      vFactor: 5,
      hFactorRods: [7],
      targetValue: 35,
      hints: [
        "Hi ha 5 files i cada fila té l'amplada de la regleta negra (7).",
        "Col·loca 5 regletes Negres (7) per omplir tot el rectangle: 5 × 7 = 35."
      ],
      explanation: "Perfecte! 5 × 7 = 35."
    },
    {
      id: "mul-2-4",
      level: 2,
      title: "4 × 8 (Tècnica Italiana)",
      instruction: "Omple el rectangle de 4 (vertical) per 8 (horitzontal) amb regletes per trobar el producte 4 × 8!",
      vFactor: 4,
      hFactorRods: [8],
      targetValue: 32,
      hints: [
        "Cada fila mesura 8 (regleta marró) i tenim 4 files.",
        "Posa 4 regletes Marrons (8) per omplir les 4 files: 4 × 8 = 32."
      ],
      explanation: "Molt bé! 4 × 8 = 32."
    },
    {
      id: "mul-2-5",
      level: 2,
      title: "4 × 9 (Tècnica Italiana)",
      instruction: "A l'esquerra tenim el 4 en vertical i a dalt el 9 en horitzontal. Omple les 4 files del rectangle amb regletes!",
      vFactor: 4,
      hFactorRods: [9],
      targetValue: 36,
      hints: [
        "Cada fila té l'amplada de la regleta blava (9).",
        "Col·loca 4 regletes Blaves (9) per omplir el rectangle: 4 × 9 = 36."
      ],
      explanation: "Fantàstic! 4 × 9 = 36."
    },

    // ⭐⭐⭐ EXPERT (5 exercicis — TÈCNICA ITALIANA AMB DESCOMPOSICIÓ)
    {
      id: "mul-3-1",
      level: 3,
      title: "Tècnica Italiana: 2 × 13 (10 + 3)",
      instruction: "A dalt tenim el 13 descompost en horitzontal (10 + 3) i a l'esquerra el 2 en vertical. Omple les 2 files del rectangle amb regletes del 10 i del 3!",
      vFactor: 2,
      hFactorRods: [10, 3],
      targetValue: 26,
      hints: [
        "A cada fila hi cap una regleta Taronja (10) i una Verd clar (3).",
        "Omple les 2 files amb 10 + 3 a cadascuna: (2 × 10) + (2 × 3) = 20 + 6 = 26!"
      ],
      explanation: "Molt bé! Amb la tècnica italiana veiem que 2 × 13 = 20 + 6 = 26."
    },
    {
      id: "mul-3-2",
      level: 3,
      title: "Tècnica Italiana: 3 × 12 (10 + 2)",
      instruction: "A dalt hi ha el 12 en horitzontal (10 + 2) i a l'esquerra el 3 en vertical. Omple les 3 files de la graella italiana amb regletes!",
      vFactor: 3,
      hFactorRods: [10, 2],
      targetValue: 36,
      hints: [
        "A cada fila posa-hi una regleta Taronja (10) i una Vermella (2).",
        "Com que hi ha 3 files: (3 × 10) + (3 × 2) = 30 + 6 = 36!"
      ],
      explanation: "Excel·lent! 3 × 12 = 30 + 6 = 36."
    },
    {
      id: "mul-3-3",
      level: 3,
      title: "Tècnica Italiana: 3 × 15 (10 + 5)",
      instruction: "A dalt tenim el 15 en horitzontal (10 + 5) i a l'esquerra el 3 en vertical. Omple les 3 files del rectangle amb regletes!",
      vFactor: 3,
      hFactorRods: [10, 5],
      targetValue: 45,
      hints: [
        "A cada fila posa-hi una regleta Taronja (10) i una Groga (5).",
        "Primera caixa: 3 × 10 = 30. Segona caixa: 3 × 5 = 15. Total: 30 + 15 = 45!"
      ],
      explanation: "Brillant! 3 × 15 = 30 + 15 = 45."
    },
    {
      id: "mul-3-4",
      level: 3,
      title: "Tècnica Italiana: 4 × 13 (10 + 3)",
      instruction: "A dalt hi ha el 13 en horitzontal (10 + 3) i a l'esquerra el 4 en vertical. Omple les 4 files de la graella italiana!",
      vFactor: 4,
      hFactorRods: [10, 3],
      targetValue: 52,
      hints: [
        "Posa 10 + 3 a cadascuna de les 4 files.",
        "(4 × 10) + (4 × 3) = 40 + 12 = 52!"
      ],
      explanation: "Molt bé! 4 × 13 = 40 + 12 = 52."
    },
    {
      id: "mul-3-5",
      level: 3,
      title: "Tècnica Italiana: 4 × 14 (10 + 4)",
      instruction: "A dalt tenim el 14 en horitzontal (10 + 4) i a l'esquerra el 4 en vertical. Omple les 4 files del rectangle amb regletes!",
      vFactor: 4,
      hFactorRods: [10, 4],
      targetValue: 56,
      hints: [
        "A cadascuna de les 4 files posa-hi una regleta del 10 i una del 4.",
        "Primera caixa: 4 × 10 = 40. Segona caixa: 4 × 4 = 16. Total: 40 + 16 = 56!"
      ],
      explanation: "Nivell Expert completat! 4 × 14 = 40 + 16 = 56."
    }
  ]
};

// ============================================================================
// 5. PROBLEMES CONTEXTUALITZATS (15 PROBLEMES: 5 PER NIVELL D'ESTRELLES)
// ============================================================================
const WORD_PROBLEMS = [
  // ⭐ PRINCIPIANT (5 problemes)
  {
    id: "prob-1",
    level: 1,
    contextIcon: "🌱",
    title: "L'hort escolar de 6è",
    statement: "A l'hort de l'escola, la classe de 6è A ha plantat 8 tomaqueres i la classe de 6è B n'ha plantat 6. Quantes tomaqueres han plantat en total?",
    question: "Quantes tomaqueres hi ha en total?",
    expectedAnswer: 14,
    unit: "tomaqueres",
    targetRodUnits: 14,
    suggestedModelRods: [8, 6],
    hints: [
      "Volem saber el total ajuntant les 8 tomaqueres de 6è A i les 6 de 6è B.",
      "Pots posar una regleta del 8 i una del 6 al tauler: 8 + 6 = 14."
    ],
    explanation: "Molt bé! 8 + 6 = 14 tomaqueres en total."
  },
  {
    id: "prob-2",
    level: 1,
    contextIcon: "🤖",
    title: "Peces del robot",
    statement: "Per muntar un robot necessitem 15 peces. Si ja n'hem col·locat 9, quantes peces ens falten encara?",
    question: "Quantes peces falten?",
    expectedAnswer: 6,
    unit: "peces",
    targetRodUnits: 6,
    suggestedModelRods: [6],
    hints: [
      "Pensa quant falta des de 9 fins a 15 (15 - 9).",
      "De 9 a 10 falta 1, i de 10 a 15 en falten 5: 1 + 5 = 6 peces."
    ],
    explanation: "Genial! 15 - 9 = 6 peces."
  },
  {
    id: "prob-3",
    level: 1,
    contextIcon: "🎨",
    title: "Pots de pintura",
    statement: "A l'aula de plàstica hi ha 3 taules i a cada taula hem posat 5 pots de pintura. Quants pots de pintura hi ha en total?",
    question: "Quants pots hi ha en total?",
    expectedAnswer: 15,
    unit: "pots",
    targetRodUnits: 15,
    suggestedModelRods: [5, 5, 5],
    hints: [
      "Tenim 3 vegades 5 pots (5 + 5 + 5).",
      "Posa 3 regletes grogues (5): 3 × 5 = 15 pots."
    ],
    explanation: "Fantàstic! 3 × 5 = 15 pots de pintura."
  },
  {
    id: "prob-4",
    level: 1,
    contextIcon: "⚽",
    title: "Pilotes al gimnàs",
    statement: "Al cistell d'educació física hi havia 7 pilotes de bàsquet i el mestre n'hi ha afegit 5 més. Quantes pilotes hi ha ara al cistell?",
    question: "Quantes pilotes hi ha ara?",
    expectedAnswer: 12,
    unit: "pilotes",
    targetRodUnits: 12,
    suggestedModelRods: [7, 5],
    hints: [
      "Ajuntem les 7 pilotes que hi havia amb les 5 noves.",
      "Posa una regleta del 7 i una del 5: 7 + 5 = 12 pilotes."
    ],
    explanation: "Molt bé! 7 + 5 = 12 pilotes."
  },
  {
    id: "prob-5",
    level: 1,
    contextIcon: "🖍️",
    title: "Estoig de colors",
    statement: "En un estoig hi caben 18 llapis de colors. Si ara mateix n'hi ha 10, quants llapis falten per omplir l'estoig?",
    question: "Quants llapis falten?",
    expectedAnswer: 8,
    unit: "llapis",
    targetRodUnits: 8,
    suggestedModelRods: [8],
    hints: [
      "De 10 fins a 18, quantes unitats falten?",
      "18 - 10 = 8 llapis (una regleta marró)."
    ],
    explanation: "Perfecte! 18 - 10 = 8 llapis."
  },

  // ⭐⭐ MITJÀ (5 problemes)
  {
    id: "prob-6",
    level: 2,
    contextIcon: "📚",
    title: "Llibres de la biblioteca",
    statement: "Hem comprat 4 caixes de còmics en català. Si a cada caixa hi vénen 6 còmics, quants còmics tenim en total?",
    question: "Quants còmics tenim?",
    expectedAnswer: 24,
    unit: "còmics",
    targetRodUnits: 24,
    suggestedModelRods: [6, 6, 6, 6],
    hints: [
      "4 caixes amb 6 còmics a cadascuna és 4 vegades 6 (4 × 6).",
      "Posa 4 regletes del 6 al tauler: 6 + 6 + 6 + 6 = 24 còmics."
    ],
    explanation: "Molt bé! 4 × 6 = 24 còmics."
  },
  {
    id: "prob-7",
    level: 2,
    contextIcon: "🚌",
    title: "Places a l'autocar de l'excursió",
    statement: "En un microbús hi ha 25 places. Ja hi han pujat 12 alumnes de 6è A i 7 alumnes de 6è B. Quantes places queden lliures?",
    question: "Quantes places queden lliures?",
    expectedAnswer: 6,
    unit: "places",
    targetRodUnits: 6,
    suggestedModelRods: [6],
    hints: [
      "1r pas: Suma els alumnes que ja han pujat: 12 + 7 = 19 alumnes.",
      "2n pas: Resta del total de places: 25 - 19 = 6 places lliures."
    ],
    explanation: "Perfecte! 12 + 7 = 19 alumnes; i 25 - 19 = 6 places lliures."
  },
  {
    id: "prob-8",
    level: 2,
    contextIcon: "🏀",
    title: "Punts al partit de bàsquet",
    statement: "La Laia ha encistellat 8 punts al partit, i en Marc n'ha fet el doble que la Laia. Quants punts ha fet en Marc?",
    question: "Quants punts ha fet en Marc?",
    expectedAnswer: 16,
    unit: "punts",
    targetRodUnits: 16,
    suggestedModelRods: [8, 8],
    hints: [
      "El doble de 8 vol dir 2 vegades 8 (8 + 8).",
      "Posa dues regletes marrons (8): 2 × 8 = 16 punts."
    ],
    explanation: "Molt bé! El doble de 8 és 2 × 8 = 16 punts."
  },
  {
    id: "prob-9",
    level: 2,
    contextIcon: "🍪",
    title: "Galetes per a la fira escolar",
    statement: "Hem preparat 3 safates amb 7 galetes a cada safata. Quantes galetes tenim en total per vendre a la fira?",
    question: "Quantes galetes tenim?",
    expectedAnswer: 21,
    unit: "galetes",
    targetRodUnits: 21,
    suggestedModelRods: [7, 7, 7],
    hints: [
      "3 safates de 7 galetes és 3 vegades 7 (7 + 7 + 7).",
      "Col·loca 3 regletes Negres (7): 3 × 7 = 21 galetes."
    ],
    explanation: "Genial! 3 × 7 = 21 galetes."
  },
  {
    id: "prob-10",
    level: 2,
    contextIcon: "🚲",
    title: "Sortida en bicicleta",
    statement: "La ruta en bici és de 24 quilòmetres. Al matí hem fet 9 km i a la tarda 8 km més. Quants quilòmetres ens falten per acabar?",
    question: "Quants km falten?",
    expectedAnswer: 7,
    unit: "km",
    targetRodUnits: 7,
    suggestedModelRods: [7],
    hints: [
      "1r pas: Suma els km que ja hem fet: 9 + 8 = 17 km.",
      "2n pas: Calcula quant falta de 17 fins a 24: 24 - 17 = 7 km."
    ],
    explanation: "Fantàstic! 9 + 8 = 17 km fets, i 24 - 17 = 7 km que falten."
  },

  // ⭐⭐⭐ EXPERT (5 problemes)
  {
    id: "prob-11",
    level: 3,
    contextIcon: "🍎",
    title: "Fruita per a l'esmorzar saludable",
    statement: "Tenim 3 safates amb 8 pomes a cada safata. Si repartim 10 pomes a l'hora del pati, quantes pomes ens queden?",
    question: "Quantes pomes queden?",
    expectedAnswer: 14,
    unit: "pomes",
    targetRodUnits: 14,
    suggestedModelRods: [10, 4],
    hints: [
      "1r pas: Calcula quantes pomes hi havia al principi: 3 × 8 = 24 pomes.",
      "2n pas: Resta les 10 pomes que hem repartit: 24 - 10 = 14 pomes."
    ],
    explanation: "Excel·lent! 3 × 8 = 24 pomes inicials, menys 10 repartides = 14 pomes."
  },
  {
    id: "prob-12",
    level: 3,
    contextIcon: "📦",
    title: "Packs de material escolar",
    statement: "El mestre ha preparat 4 caixes. A dins de cada caixa hi ha posat 5 llapis i 3 gomes d'esborrar. Quants objectes hi ha en total entre totes les caixes?",
    question: "Quants objectes hi ha en total?",
    expectedAnswer: 32,
    unit: "objectes",
    targetRodUnits: 32,
    suggestedModelRods: [8, 8, 8, 8],
    hints: [
      "1r pas: A cada caixa hi ha 5 + 3 = 8 objectes.",
      "2n pas: Com que hi ha 4 caixes iguals: 4 × 8 = 32 objectes."
    ],
    explanation: "Brillant! 4 × (5 + 3) = 4 × 8 = 32 objectes en total."
  },
  {
    id: "prob-13",
    level: 3,
    contextIcon: "🎟️",
    title: "Entrades per al teatre",
    statement: "El nostre grup té 30 euros per comprar entrades. Compren 3 entrades que costen 7 euros cadascuna. Quants euros els sobren?",
    question: "Quants euros sobren?",
    expectedAnswer: 9,
    unit: "euros",
    targetRodUnits: 9,
    suggestedModelRods: [9],
    hints: [
      "1r pas: Calcula quant costen les 3 entrades: 3 × 7 = 21 euros.",
      "2n pas: Resta dels 30 euros inicials: 30 - 21 = 9 euros."
    ],
    explanation: "Molt bé! 3 × 7 = 21 € gastats, i 30 - 21 = 9 € que sobren."
  },
  {
    id: "prob-14",
    level: 3,
    contextIcon: "🪴",
    title: "Testos per a l'hivernacle",
    statement: "A l'hivernacle hem posat 3 prestatges amb 6 testos a cada prestatge, i a més hem portat 9 testos nous. Quants testos hi ha en total?",
    question: "Quants testos hi ha en total?",
    expectedAnswer: 27,
    unit: "testos",
    targetRodUnits: 27,
    suggestedModelRods: [6, 6, 6, 9],
    hints: [
      "1r pas: Calcula els testos dels 3 prestatges: 3 × 6 = 18 testos.",
      "2n pas: Suma-hi els 9 testos nous: 18 + 9 = 27 testos."
    ],
    explanation: "Genial! (3 × 6) + 9 = 18 + 9 = 27 testos."
  },
  {
    id: "prob-15",
    level: 3,
    contextIcon: "🏆",
    title: "Punts de la gimcana",
    statement: "A la gimcana de 6è, l'equip Verd ha superat 4 proves de 9 punts cadascuna, però ha perdut 6 punts per una pista. Quants punts té al final?",
    question: "Quants punts té al final?",
    expectedAnswer: 30,
    unit: "punts",
    targetRodUnits: 30,
    suggestedModelRods: [10, 10, 10],
    hints: [
      "1r pas: Punts guanyats a les 4 proves: 4 × 9 = 36 punts.",
      "2n pas: Resta els 6 punts de la pista: 36 - 6 = 30 punts."
    ],
    explanation: "Nivell Expert completat! (4 × 9) - 6 = 36 - 6 = 30 punts."
  }
];
