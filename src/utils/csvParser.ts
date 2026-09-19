import { Chapter, Question, QuizEvaluation } from '../types';

export interface CsvParseResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  chapters: Chapter[];
  allQuestions: Question[];
  totalQuestions: number;
}

/**
 * Analyseur de ligne CSV robuste qui gère les champs entre guillemets,
 * les virgules intérieures et les guillemets échappés ("").
 */
function parseCsvLine(line: string, delimiter: string = ','): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        // Guillemet échappé double
        current += '"';
        i += 2;
        continue;
      } else {
        inQuotes = !inQuotes;
        i++;
        continue;
      }
    }

    if (char === delimiter && !inQuotes) {
      fields.push(current.trim());
      current = '';
      i++;
      continue;
    }

    current += char;
    i++;
  }

  fields.push(current.trim());
  return fields;
}

/**
 * Détecte le délimiteur principal (virgule ou point-virgule)
 */
function detectDelimiter(firstLine: string): string {
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;
  return semiCount > commaCount ? ';' : ',';
}

/**
 * Analyse et valide le contenu d'un fichier CSV de questions.
 */
export function parseAndValidateCsv(csvContent: string): CsvParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!csvContent || !csvContent.trim()) {
    return {
      success: false,
      errors: ['Le fichier CSV est vide.'],
      warnings: [],
      chapters: [],
      allQuestions: [],
      totalQuestions: 0
    };
  }

  const rawLines = csvContent.split(/\r?\n/);
  // Trouver la première ligne non vide pour les en-têtes
  let headerIndex = -1;
  for (let i = 0; i < rawLines.length; i++) {
    if (rawLines[i].trim().length > 0) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) {
    return {
      success: false,
      errors: ['Aucune donnée exploitable trouvée dans le fichier.'],
      warnings: [],
      chapters: [],
      allQuestions: [],
      totalQuestions: 0
    };
  }

  const headerLine = rawLines[headerIndex];
  const delimiter = detectDelimiter(headerLine);
  const rawHeaders = parseCsvLine(headerLine, delimiter).map((h) =>
    h.toLowerCase().replace(/['"_\s]/g, '_').trim()
  );

  // Colonnes requises
  const requiredColumns = [
    'id',
    'chapter',
    'question',
    'option_a',
    'option_b',
    'option_c',
    'option_d',
    'correct_answer'
  ];

  // Mapper les colonnes
  const headerMap: Record<string, number> = {};
  rawHeaders.forEach((col, idx) => {
    // Nettoyage spécifique pour reconnaître les variantes courantes
    let normalized = col;
    if (col === 'chapitre' || col === 'theme' || col === 'section') normalized = 'chapter';
    if (col === 'correct' || col === 'reponse' || col === 'bonne_reponse' || col === 'answer') normalized = 'correct_answer';
    if (col === 'explication' || col === 'justification') normalized = 'explanation';
    headerMap[normalized] = idx;
  });

  const missingColumns = requiredColumns.filter((req) => headerMap[req] === undefined);
  if (missingColumns.length > 0) {
    errors.push(
      `Colonnes obligatoires manquantes dans l'en-tête CSV : ${missingColumns.join(', ')}. Colonnes trouvées : ${rawHeaders.join(', ')}`
    );
    return {
      success: false,
      errors,
      warnings,
      chapters: [],
      allQuestions: [],
      totalQuestions: 0
    };
  }

  const explanationIndex = headerMap['explanation'] ?? headerMap['explication'];

  const seenIds = new Map<string, number>();
  const parsedQuestions: Question[] = [];
  const chapterMap = new Map<string, { code: string; title: string; shortTitle?: string; questions: Question[] }>();

  // Parcourir les lignes de données
  for (let lineNum = headerIndex + 2; lineNum <= rawLines.length; lineNum++) {
    const rawLine = rawLines[lineNum - 1];
    if (!rawLine || !rawLine.trim()) {
      continue; // Ligne vide ignorée
    }

    const cols = parseCsvLine(rawLine, delimiter);
    if (cols.length < requiredColumns.length) {
      errors.push(
        `Ligne ${lineNum} : Données incomplètes (${cols.length} colonne(s) détectée(s) au lieu de ${requiredColumns.length} minimum).`
      );
      continue;
    }

    const idVal = cols[headerMap['id']]?.trim();
    const chapterVal = cols[headerMap['chapter']]?.trim();
    const questionText = cols[headerMap['question']]?.trim();
    const optA = cols[headerMap['option_a']]?.trim();
    const optB = cols[headerMap['option_b']]?.trim();
    const optC = cols[headerMap['option_c']]?.trim();
    const optD = cols[headerMap['option_d']]?.trim();
    const rawCorrect = cols[headerMap['correct_answer']]?.trim()?.toUpperCase();
    const explanation = explanationIndex !== undefined && cols[explanationIndex] !== undefined ? cols[explanationIndex].trim() : '';

    // Validation Chapitre
    const chapterRef = chapterVal || 'Général';

    // Validation ID
    if (!idVal) {
      errors.push(`Ligne ${lineNum} : L'identifiant (id) est obligatoire.`);
      continue;
    }
    const idKey = `${chapterRef}:::${idVal}`;
    const idCount = seenIds.get(idKey) || 0;
    if (idCount > 0) {
      warnings.push(
        `Ligne ${lineNum} : Identifiant « ${idVal} » répété dans le chapitre « ${chapterRef} ». Un identifiant unique a été généré.`
      );
    }
    seenIds.set(idKey, idCount + 1);

    // Validation Question
    if (!questionText) {
      errors.push(`Ligne ${lineNum} : Le texte de la question est vide.`);
    }

    // Validation Options
    if (!optA) errors.push(`Ligne ${lineNum} : L'option A (option_a) est vide.`);
    if (!optB) errors.push(`Ligne ${lineNum} : L'option B (option_b) est vide.`);
    if (!optC) errors.push(`Ligne ${lineNum} : L'option C (option_c) est vide.`);
    if (!optD) errors.push(`Ligne ${lineNum} : L'option D (option_d) est vide.`);

    // Validation Bonne réponse
    if (!rawCorrect || !['A', 'B', 'C', 'D'].includes(rawCorrect)) {
      errors.push(
        `Ligne ${lineNum} : correct_answer doit être A, B, C ou D (valeur reçue : « ${rawCorrect || 'vide'} »).`
      );
    }

    // Si pas d'erreurs critiques sur cette ligne, construire l'objet Question
    if (questionText && optA && optB && optC && optD && rawCorrect && ['A', 'B', 'C', 'D'].includes(rawCorrect)) {
      const numMatch = chapterRef.match(/^([0-9]+(?:\.[0-9]+)*)\s*(?:[-—:\.]\s*)?(.*)$/);
      let chapCode = chapterRef;
      let chapTitle = chapterRef.startsWith('Thème') ? chapterRef : `Thème ${chapterRef}`;
      let chapShortTitle = chapTitle;
      let chapterId = `ch-${chapterRef.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      if (numMatch) {
        chapCode = numMatch[1];
        const rawLabel = numMatch[2]?.trim() || '';
        chapTitle = rawLabel ? `${chapCode} — ${rawLabel}` : `Chapitre ${chapCode}`;
        chapShortTitle = `Chapitre ${chapCode}`;
        chapterId = `ch-${chapCode.replace(/\./g, '-')}`;
      }

      if (!chapterMap.has(chapterId)) {
        chapterMap.set(chapterId, {
          code: chapCode,
          title: chapTitle,
          shortTitle: chapShortTitle,
          questions: []
        });
      }

      const currentChapQuestions = chapterMap.get(chapterId)!.questions.length;
      const chapterQuestionNumber = currentChapQuestions + 1;
      const globalNumber = parsedQuestions.length + 1;

      const occCount = seenIds.get(idKey) || 1;
      const uniqueSuffix = occCount > 1 ? `-${occCount}` : '';

      const q: Question = {
        id: `q-csv-${chapCode.replace(/\./g, '-')}-${idVal}${uniqueSuffix}`,
        chapterId: chapterId,
        chapterNumber: chapCode,
        chapterTitle: chapTitle,
        questionNumber: chapterQuestionNumber,
        globalIndex: globalNumber,
        text: questionText,
        options: [
          { key: 'A', text: optA },
          { key: 'B', text: optB },
          { key: 'C', text: optC },
          { key: 'D', text: optD }
        ],
        correctAnswer: rawCorrect,
        explanation: explanation || undefined
      };

      parsedQuestions.push(q);
      chapterMap.get(chapterId)!.questions.push(q);
    }
  }

  if (parsedQuestions.length === 0 && errors.length === 0) {
    errors.push('Aucune question valide n\'a pu être extraite du fichier CSV.');
  }

  // Assembler les chapitres
  const chapters: Chapter[] = Array.from(chapterMap.entries()).map(([chId, data]) => ({
    id: chId,
    code: data.code,
    title: data.title,
    shortTitle: (data as any).shortTitle || `Chapitre ${data.code}`,
    questions: data.questions
  }));

  return {
    success: errors.length === 0 && parsedQuestions.length > 0,
    errors,
    warnings,
    chapters,
    allQuestions: parsedQuestions,
    totalQuestions: parsedQuestions.length
  };
}

/**
 * Génère et télécharge le modèle CSV officiel prêt à l'emploi (Requirement 3).
 */
export function downloadCsvTemplate(): void {
  const headers = 'id,chapter,question,option_a,option_b,option_c,option_d,correct_answer,explanation';
  const sample1 = '1,2.1,"Quelle est la force opposée au poids d\'un drone en vol stationnaire ?","La traînée","La portance","La poussée latérale","L\'inertie","B","La portance équilibre exactement le poids de l\'aéronef en vol stationnaire."';
  const sample2 = '2,2.1,"Quel effet aérodynamique augmente l\'efficacité des hélices à proximité immédiate du sol ?","Effet de sol (IGE)","Décrochage dynamique","Vortex d\'extrémité de pale","Autorotation","A","L\'effet de sol réduit l\'intensité des tourbillons marginaux et améliore le rendement."';
  const sample3 = '3,2.4,"Dans quelle unité courante exprime-t-on la constante de vitesse d\'un moteur brushless ?","RPM/V (kV)","Newton-mètre (N.m)","Watt-heure (Wh)","Milliampère-heure (mAh)","A","Le kV représente le nombre de tours par minute théorique par volt appliqué à vide."';

  const csvContent = `${headers}\n${sample1}\n${sample2}\n${sample3}\n`;
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'modele_questions_quiz_drone.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exporte les résultats d'évaluation en CSV (Requirement 15).
 * Format: question_id,chapter,question,user_answer,correct_answer,is_correct
 */
export function exportResultsToCsv(evaluation: QuizEvaluation): void {
  const headers = 'question_id,chapter,question,user_answer,correct_answer,is_correct';
  
  const escapeCsv = (str: string) => {
    if (!str) return '""';
    const escaped = str.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = evaluation.results.map((r) => {
    const qId = escapeCsv(r.question.id);
    const chapter = escapeCsv(r.question.chapterNumber || r.question.chapterTitle);
    const qText = escapeCsv(r.question.text);
    const userAns = escapeCsv(r.userAnswer || 'SANS_REPONSE');
    const correctAns = escapeCsv(r.correctAnswer || '');
    const isCorr = r.isCorrect ? 'true' : 'false';

    return `${qId},${chapter},${qText},${userAns},${correctAns},${isCorr}`;
  });

  const csvContent = `${headers}\n${rows.join('\n')}\n`;
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
    type: 'text/csv;charset=utf-8;'
  });

  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `resultats_examen_drone_${timestamp}.csv`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
