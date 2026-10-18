// ============================================================================
// DADES EDUCATIVES I CONFIGURACIÓ DE REGLETES DE CUISENAIRE (6è DE PRIMÀRIA)
// Disseny Universal per a l'Aprenentatge (DUA) - Tot el contingut en català
// Tres nivells: ⭐ Principiant (1), ⭐⭐ Mitjà (2), ⭐⭐⭐ Expert (3)
// ============================================================================

const CUISENAIRE_RODS = [
  { value: 1, name: "Blanca", color: "#FFFFFF", border: "#94A3B8", text: "#1E293B", code: "B", pattern: "pattern-1" },
  { value: 2, name: "Vermella", color: "#EF4444", border: "#B91C1C", text: "#FFFFFF", code: "V", pattern: "pattern-2" },
  { value: 3, name: "Verd clar", color: "#84CC16", border: "#4D7C0F", text: "#1E293B", code: "vc", pattern: "pattern-3" },
  { value: 4, name: "Rosa", color: "#EC4899", border: "#BE185D", text: "#FFFFFF", code: "R", pattern: "pattern-4" },
  { value: 5, name: "Groga", color: "#FACC15", border: "#A16207", text: "#1E293B", code: "G", pattern: "pattern-5" },
  { value: 6, name: "Verd fosc", color: "#15803D", border: "#14532D", text: "#FFFFFF", code: "vf", pattern: "pattern-6" },
  { value: 7, name: "Negra", color: "#1E293B", border: "#0F172A", text: "#FFFFFF", code: "N", pattern: "pattern-7" },
  { value: 8, name: "Marró", color: "#92400E", border: "#78350F", text: "#FFFFFF", code: "M", pattern: "pattern-8" },
  { value: 9, name: "Blava", color: "#2563EB", border: "#1D4ED8", text: "#FFFFFF", code: "Bl", pattern: "pattern-9" },
  { value: 10, name: "Taronja", color: "#F97316", border: "#C2410C", text: "#FFFFFF", code: "T", pattern: "pattern-10" }
];

const LEVEL_INFO = {
  1: { stars: "⭐", name: "Principiant", badge: "⭐ Principiant", starCount: 1 },
  2: { stars: "⭐⭐", name: "Mitjà", badge: "⭐⭐ Mitjà", starCount: 2 },
  3: { stars: "⭐⭐⭐", name: "Expert", badge: "⭐⭐⭐ Expert", starCount: 3 }
};

// Reptes guiats per a cada mòdul i nivell DUA:
// Nivell 1: ⭐ Principiant | Nivell 2: ⭐⭐ Mitjà | Nivell 3: ⭐⭐⭐ Expert
const MODULE_EXERCISES = {
  descomposicio: [
    // ⭐ PRINCIPIANT (Nivell 1)
    {
      id: "desc-1-1",
      level: 1,
      scale: 1,
      title: "El mur del 10 (Amics del 10)",
      instruction: "Construeix a la Fila B una descomposició del nombre 10 utilitzant exactament 2 regletes (no pots fer servir la regleta taronja del 10!).",
      targetValue: 10,
      referenceRods: [10],
      constraints: { exactCount: 2, forbiddenRods: [10] },
      hints: [
        "Mira la regleta taronja (10) de la Fila A. Necessites dues regletes que posades una al costat de l'altra tinguin la mateixa llargada.",
        "Prova de començar amb la regleta blava (9) o la marró (8) i busca quina li falta.",
        "Exemples vàlids: 9 + 1, 8 + 2, 7 + 3, 6 + 4 o 5 + 5."
      ],
      explanation: "Has guanyat ⭐! Les parelles que sumen 10 (amics del 10) són la base del nostre sistema decimal i del càlcul mental."
    },
    {
      id: "desc-1-2",
      level: 1,
      scale: 1,
      title: "Descomponem el 18 en desenes i unitats",
      instruction: "Representa el nombre 18 a la Fila B utilitzant el mínim nombre de regletes possible (descomposició canònica: desenes + unitats).",
      targetValue: 18,
      referenceRods: [10, 8],
      constraints: { exactCount: 2, requiredRods: [10, 8] },
      hints: [
        "El nombre 18 té 1 desena (10) i 8 unitats.",
        "Quina regleta val 10? I quina regleta val 8?",
        "Col·loca una regleta Taronja (10) i una regleta Marró (8) a la Fila B."
      ],
      explanation: "Has guanyat ⭐! 18 = 10 + 8 = 1 desena i 8 unitats."
    },
    {
      id: "desc-1-3",
      level: 1,
      scale: 1,
      title: "Descomposició creativa del 15",
      instruction: "Construeix el nombre 15 a la Fila B utilitzant exactament 3 regletes i SENSE utilitzar la regleta groga (5).",
      targetValue: 15,
      referenceRods: [10, 5],
      constraints: { exactCount: 3, forbiddenRods: [5] },
      hints: [
        "La longitud total ha de ser 15, però avui la regleta groga (5) està prohibida.",
        "Pots substituir la regleta del 5 per dues regletes que sumin 5 (com ara 3 + 2 o 4 + 1) juntament amb la del 10!",
        "Prova de posar a la Fila B: Taronja (10) + Verd clar (3) + Vermella (2)."
      ],
      explanation: "Has guanyat ⭐! Un mateix nombre es pot descompondre de moltes maneres equivalents: 15 = 10 + 3 + 2."
    },

    // ⭐⭐ MITJÀ (Nivell 2)
    {
      id: "desc-2-1",
      level: 2,
      scale: 1,
      title: "Descomposició no canònica del 34",
      instruction: "El nombre 34 és 3 desenes + 4 unitats (10+10+10+4). Ara descompon 34 utilitzant com a màxim 2 regletes taronges (10) i la resta amb altres regletes fins a sumar 34.",
      targetValue: 34,
      referenceRods: [10, 10, 10, 4],
      constraints: { maxCountOf10: 2, minTotalRods: 4 },
      hints: [
        "Si del 34 només poses dues regletes del 10 (que sumen 20), quant et falta per arribar a 34?",
        "Et falten 14 unitats (1 desena desfeta + 4 unitats). Com pots fer 14 sense usar cap altra regleta del 10?",
        "Pots posar: 10 + 10 + 8 + 6 = 34, o bé 10 + 10 + 9 + 5 = 34."
      ],
      explanation: "Has guanyat ⭐⭐! Desfer una desena (34 = 20 + 14) és el secret que fem servir quan fem restes portant o divisions."
    },
    {
      id: "desc-2-2",
      level: 2,
      scale: 10,
      title: "Escala ×10: Descomponem el 270",
      instruction: "Atenció a l'escala! Cada punt de regleta val 10 (la blanca val 10 i la taronja val 100). Construeix 270 a la Fila B amb exactament 4 regletes.",
      targetValue: 27,
      referenceRods: [10, 10, 7],
      constraints: { exactCount: 4 },
      hints: [
        "En escala ×10, la Fila A mostra 100 + 100 + 70 = 270 (3 regletes).",
        "Per fer-ho amb 4 regletes, pots descompondre el 70 (regleta negra) en dues regletes que sumin 70!",
        "Prova: 100 (Taronja) + 100 (Taronja) + 40 (Rosa) + 30 (Verd clar) = 270."
      ],
      explanation: "Has guanyat ⭐⭐! Canviar l'escala de les regletes ens permet treballar amb centenes i milers: 270 = 2 × 100 + 40 + 30."
    },
    {
      id: "desc-2-3",
      level: 2,
      scale: 1,
      title: "Divisors visuals: Parts iguals del 24",
      instruction: "Descompon el nombre 24 a la Fila B utilitzant regletes que siguin TOTES DEL MATEIX COLOR (mínim 3 regletes).",
      targetValue: 24,
      referenceRods: [10, 10, 4],
      constraints: { sameColorOnly: true, minTotalRods: 3 },
      hints: [
        "Busquem divisors del 24! Quina regleta repetida diverses vegades mesura exactament 24?",
        "Pensa en les taules de multiplicar que donen 24: 8 × 3, 6 × 4, 4 × 6...",
        "Col·loca tres regletes Marrons (8 + 8 + 8 = 24) o quatre regletes Verd fosc (6 + 6 + 6 + 6 = 24)."
      ],
      explanation: "Has guanyat ⭐⭐! Descompondre un nombre en regletes iguals és trobar els seus divisors: 24 = 3 × 8 = 4 × 6."
    },

    // ⭐⭐⭐ EXPERT (Nivell 3)
    {
      id: "desc-3-1",
      level: 3,
      scale: 0.1,
      title: "Decimals amb regletes: Descomponem 2,6",
      instruction: "En escala decimal (×0,1), la regleta taronja val 1 unitat sencera i la blanca val 0,1 (una dècima). Construeix 2,6 a la Fila B amb com a mínim 4 regletes i sense usar la regleta verd fosc (0,6).",
      targetValue: 26,
      referenceRods: [10, 10, 6],
      constraints: { forbiddenRods: [6], minTotalRods: 4 },
      hints: [
        "2,6 són 2 unitats senceres (dues regletes taronges) i 6 dècimes (0,6).",
        "Com que la regleta de 0,6 està prohibida, descompon 0,6 en dues dècimes (per exemple 0,4 + 0,2).",
        "Col·loca: 1 (Taronja) + 1 (Taronja) + 0,4 (Rosa) + 0,2 (Vermella) = 2,6."
      ],
      explanation: "Has guanyat ⭐⭐⭐! Els nombres decimals funcionen igual que els naturals en base 10: 2,6 = 1 + 1 + 0,4 + 0,2."
    },
    {
      id: "desc-3-2",
      level: 3,
      scale: 100,
      title: "Grans nombres (Escala ×100): 3.200",
      instruction: "Ara cada punt val 100 (la taronja val 1.000). Construeix 3.200 a la Fila B utilitzant exactament 5 regletes i sense utilitzar la regleta vermella (200).",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      constraints: { exactCount: 5, forbiddenRods: [2] },
      hints: [
        "3.200 equival a 32 centenes. Si poses tres regletes de 1.000 (3.000), et falten 200 per fer amb 2 regletes.",
        "També pots posar dues regletes de 1.000 (2.000) i repartir 1.200 en 3 regletes (ex: 500 + 400 + 300)!",
        "Prova: 1.000 + 1.000 + 1.000 + 100 + 100 = 3.200 (5 regletes)."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 3.200 = 3 UM + 2 C = 3 × 1.000 + 2 × 100."
    },
    {
      id: "desc-3-3",
      level: 3,
      scale: 0.1,
      title: "Repte Expert: Descomposició simètrica d'1,8",
      instruction: "En escala ×0,1 (dècimes), construeix 1,8 a la Fila B utilitzant exactament 3 regletes totes del mateix color (sense usar la regleta taronja d'1 unitat).",
      targetValue: 18,
      referenceRods: [10, 8],
      constraints: { exactCount: 3, sameColorOnly: true, forbiddenRods: [10] },
      hints: [
        "1,8 equival a 18 dècimes. Quin nombre multiplicat per 3 dóna 18?",
        "3 × 6 = 18, per tant 3 vegades 6 dècimes (0,6) fa 1,8!",
        "Col·loca 3 regletes Verd fosc (0,6 + 0,6 + 0,6 = 1,8) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 1,8 dividit en 3 parts iguals és 0,6 (1,8 = 3 × 0,6)."
    }
  ],

  sumes: [
    // ⭐ PRINCIPIANT (Nivell 1)
    {
      id: "sum-1-1",
      level: 1,
      scale: 1,
      title: "El Pont al 10: 8 + 6",
      instruction: "A la Fila A tenim 8 + 6. A la Fila B, transforma aquesta suma en una desena completa (regleta taronja del 10) més les unitats sobrants!",
      targetValue: 14,
      referenceRods: [8, 6],
      constraints: { requiredRods: [10, 4], exactCount: 2 },
      hints: [
        "Mira la regleta marró (8). Quant li falta al 8 per arribar a 10? Li falten 2!",
        "Si agafem 2 de la regleta verd fosc (6 = 2 + 4), el 8 + 2 es converteix en 10 i ens queden 4.",
        "Col·loca a la Fila B una regleta Taronja (10) i una regleta Rosa (4)."
      ],
      explanation: "Has guanyat ⭐! Estratègia del Pont al 10: 8 + 6 = (8 + 2) + 4 = 10 + 4 = 14."
    },
    {
      id: "sum-1-2",
      level: 1,
      scale: 1,
      title: "Sumem completant desenes: 9 + 7",
      instruction: "A la Fila A hi ha 9 + 7. Expressa el resultat a la Fila B amb una regleta del 10 i la regleta d'unitats corresponent.",
      targetValue: 16,
      referenceRods: [9, 7],
      constraints: { requiredRods: [10, 6], exactCount: 2 },
      hints: [
        "Al 9 (blava) només li falta 1 per arribar a 10 (taronja).",
        "Si li treus 1 al 7 (negra), en quina regleta es converteix?",
        "Col·loca una regleta Taronja (10) i una Verd fosc (6). Resultat: 16."
      ],
      explanation: "Has guanyat ⭐! Sumar 9 és com sumar 10 i restar 1: 9 + 7 = 10 + 6 = 16."
    },
    {
      id: "sum-1-3",
      level: 1,
      scale: 1,
      title: "Dobles visuals: 7 + 7",
      instruction: "A la Fila A tenim el doble de 7 (7 + 7). Construeix el resultat a la Fila B amb una desena (10) i les unitats corresponents.",
      targetValue: 14,
      referenceRods: [7, 7],
      constraints: { requiredRods: [10, 4], exactCount: 2 },
      hints: [
        "7 + 7: al primer 7 li falten 3 per arribar a 10.",
        "Si descomponem el segon 7 en 3 + 4, tenim (7 + 3) + 4.",
        "Col·loca una regleta Taronja (10) i una Rosa (4). Total: 14."
      ],
      explanation: "Has guanyat ⭐! Conèixer els dobles (7 + 7 = 14) accelera tot el càlcul mental."
    },

    // ⭐⭐ MITJÀ (Nivell 2)
    {
      id: "sum-2-1",
      level: 2,
      scale: 1,
      title: "Suma per descomposició: 17 + 15",
      instruction: "A la Fila A tenim 17 (10+7) + 15 (10+5). Agrupa les desenes i les unitats a la Fila B utilitzant el mínim nombre de regletes (desenes taronges + unitats).",
      targetValue: 32,
      referenceRods: [10, 7, 10, 5],
      constraints: { requiredRods: [10, 2], exactCount: 4 },
      hints: [
        "Ajunta primer les desenes: 10 + 10 = 20 (dues regletes taronges).",
        "Ara suma les unitats: 7 + 5 = 12, que és una altra regleta de 10 més 2 unitats!",
        "En total a la Fila B necessites: tres regletes Taronges (10+10+10) i una Vermella (2). Total = 32."
      ],
      explanation: "Has guanyat ⭐⭐! 17 + 15 = (10 + 10) + (7 + 5) = 20 + 12 = 32."
    },
    {
      id: "sum-2-2",
      level: 2,
      scale: 10,
      title: "Càlcul mental en centenes: 180 + 160",
      instruction: "En escala ×10, la Fila A mostra 180 (100+80) + 160 (100+60). Construeix el resultat simplificat a la Fila B amb centenes completes (100) i la regleta restant.",
      targetValue: 34,
      referenceRods: [10, 8, 10, 6],
      constraints: { exactCount: 4, requiredRods: [10, 4] },
      hints: [
        "100 + 100 = 200. I 80 + 60 = 140 (que és 100 + 40).",
        "Quantes regletes de 100 (taronges) tindràs en total?",
        "Col·loca tres regletes Taronges (300) i una regleta Rosa (40). Total: 340."
      ],
      explanation: "Has guanyat ⭐⭐! 180 + 160 = (100 + 100) + (80 + 60) = 200 + 140 = 340."
    },
    {
      id: "sum-2-3",
      level: 2,
      scale: 1,
      title: "Propietat associativa: 9 + 6 + 1 + 4",
      instruction: "A la Fila A tenim 9 + 6 + 1 + 4. Agrupa a la Fila B les parelles que fan 10 utilitzant només 2 regletes taronges!",
      targetValue: 20,
      referenceRods: [9, 6, 1, 4],
      constraints: { exactCount: 2, requiredRods: [10] },
      hints: [
        "Observa els quatre nombres: 9, 6, 1 i 4. Quines parelles sumen 10?",
        "9 + 1 = 10 i 6 + 4 = 10!",
        "Col·loca dues regletes Taronges (10 + 10 = 20) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐! La propietat commutativa i associativa ens permet reordenar: (9 + 1) + (6 + 4) = 10 + 10 = 20."
    },

    // ⭐⭐⭐ EXPERT (Nivell 3)
    {
      id: "sum-3-1",
      level: 3,
      scale: 0.1,
      title: "Suma de decimals: 1,7 + 1,8",
      instruction: "En escala ×0,1 (dècimes), la Fila A té 1,7 (1 + 0,7) i 1,8 (1 + 0,8). Construeix a la Fila B el resultat agrupat en unitats senceres (regleta 1) i dècimes.",
      targetValue: 35,
      referenceRods: [10, 7, 10, 8],
      constraints: { exactCount: 4, requiredRods: [10, 5] },
      hints: [
        "Suma les unitats senceres: 1 + 1 = 2.",
        "Suma les dècimes: 0,7 + 0,8 = 1,5 (1 unitat sencera i 5 dècimes).",
        "Col·loca a la Fila B tres regletes Taronges (1 + 1 + 1 = 3) i una Groga (0,5). Total: 3,5."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 7 dècimes + 8 dècimes són 15 dècimes (1,5). Per tant, 1,7 + 1,8 = 3,5."
    },
    {
      id: "sum-3-2",
      level: 3,
      scale: 100,
      title: "Suma de milers i centenes: 1.900 + 1.400",
      instruction: "En escala ×100, la Fila A mostra 1.900 + 1.400. Construeix a la Fila B el resultat amb el mínim nombre de regletes (unitats de miler completes + centenes).",
      targetValue: 33,
      referenceRods: [10, 9, 10, 4],
      constraints: { exactCount: 4, requiredRods: [10, 3] },
      hints: [
        "Passa 100 del 1.400 al 1.900 per completar 2.000!",
        "1.900 + 1.400 = 2.000 + 1.300 = 3.300.",
        "Col·loca tres regletes Taronges (3.000) i una Verd clar (300) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐⭐! Compensar sumands (1.900 + 1.400 = 2.000 + 1.300 = 3.300) fa molt fàcil sumar grans nombres."
    },
    {
      id: "sum-3-3",
      level: 3,
      scale: 0.1,
      title: "Completar unitats decimals: 0,8 + 0,9 + 0,3",
      instruction: "En escala ×0,1, la Fila A té 0,8 + 0,9 + 0,3. Representa el total exacte a la Fila B amb el mínim nombre de regletes.",
      targetValue: 20,
      referenceRods: [8, 9, 3],
      constraints: { exactCount: 2, requiredRods: [10] },
      hints: [
        "Suma les dècimes: 8 dècimes + 9 dècimes + 3 dècimes = 20 dècimes.",
        "Cada 10 dècimes formen 1 unitat sencera (una regleta taronja).",
        "Col·loca dues regletes Taronges (1 + 1 = 2) a la Fila B!"
      ],
      explanation: "Has guanyat ⭐⭐⭐! 0,8 + 0,9 + 0,3 = 2,0 (dues unitats senceres)."
    }
  ],

  restes: [
    // ⭐ PRINCIPIANT (Nivell 1)
    {
      id: "res-1-1",
      level: 1,
      scale: 1,
      title: "Resta per complement: 10 - 6",
      instruction: "A la Fila A hi ha el minuend (10) i a la Fila B ja hi ha el substrahend (6). Afegeix a la Fila B la regleta que falta per igualar la Fila A!",
      targetValue: 10,
      referenceRods: [10],
      initialRowB: [6],
      operationMode: "subtraction",
      minuend: 10,
      subtrahend: 6,
      difference: 4,
      constraints: { exactCount: 2 },
      hints: [
        "Ja tens una regleta verd fosc (6) a la Fila B. Quina regleta hi has d'afegir al costat perquè arribi fins al final de la taronja (10)?",
        "Pensa: 6 + ? = 10.",
        "Afegeix la regleta Rosa (4) a la Fila B!"
      ],
      explanation: "Has guanyat ⭐! Restar és trobar la diferència o el que falta per arribar: 10 - 6 = 4 perquè 6 + 4 = 10."
    },
    {
      id: "res-1-2",
      level: 1,
      scale: 1,
      title: "Del 8 fins al 15: 15 - 8",
      instruction: "La Fila A val 15 (10 + 5) i la Fila B ja té el substrahend 8. Completa la Fila B amb una sola regleta per trobar el resultat de 15 - 8.",
      targetValue: 15,
      referenceRods: [10, 5],
      initialRowB: [8],
      operationMode: "subtraction",
      minuend: 15,
      subtrahend: 8,
      difference: 7,
      constraints: { exactCount: 2 },
      hints: [
        "Del 8 fins al 10 van 2, i del 10 fins al 15 van 5.",
        "2 + 5 = 7. Quina regleta val 7?",
        "Afegeix la regleta Negra (7) al costat de la marró (8) a la Fila B!"
      ],
      explanation: "Has guanyat ⭐! Estratègia d'escalada passant pel 10: de 8 a 10 van 2, i de 10 a 15 van 5 (2 + 5 = 7)."
    },
    {
      id: "res-1-3",
      level: 1,
      scale: 1,
      title: "Diferència fins a 20: 20 - 13",
      instruction: "La Fila A val 20 (10 + 10) i la Fila B ja té 13 (10 + 3). Afegeix la regleta que falta a la Fila B per descobrir quant és 20 - 13.",
      targetValue: 20,
      referenceRods: [10, 10],
      initialRowB: [10, 3],
      operationMode: "subtraction",
      minuend: 20,
      subtrahend: 13,
      difference: 7,
      constraints: { exactCount: 3 },
      hints: [
        "Les dues primeres desenes (10 i 10) ja són iguals. Només cal completar des del 3 fins al segon 10!",
        "Quant li falta a 3 per arribar a 10?",
        "Afegeix la regleta Negra (7) a la Fila B."
      ],
      explanation: "Has guanyat ⭐! 20 - 13 = 7 perquè 13 + 7 = 20."
    },

    // ⭐⭐ MITJÀ (Nivell 2)
    {
      id: "res-2-1",
      level: 2,
      scale: 1,
      title: "Estratègia d'escalada a 6è: 32 - 18",
      instruction: "A la Fila A tenim 32 i a la Fila B ja hi ha 18 (10 + 8). Afegeix les regletes que falten a la Fila B per arribar a 32!",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      initialRowB: [10, 8],
      operationMode: "subtraction",
      minuend: 32,
      subtrahend: 18,
      difference: 14,
      constraints: {},
      hints: [
        "Ja tens 18 a la Fila B. Primer completa fins a 20 afegint 2.",
        "De 20 fins a 32 falten una desena (10) i 2 unitats més (en total 14).",
        "Afegeix una regleta Taronja (10) i una Rosa (4) a la Fila B. La diferència és 14!"
      ],
      explanation: "Has guanyat ⭐⭐! Per calcular 32 - 18 mentalment: de 18 a 20 van 2, i de 20 a 32 van 12 (2 + 12 = 14)."
    },
    {
      id: "res-2-2",
      level: 2,
      scale: 10,
      title: "Resta en escala ×10: 250 - 170",
      instruction: "En escala ×10, la Fila A mostra 250 i la Fila B ja té 170 (100 + 70). Afegeix a la Fila B la regleta o regletes que representen la diferència.",
      targetValue: 25,
      referenceRods: [10, 10, 5],
      initialRowB: [10, 7],
      operationMode: "subtraction",
      minuend: 250,
      subtrahend: 170,
      difference: 80,
      constraints: {},
      hints: [
        "De 170 a 200 falten 30, i de 200 a 250 falten 50.",
        "30 + 50 = 80.",
        "Afegeix la regleta Marró (80) o bé Verd clar (30) + Groga (50) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐! 250 - 170 = 80. Visualitzant el salt pel 200 (30 + 50) evitem errors en les restes portant."
    },
    {
      id: "res-2-3",
      level: 2,
      scale: 1,
      title: "Compensació fins a 40: 40 - 26",
      instruction: "La Fila A val 40 i la Fila B té 26 (10 + 10 + 6). Completa la Fila B per trobar la diferència 40 - 26.",
      targetValue: 40,
      referenceRods: [10, 10, 10, 10],
      initialRowB: [10, 10, 6],
      operationMode: "subtraction",
      minuend: 40,
      subtrahend: 26,
      difference: 14,
      constraints: {},
      hints: [
        "De 26 fins a 30 falten 4 unitats (regleta rosa).",
        "I de 30 fins a 40 falta 1 desena més (regleta taronja del 10).",
        "Afegeix una regleta Rosa (4) i una Taronja (10) a la Fila B: la diferència és 14."
      ],
      explanation: "Has guanyat ⭐⭐! 40 - 26 = 14 perquè de 26 a 30 van 4 i de 30 a 40 van 10."
    },

    // ⭐⭐⭐ EXPERT (Nivell 3)
    {
      id: "res-3-1",
      level: 3,
      scale: 0.1,
      title: "Resta amb decimals: 3,1 - 1,6",
      instruction: "En escala ×0,1, la Fila A representa 3,1 i la Fila B ja té 1,6 (1 + 0,6). Completa la Fila B fins a igualar 3,1.",
      targetValue: 31,
      referenceRods: [10, 10, 10, 1],
      initialRowB: [10, 6],
      operationMode: "subtraction",
      minuend: "3,1",
      subtrahend: "1,6",
      difference: "1,5",
      constraints: {},
      hints: [
        "D'1,6 fins a 2,0 falten 4 dècimes (0,4).",
        "De 2,0 fins a 3,1 falta 1 unitat sencera (1,0) i 1 dècima (0,1).",
        "En total falta 1,5! Afegeix a la Fila B una regleta Taronja (1) i una Groga (0,5)."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 3,1 - 1,6 = 1,5. Amb el model de regletes es veu clarament que 1,6 + 1,5 = 3,1."
    },
    {
      id: "res-3-2",
      level: 3,
      scale: 100,
      title: "Resta de milers: 3.400 - 1.800",
      instruction: "En escala ×100, la Fila A val 3.400 i la Fila B ja té 1.800 (1.000 + 800). Completa la Fila B per trobar la diferència.",
      targetValue: 34,
      referenceRods: [10, 10, 10, 4],
      initialRowB: [10, 8],
      operationMode: "subtraction",
      minuend: "3.400",
      subtrahend: "1.800",
      difference: "1.600",
      constraints: {},
      hints: [
        "De 1.800 fins a 2.000 van 200.",
        "De 2.000 fins a 3.400 van 1.400.",
        "200 + 1.400 = 1.600! Afegeix una regleta Taronja (1.000) i una Verd fosc (600)."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 3.400 - 1.800 = 1.600."
    },
    {
      id: "res-3-3",
      level: 3,
      scale: 0.1,
      title: "Complement a 4 unitats amb decimals: 4 - 2,3",
      instruction: "En escala ×0,1, la Fila A val 4 unitats senceres (4,0) i la Fila B té 2,3. Completa la Fila B per calcular 4 - 2,3.",
      targetValue: 40,
      referenceRods: [10, 10, 10, 10],
      initialRowB: [10, 10, 3],
      operationMode: "subtraction",
      minuend: "4,0",
      subtrahend: "2,3",
      difference: "1,7",
      constraints: {},
      hints: [
        "De 2,3 fins a 3,0 falten 7 dècimes (0,7).",
        "De 3,0 fins a 4,0 falta 1 unitat sencera (1,0).",
        "Afegeix una regleta Taronja (1) i una Negra (0,7) a la Fila B. Resultat: 1,7!"
      ],
      explanation: "Has guanyat ⭐⭐⭐! 4 - 2,3 = 1,7 perquè 2,3 + 0,7 = 3,0 i 3,0 + 1,0 = 4,0."
    }
  ],

  multiplicacions: [
    // ⭐ PRINCIPIANT (Nivell 1)
    {
      id: "mul-1-1",
      level: 1,
      scale: 1,
      title: "Multiplicació com a suma repetida: 4 × 6",
      instruction: "Representa 4 vegades 6 (4 × 6) a la Fila B col·locant 4 regletes del número 6.",
      targetValue: 24,
      referenceRods: [10, 10, 4],
      constraints: { exactCount: 4, requiredRods: [6], sameColorOnly: true },
      hints: [
        "4 × 6 vol dir repetir la regleta del 6 quatre vegades.",
        "La regleta del 6 és la de color verd fosc.",
        "Fes clic 4 vegades a la regleta Verd fosc (6) per formar 6 + 6 + 6 + 6 = 24."
      ],
      explanation: "Has guanyat ⭐! 4 × 6 = 6 + 6 + 6 + 6 = 24. Pots activar també la Vista Matriu/Àrea per veure el rectangle 4 × 6!"
    },
    {
      id: "mul-1-2",
      level: 1,
      scale: 1,
      title: "Propietat commutativa: 3 × 8 = 8 × 3",
      instruction: "A la Fila A hi ha 3 regletes del 8 (3 × 8 = 24). Demostra la propietat commutativa a la Fila B posant 8 regletes del 3!",
      targetValue: 24,
      referenceRods: [8, 8, 8],
      constraints: { exactCount: 8, requiredRods: [3], sameColorOnly: true },
      hints: [
        "La Fila A té 3 regletes marrons (8 + 8 + 8 = 24).",
        "A la Fila B, col·loca 8 regletes de color verd clar (3).",
        "8 vegades 3 també mesura exactament 24!"
      ],
      explanation: "Has guanyat ⭐! Propietat commutativa: l'ordre dels factors no altera el producte (3 × 8 = 8 × 3 = 24)."
    },
    {
      id: "mul-1-3",
      level: 1,
      scale: 1,
      title: "Cinc vegades set: 5 × 7",
      instruction: "Construeix el producte 5 × 7 a la Fila B col·locant 5 regletes del número 7.",
      targetValue: 35,
      referenceRods: [10, 10, 10, 5],
      constraints: { exactCount: 5, requiredRods: [7], sameColorOnly: true },
      hints: [
        "5 × 7 és 5 vegades la regleta negra (7).",
        "Comprova a la Fila A que el resultat equival a 3 desenes i 5 unitats (35).",
        "Col·loca 5 regletes Negres (7) a la Fila B."
      ],
      explanation: "Has guanyat ⭐! 5 × 7 = 35."
    },

    // ⭐⭐ MITJÀ (Nivell 2)
    {
      id: "mul-2-1",
      level: 2,
      scale: 1,
      title: "Propietat distributiva: 3 × 14",
      instruction: "Per calcular 3 × 14, descomponem 14 en (10 + 4). Construeix a la Fila B tres regletes del 10 i tres regletes del 4!",
      targetValue: 42,
      referenceRods: [10, 10, 10, 10, 2],
      constraints: { exactCount: 6, requiredRods: [10, 4] },
      hints: [
        "3 × 14 = 3 × (10 + 4) = (3 × 10) + (3 × 4).",
        "3 × 10 són 3 regletes Taronges (30). 3 × 4 són 3 regletes Roses (12).",
        "Col·loca 3 regletes del 10 i 3 regletes del 4 a la Fila B. Total: 30 + 12 = 42!"
      ],
      explanation: "Has guanyat ⭐⭐! La propietat distributiva és el cor de la multiplicació de diverses xifres: 3 × 14 = 30 + 12 = 42."
    },
    {
      id: "mul-2-2",
      level: 2,
      scale: 10,
      title: "Multiplicació per desenes (Escala ×10): 4 × 70",
      instruction: "En escala ×10, cada regleta negra val 70. Construeix 4 × 70 a la Fila B amb 4 regletes de 70.",
      targetValue: 28,
      referenceRods: [10, 10, 8],
      constraints: { exactCount: 4, requiredRods: [7], sameColorOnly: true },
      hints: [
        "4 × 7 = 28, per tant 4 × 70 = 280.",
        "En escala ×10, la regleta negra (7) representa 70.",
        "Col·loca 4 regletes Negres (70) a la Fila B per igualar 280."
      ],
      explanation: "Has guanyat ⭐⭐! 4 × 7 desenes = 28 desenes = 280."
    },
    {
      id: "mul-2-3",
      level: 2,
      scale: 1,
      title: "Doble descomposició: 4 × 13",
      instruction: "Aplica la propietat distributiva per construir 4 × 13 a la Fila B com 4 vegades 10 més 4 vegades 3 (8 regletes en total).",
      targetValue: 52,
      referenceRods: [10, 10, 10, 10, 10, 2],
      constraints: { exactCount: 8, requiredRods: [10, 3] },
      hints: [
        "13 es descompon en 10 + 3.",
        "4 × 13 = (4 × 10) + (4 × 3) = 40 + 12 = 52.",
        "Col·loca 4 regletes Taronges (10) i 4 regletes Verd clar (3) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐! 4 × 13 = (4 × 10) + (4 × 3) = 40 + 12 = 52."
    },

    // ⭐⭐⭐ EXPERT (Nivell 3)
    {
      id: "mul-3-1",
      level: 3,
      scale: 0.1,
      title: "Multiplicació d'un natural per un decimal: 5 × 0,6",
      instruction: "En escala ×0,1 (dècimes), representa 5 × 0,6 a la Fila B col·locant 5 regletes de 0,6 i comprova quantes unitats senceres fan!",
      targetValue: 30,
      referenceRods: [10, 10, 10],
      constraints: { exactCount: 5, requiredRods: [6], sameColorOnly: true },
      hints: [
        "A la Fila A veus que el resultat equival a 3 unitats senceres (3,0).",
        "En escala ×0,1, la regleta verd fosc val 0,6.",
        "Col·loca 5 regletes Verd fosc (0,6) a la Fila B: 5 × 0,6 = 3,0."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 5 vegades 6 dècimes són 30 dècimes, que equivalen a 3 unitats senceres: 5 × 0,6 = 3."
    },
    {
      id: "mul-3-2",
      level: 3,
      scale: 0.1,
      title: "Distributiva amb decimals: 3 × 1,5",
      instruction: "En escala ×0,1, calcula 3 × 1,5 descomponent 1,5 en (1 + 0,5). Col·loca a la Fila B 3 regletes d'1 i 3 regletes de 0,5!",
      targetValue: 45,
      referenceRods: [10, 10, 10, 10, 5],
      constraints: { exactCount: 6, requiredRods: [10, 5] },
      hints: [
        "3 × 1,5 = (3 × 1) + (3 × 0,5) = 3 + 1,5 = 4,5.",
        "En escala ×0,1, la regleta taronja val 1 i la groga val 0,5.",
        "Col·loca 3 regletes Taronges (1) i 3 regletes Grogues (0,5) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 3 × 1,5 = 3 × (1 + 0,5) = 3 + 1,5 = 4,5."
    },
    {
      id: "mul-3-3",
      level: 3,
      scale: 100,
      title: "Multiplicació a escala ×100: 4 × 800",
      instruction: "En escala ×100, construeix 4 × 800 a la Fila B col·locant 4 regletes de 800.",
      targetValue: 32,
      referenceRods: [10, 10, 10, 2],
      constraints: { exactCount: 4, requiredRods: [8], sameColorOnly: true },
      hints: [
        "4 × 8 = 32, per tant 4 × 8 centenes = 32 centenes = 3.200.",
        "En escala ×100, la regleta marró val 800.",
        "Col·loca 4 regletes Marrons (800) a la Fila B."
      ],
      explanation: "Has guanyat ⭐⭐⭐! 4 × 800 = 3.200."
    }
  ]
};

// Banc de Problemes Contextualitzats per a 6è de Primària (3 per cada nivell d'estrelles = 9 problemes)
const WORD_PROBLEMS = [
  // ⭐ PRINCIPIANT (Nivell 1)
  {
    id: "prob-1",
    level: 1,
    scale: 1,
    category: "Combinació i Suma",
    contextIcon: "🌱",
    title: "L'hort escolar de 6è",
    statement: "A l'hort de l'escola, l'equip de 6è A ha plantat 9 tomaqueres i l'equip de 6è B n'ha plantat 7. Quantes tomaqueres han plantat en total entre les dues classes?",
    keyData: ["6è A: 9 tomaqueres (regleta blava)", "6è B: 7 tomaqueres (regleta negra)"],
    question: "Quantes tomaqueres han plantat en total?",
    expectedAnswer: 16,
    unit: "tomaqueres",
    targetRodUnits: 16,
    suggestedModelRods: [9, 7],
    hints: [
      "Dades clau: 6è A = 9 tomaqueres; 6è B = 7 tomaqueres. Volem saber el TOTAL.",
      "Construeix al tauler una regleta del 9 (blava) i una regleta del 7 (negra) una al costat de l'altra.",
      "9 + 7 = 10 + 6 = 16 tomaqueres."
    ],
    explanation: "Has guanyat ⭐! Quan ajuntem dues quantitats per saber el total, fem una suma (9 + 7 = 16)."
  },
  {
    id: "prob-2",
    level: 1,
    scale: 1,
    category: "Resta / Diferència",
    contextIcon: "🤖",
    title: "Peces del kit de robòtica",
    statement: "Un robot educatiu necessita 24 sensors i cables per funcionar. Si el nostre grup ja n'ha connectat 16, quants ens en falten encara per acabar el muntatge?",
    keyData: ["Total necessari: 24 peces", "Ja connectades: 16 peces"],
    question: "Quantes peces falten per acabar el muntatge?",
    expectedAnswer: 8,
    unit: "peces",
    targetRodUnits: 8,
    suggestedModelRods: [8],
    hints: [
      "Volem trobar la diferència entre 24 (el que necessitem) i 16 (el que ja tenim).",
      "Pots pensar de 16 fins a 20 (en falten 4) i de 20 fins a 24 (en falten 4 més).",
      "24 - 16 = 8 peces (regleta marró)."
    ],
    explanation: "Has guanyat ⭐! 24 - 16 = 8. Si comparem una barra de 24 amb una de 16, el tram que falta mesura 8."
  },
  {
    id: "prob-3",
    level: 1,
    scale: 1,
    category: "Multiplicació",
    contextIcon: "🎨",
    title: "Caixes de retoladors per a plàstica",
    statement: "Per al mural de fi de curs hem comprat 4 caixes iguals de retoladors ecològics. Si a cada caixa hi ha 8 retoladors, quants retoladors tenim en total?",
    keyData: ["4 caixes iguals", "8 retoladors a cada caixa"],
    question: "Quants retoladors tenim en total?",
    expectedAnswer: 32,
    unit: "retoladors",
    targetRodUnits: 32,
    suggestedModelRods: [8, 8, 8, 8],
    hints: [
      "Tenim 4 vegades la mateixa quantitat (8 retoladors).",
      "Col·loca 4 regletes del número 8 (marrons) al tauler de resolució.",
      "4 × 8 = 32 retoladors."
    ],
    explanation: "Has guanyat ⭐! Quan es repeteix una mateixa quantitat diverses vegades (8 + 8 + 8 + 8), fem una multiplicació: 4 × 8 = 32."
  },

  // ⭐⭐ MITJÀ (Nivell 2)
  {
    id: "prob-4",
    level: 2,
    scale: 10,
    category: "Dues operacions (Suma i Resta)",
    contextIcon: "🚌",
    title: "Excursió a les colònies de 6è",
    statement: "L'autocar de les colònies ha de recórrer 320 km en total. Al matí fa una primera etapa de 140 km i després de dinar en fa una segona de 90 km. Quants quilòmetres li falten encara per arribar a l'alberg?",
    keyData: ["Trajecte total: 320 km (escala ×10)", "1a etapa: 140 km", "2a etapa: 90 km"],
    question: "Quants quilòmetres falten per arribar a l'alberg?",
    expectedAnswer: 90,
    unit: "km",
    targetRodUnits: 9,
    suggestedModelRods: [9],
    hints: [
      "En escala ×10, cada punt de regleta val 10 km (la taronja val 100 km).",
      "1r pas: Suma els quilòmetres que ja ha recorregut: 140 + 90 = 230 km.",
      "2n pas: Resta del total: 320 - 230 = 90 km (una regleta blava en escala ×10)."
    ],
    explanation: "Has guanyat ⭐⭐! Primer calculem el recorregut fet (140 + 90 = 230 km) i després busquem el complement fins a 320 km: 320 - 230 = 90 km."
  },
  {
    id: "prob-5",
    level: 2,
    scale: 1,
    category: "Multiplicació i Suma (Propietat distributiva)",
    contextIcon: "📚",
    title: "Lots de llibres per a la biblioteca d'aula",
    statement: "La comissió de lectura ha preparat 5 caixes de llibres. A cada caixa hi ha posat 6 còmics en català i 4 novel·les d'aventures. Quants llibres hi ha en total entre totes les caixes?",
    keyData: ["5 caixes", "A cada caixa: 6 còmics + 4 novel·les"],
    question: "Quants llibres hi ha en total?",
    expectedAnswer: 50,
    unit: "llibres",
    targetRodUnits: 50,
    suggestedModelRods: [10, 10, 10, 10, 10],
    hints: [
      "Mira què hi ha dins de CADA caixa: 6 còmics (verd fosc) + 4 novel·les (rosa) = 10 llibres (1 regleta taronja)!",
      "Si cada caixa té 10 llibres i tenim 5 caixes...",
      "5 × (6 + 4) = 5 × 10 = 50 llibres (5 regletes taronges)."
    ],
    explanation: "Has guanyat ⭐⭐! Aplicant la propietat distributiva: 5 × (6 + 4) = 5 × 10 = 50 llibres."
  },
  {
    id: "prob-6",
    level: 2,
    scale: 1,
    category: "Comparació multiplicativa",
    contextIcon: "🏀",
    title: "Torneig cooperatiu de bàsquet",
    statement: "En un partit del torneig escolar, l'equip Vermell ha encistellat 12 punts en el primer quart, i l'equip Blau n'ha fet el triple que el Vermell menys 4 punts. Quants punts ha fet l'equip Blau?",
    keyData: ["Equip Vermell: 12 punts", "Equip Blau: el triple del Vermell (3 × 12) menys 4 punts"],
    question: "Quants punts ha fet l'equip Blau?",
    expectedAnswer: 32,
    unit: "punts",
    targetRodUnits: 32,
    suggestedModelRods: [10, 10, 10, 2],
    hints: [
      "El triple de 12 vol dir 3 vegades 12: 3 × 12 = 3 × (10 + 2) = 30 + 6 = 36 punts.",
      "Ara resta els 4 punts menys que indica l'enunciat: 36 - 4.",
      "36 - 4 = 32 punts."
    ],
    explanation: "Has guanyat ⭐⭐! Primer calculem el triple: 3 × 12 = 36. Després hi restem 4: 36 - 4 = 32 punts."
  },

  // ⭐⭐⭐ EXPERT (Nivell 3)
  {
    id: "prob-7",
    level: 3,
    scale: 0.1,
    category: "Decimals i Multiplicació",
    contextIcon: "🥤",
    title: "Suc natural per a la festa de l'escola",
    statement: "Per a la festa sostenible de 6è hem omplert 6 gerres amb 0,4 litres de suc de taronja a cadascuna, i una gerra gran amb 1,2 litres més. Quants litres de suc tenim en total?",
    keyData: ["6 gerres de 0,4 litres cadascuna (escala ×0,1)", "1 gerra gran de 1,2 litres"],
    question: "Quants litres de suc tenim en total? (Escriu amb coma, ex: 3,6)",
    expectedAnswer: 3.6,
    unit: "litres",
    targetRodUnits: 36,
    suggestedModelRods: [4, 4, 4, 4, 4, 4, 10, 2],
    hints: [
      "En escala ×0,1, cada regleta rosa (4) representa 0,4 litres.",
      "1r pas: Calcula el suc de les 6 gerres: 6 × 0,4 = 2,4 litres.",
      "2n pas: Suma-hi la gerra gran d'1,2 litres: 2,4 + 1,2 = 3,6 litres."
    ],
    explanation: "Has guanyat ⭐⭐⭐! 6 × 0,4 L = 2,4 L. Si hi afegim 1,2 L obtenim 2,4 + 1,2 = 3,6 litres en total."
  },
  {
    id: "prob-8",
    level: 3,
    scale: 100,
    category: "Grans nombres i pressupost",
    contextIcon: "💻",
    title: "Renovació de l'aula digital",
    statement: "L'escola disposa d'un pressupost de 4.500 € per renovar l'aula digital. Compra 3 pissarres interactives que costen 900 € cadascuna i una impressora 3D de 600 €. Quants diners queden encara al pressupost?",
    keyData: ["Pressupost inicial: 4.500 € (escala ×100)", "3 pissarres a 900 € cadascuna", "1 impressora 3D a 600 €"],
    question: "Quants euros queden al pressupost?",
    expectedAnswer: 1200,
    unit: "€",
    targetRodUnits: 12,
    suggestedModelRods: [10, 2],
    hints: [
      "En escala ×100, cada regleta blava (9) val 900 € i la taronja (10) val 1.000 €.",
      "1r pas: Cost de les 3 pissarres: 3 × 900 € = 2.700 €. Més la impressora (600 €): 2.700 + 600 = 3.300 € gastats.",
      "2n pas: Resta del pressupost total: 4.500 € - 3.300 € = 1.200 €."
    ],
    explanation: "Has guanyat ⭐⭐⭐! Despesa total: (3 × 900) + 600 = 3.300 €. Diners restants: 4.500 - 3.300 = 1.200 €."
  },
  {
    id: "prob-9",
    level: 3,
    scale: 0.1,
    category: "Problemes multipas amb decimals",
    contextIcon: "🎗️",
    title: "Cintes per a les medalles esportives",
    statement: "Tenim un rotlle amb 5 metres de cinta per fer medalles. Ja n'hem tallat 4 trossos de 0,8 metres cadascun. Quants metres de cinta queden encara al rotlle?",
    keyData: ["Longitud inicial: 5 m (escala ×0,1)", "4 trossos tallats de 0,8 m cadascun"],
    question: "Quants metres de cinta queden al rotlle? (Ex: 1,8)",
    expectedAnswer: 1.8,
    unit: "metres",
    targetRodUnits: 18,
    suggestedModelRods: [10, 8],
    hints: [
      "1r pas: Calcula quanta cinta hem gastat multiplicant 4 × 0,8 m = 3,2 metres.",
      "2n pas: Calcula quant falta des de 3,2 m fins als 5,0 m del rotlle inicial.",
      "5,0 - 3,2 = 1,8 metres (una regleta d'1 m i una de 0,8 m)."
    ],
    explanation: "Has guanyat ⭐⭐⭐! Cinta utilitzada: 4 × 0,8 = 3,2 m. Cinta restant: 5,0 - 3,2 = 1,8 metres."
  }
];

// Glossari Visual DUA (Suport al vocabulari matemàtic en català)
const MATH_GLOSSARY = [
  {
    term: "Descomposició canònica i no canònica",
    icon: "🧩",
    definition: "Descompondre un nombre és separar-lo en parts que sumades donen el mateix valor. És canònica quan seguim el valor posicional (ex: 34 = 30 + 4) i no canònica quan el repartim d'altres maneres (ex: 34 = 20 + 14)."
  },
  {
    term: "Minuend, Substrahend i Diferència",
    icon: "➖",
    definition: "En una resta (A - B = C), el Minuend (A) és la quantitat gran inicial, el Substrahend (B) és la part que comparem o traiem, i la Diferència (C) és el que li falta al substrahend per igualar el minuend."
  },
  {
    term: "Propietat Commutativa",
    icon: "🔄",
    definition: "En la suma i en la multiplicació, canviar l'ordre dels nombres no canvia el resultat: 8 + 3 = 3 + 8 i 4 × 6 = 6 × 4."
  },
  {
    term: "Propietat Distributiva",
    icon: "📦",
    definition: "Multiplicar un nombre per una suma és igual a multiplicar-lo per cada part i sumar els resultats: 3 × (10 + 4) = (3 × 10) + (3 × 4) = 30 + 12 = 42."
  },
  {
    term: "Escala i Valor Posicional",
    icon: "📏",
    definition: "Una mateixa regleta pot representar unitats (×1), desenes (×10), centenes (×100) o dècimes (×0,1). Això ens permet operar amb nombres grans i decimals amb les mateixes regletes."
  }
];
