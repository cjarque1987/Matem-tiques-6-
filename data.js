// ============================================================================
// DADES EDUCATIVES — REGLETES DE CUISENAIRE (CATALÀ · DUA · SENSE DECIMALS)
// Tres nivells d'estrelles: ⭐ Principiant (1), ⭐⭐ Mitjà (2), ⭐⭐⭐ Expert (3)
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
  // 1. DESCOMPOSICIÓ DE NOMBRES
  // ==========================================================================
  descomposicio: [
    // ⭐ PRINCIPIANT
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
      title: "Desena i unitats: el 14",
      instruction: "Construeix el número 14 amb només 2 regletes: una desena (10) i les unitats que falten.",
      targetValue: 14,
      referenceRods: [10, 4],
      constraints: { exactCount: 2, requiredRods: [10, 4] },
      hints: [
        "El 14 té una desena (10) i 4 unitats.",
        "Posa una regleta Taronja (10) i una regleta Rosa (4)."
      ],
      explanation: "Genial! 14 = 10 + 4 (1 desena i 4 unitats)."
    },
    {
      id: "desc-1-3",
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
      explanation: "Fantàstic! El doble de 6 és 12 (6 + 6 = 12)."
    },

    // ⭐⭐ MITJÀ
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

    // ⭐⭐⭐ EXPERT
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
        "També pots posar tres regletes del 6 i una del 6 (6 + 6 + 6 + 6 = 24)."
      ],
      explanation: "Repte Expert superat! Has descompost el 24 complint totes les condicions."
    },
    {
      id: "desc-3-2",
      level: 3,
      title: "Desfem una desena del 26",
      instruction: "El 26 és 10 + 10 + 6. Construeix 26 utilitzant NOMÉS 1 regleta taronja (10) i la resta amb altres regletes.",
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
      title: "Escala de 4 regletes diferents: el 20",
      instruction: "Construeix el número 20 utilitzant 4 regletes i SENSE usar la regleta taronja (10).",
      targetValue: 20,
      referenceRods: [10, 10],
      constraints: { exactCount: 4, forbiddenRods: [10] },
      hints: [
        "Pensa en 4 regletes que sumin 20 sense el 10.",
        "Per exemple: quatre regletes grogues (5 + 5 + 5 + 5 = 20) o bé 8 + 6 + 4 + 2 = 20!"
      ],
      explanation: "Increïble! Has construït el 20 amb 4 peces sense cap regleta del 10."
    }
  ],

  // ==========================================================================
  // 2. SUMES
  // ==========================================================================
  sumes: [
    // ⭐ PRINCIPIANT
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
      title: "El pont al 10: 8 + 5",
      instruction: "A dalt hi ha 8 + 5. Calcula el total i representa'l amb una desena (10) i la regleta d'unitats que correspongui.",
      targetValue: 13,
      referenceRods: [8, 5],
      constraints: { exactCount: 2, requiredRods: [10, 3] },
      hints: [
        "8 + 5 = 13.",
        "Per fer 13 amb desenes i unitats, posa una regleta Taronja (10) i una Verd clar (3)."
      ],
      explanation: "Genial! 8 + 5 = 10 + 3 = 13."
    },
    {
      id: "sum-1-3",
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
      explanation: "Fantàstic! 9 + 6 = 10 + 5 = 15."
    },

    // ⭐⭐ MITJÀ
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

    // ⭐⭐⭐ EXPERT
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
      title: "Tres sumands grans: 12 + 11 + 9",
      instruction: "Calcula 12 + 11 + 9 i expressa el resultat amb regletes del 10 i la peça d'unitats.",
      targetValue: 32,
      referenceRods: [10, 2, 10, 1, 9],
      constraints: { exactCount: 4, requiredRods: [10, 2] },
      hints: [
        "Fixa't que 11 + 9 = 20! I 20 + 12 = 32.",
        "Posa tres regletes Taronges (30) i una Vermella (2)."
      ],
      explanation: "Nivell Expert completat! 12 + (11 + 9) = 12 + 20 = 32."
    }
  ],

  // ==========================================================================
  // 3. RESTES (COMPLEMENT: QUINA REGLETA FALTA?)
  // ==========================================================================
  restes: [
    // ⭐ PRINCIPIANT
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

    // ⭐⭐ MITJÀ
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

    // ⭐⭐⭐ EXPERT
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
      explanation: "Repte Expert superat! 35 - 19 = 16."
    }
  ],

  // ==========================================================================
  // 4. MULTIPLICACIONS
  // ==========================================================================
  multiplicacions: [
    // ⭐ PRINCIPIANT
    {
      id: "mul-1-1",
      level: 1,
      title: "3 vegades 4 (3 × 4)",
      instruction: "Representa la multiplicació 3 × 4 posant 3 regletes del número 4.",
      targetValue: 12,
      referenceRods: [10, 2],
      constraints: { exactCount: 3, requiredRods: [4], sameColorOnly: true },
      hints: [
        "3 × 4 vol dir posar 3 vegades la regleta rosa (4).",
        "Fes clic 3 vegades a la regleta Rosa (4) per fer 4 + 4 + 4 = 12."
      ],
      explanation: "Molt bé! 3 × 4 = 4 + 4 + 4 = 12."
    },
    {
      id: "mul-1-2",
      level: 1,
      title: "4 vegades 5 (4 × 5)",
      instruction: "Construeix 4 × 5 posant 4 regletes del número 5.",
      targetValue: 20,
      referenceRods: [10, 10],
      constraints: { exactCount: 4, requiredRods: [5], sameColorOnly: true },
      hints: [
        "La regleta del 5 és la groga.",
        "Fes clic 4 vegades a la regleta Groga (5) per arribar a 20."
      ],
      explanation: "Genial! 4 × 5 = 20 (igual que 2 desenes)."
    },
    {
      id: "mul-1-3",
      level: 1,
      title: "3 vegades 6 (3 × 6)",
      instruction: "Representa 3 × 6 col·locant 3 regletes del número 6.",
      targetValue: 18,
      referenceRods: [10, 8],
      constraints: { exactCount: 3, requiredRods: [6], sameColorOnly: true },
      hints: [
        "La regleta del 6 és la de color verd fosc.",
        "Col·loca 3 regletes Verd fosc (6 + 6 + 6 = 18)."
      ],
      explanation: "Fantàstic! 3 × 6 = 18."
    },

    // ⭐⭐ MITJÀ
    {
      id: "mul-2-1",
      level: 2,
      title: "4 vegades 6 (4 × 6)",
      instruction: "Construeix la multiplicació 4 × 6 posant 4 regletes del número 6.",
      targetValue: 24,
      referenceRods: [10, 10, 4],
      constraints: { exactCount: 4, requiredRods: [6], sameColorOnly: true },
      hints: [
        "Repeteix 4 vegades la regleta verd fosc (6).",
        "6 + 6 + 6 + 6 = 24."
      ],
      explanation: "Molt bé! 4 × 6 = 24."
    },
    {
      id: "mul-2-2",
      level: 2,
      title: "Propietat commutativa: 3 × 7 i 7 × 3",
      instruction: "A dalt hi ha 3 regletes del 7 (3 × 7 = 21). Demostra que 7 × 3 dóna el mateix posant 7 regletes del 3!",
      targetValue: 21,
      referenceRods: [7, 7, 7],
      constraints: { exactCount: 7, requiredRods: [3], sameColorOnly: true },
      hints: [
        "7 × 3 vol dir repetir 7 vegades la regleta verd clar (3).",
        "Fes clic 7 vegades a la regleta Verd clar (3)."
      ],
      explanation: "Perfecte! 3 × 7 = 7 × 3 = 21."
    },
    {
      id: "mul-2-3",
      level: 2,
      title: "4 vegades 8 (4 × 8)",
      instruction: "Construeix 4 × 8 col·locant 4 regletes del número 8.",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      constraints: { exactCount: 4, requiredRods: [8], sameColorOnly: true },
      hints: [
        "La regleta del 8 és la marró.",
        "Posa 4 regletes Marrons (8 + 8 + 8 + 8 = 32)."
      ],
      explanation: "Molt bé! 4 × 8 = 32."
    },

    // ⭐⭐⭐ EXPERT
    {
      id: "mul-3-1",
      level: 3,
      title: "Multipliquem per dos dígits: 2 × 13",
      instruction: "Per fer 2 × 13, descomponem el 13 en (10 + 3). Posa 2 regletes del 10 i 2 regletes del 3!",
      targetValue: 26,
      referenceRods: [10, 10, 6],
      constraints: { exactCount: 4, requiredRods: [10, 3] },
      hints: [
        "2 vegades 13 és 2 vegades 10 (20) més 2 vegades 3 (6).",
        "Posa dues regletes Taronges (10) i dues Verd clar (3). Total: 26!"
      ],
      explanation: "Molt bé! 2 × 13 = (2 × 10) + (2 × 3) = 20 + 6 = 26."
    },
    {
      id: "mul-3-2",
      level: 3,
      title: "Propietat distributiva: 3 × 12",
      instruction: "Calcula 3 × 12 posant 3 regletes del 10 i 3 regletes del 2.",
      targetValue: 36,
      referenceRods: [10, 10, 10, 6],
      constraints: { exactCount: 6, requiredRods: [10, 2] },
      hints: [
        "12 és 10 + 2. Per tant, 3 × 12 = (3 × 10) + (3 × 2).",
        "Col·loca 3 regletes Taronges (10) i 3 regletes Vermelles (2). Total: 36!"
      ],
      explanation: "Excel·lent! 3 × 12 = 30 + 6 = 36."
    },
    {
      id: "mul-3-3",
      level: 3,
      title: "Repte Expert: 3 × 11",
      instruction: "Construeix 3 × 11 posant 3 vegades 10 i 3 vegades 1 (6 regletes en total).",
      targetValue: 33,
      referenceRods: [10, 10, 10, 3],
      constraints: { exactCount: 6, requiredRods: [10, 1] },
      hints: [
        "11 és 10 + 1.",
        "Col·loca 3 regletes Taronges (10) i 3 regletes Blanques (1). Total: 33!"
      ],
      explanation: "Nivell Expert completat! 3 × 11 = 30 + 3 = 33."
    }
  ]
};

// ============================================================================
// 5. PROBLEMES CONTEXTUALITZATS (SENSE DECIMALS · 3 NIVELLS D'ESTRELLES)
// ============================================================================
const WORD_PROBLEMS = [
  // ⭐ PRINCIPIANT
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

  // ⭐⭐ MITJÀ
  {
    id: "prob-4",
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
    id: "prob-5",
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
    id: "prob-6",
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

  // ⭐⭐⭐ EXPERT
  {
    id: "prob-7",
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
    id: "prob-8",
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
    id: "prob-9",
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
    explanation: "Nivell Expert superat! 3 × 7 = 21 € gastats, i 30 - 21 = 9 € que sobren."
  }
];
