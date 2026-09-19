import {
  Chapter,
  ChapterSummary,
  ExamStatus,
  ModuleId,
  ModuleInfo,
  OptionKey,
  Question,
  QuestionResult,
  QuizEvaluation
} from '../types';
import { DEFAULT_ANSWER_KEYS } from '../data/defaultAnswerKeys';
import { MODULE_1_MARKDOWN_SOURCE, MODULE_2_MARKDOWN_SOURCE } from '../data/rawMarkdown';
import { MODULE_5_CSV_SOURCE } from '../data/module5Csv';
import { parseMarkdownQuiz, ParseResult } from './markdownParser';
import { parseAndValidateCsv } from './csvParser';

export const MODULE_DEFINITIONS: Record<ModuleId, ModuleInfo> = {
  'module-5': {
    id: 'module-5',
    name: 'Module 5 — Format Standard (10 q/chapitre)',
    badge: 'Module 5 Express',
    subtitle: '6 chapitres • 60 questions (10/ch)',
    description: 'Format officiel standard avec 10 questions sélectionnées par chapitre, incluant impérativement les deux premières questions fondamentales de chaque chapitre.',
    defaultTimeMinutes: 60
  },
  'module-5-all': {
    id: 'module-5-all',
    name: 'Module 5 — Banque Intégrale (Exhaustif)',
    badge: 'Module 5 Intégral',
    subtitle: '6 chapitres • 470 questions',
    description: 'Banque complète exhaustive regroupant l\'ensemble des 470 questions du Module 5 (5.1 à 5.6) couvrant tout le cycle de conception drone.',
    defaultTimeMinutes: 180
  },
  'module-1': {
    id: 'module-1',
    name: 'Module 1 — Fondamentaux & Réglementation',
    badge: 'Module 1',
    subtitle: '6 chapitres • 30 questions',
    description: 'Introduction, méthodologie, vocabulaire technique, familles de drones, écosystème industriel, architecture UAS et cadre réglementaire.',
    defaultTimeMinutes: 30
  },
  'module-2': {
    id: 'module-2',
    name: 'Module 2 — Mécanique du vol & Systèmes',
    badge: 'Module 2',
    subtitle: '12 chapitres • 60 questions',
    description: 'Aérodynamique, théorie du disque, commande sous-actionnée, repères & quaternions, moteurs brushless, asservissement PID, vibrations et simulation SITL.',
    defaultTimeMinutes: 60
  },
  'module-all': {
    id: 'module-all',
    name: 'Examen Global — Tous les Modules',
    badge: 'Modules 1, 2 & 5',
    subtitle: '24 chapitres • 150 questions',
    description: 'Simulation complète regroupant le Module 1 (30 q), le Module 2 (60 q) et le Module 5 Express (60 q).',
    defaultTimeMinutes: 120
  }
};

const CUSTOM_ANSWER_STORAGE_KEY = 'drone_quiz_custom_answers';

/**
 * Récupère les surcharges éventuelles de barème sauvegardées localement
 */
export function getStoredAnswerOverrides(): Record<string, OptionKey> {
  try {
    const raw = localStorage.getItem(CUSTOM_ANSWER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load custom answers', e);
  }
  return {};
}

/**
 * Enregistre une surcharge de réponse pour une question
 */
export function saveAnswerOverride(chapterCode: string, questionNumber: number, answer: OptionKey) {
  const overrides = getStoredAnswerOverrides();
  overrides[`${chapterCode}-${questionNumber}`] = answer;
  try {
    localStorage.setItem(CUSTOM_ANSWER_STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error('Failed to save custom answer', e);
  }
}

/**
 * Charge les chapitres et questions pour le module choisi (Module 1, Module 2, Module 5 Mini, Module 5 All ou Tous)
 */
export function loadQuizDataForModule(
  moduleId: ModuleId = 'module-5',
  customSource?: string
): ParseResult {
  // Module 5 (Format Standard : 10 questions par chapitre, 2 premières questions garanties)
  if (moduleId === 'module-5') {
    const csvContent = customSource || MODULE_5_CSV_SOURCE;
    const csvResult = parseAndValidateCsv(csvContent);

    const miniChapters: Chapter[] = [];
    const allMiniQuestions: Question[] = [];
    let gIdx = 1;

    for (const ch of csvResult.chapters) {
      if (ch.questions.length === 0) continue;
      // Les deux premières questions doivent TOUJOURS être là
      const firstTwo = ch.questions.slice(0, 2);
      // Les 8 questions suivantes pour atteindre 10 questions par chapitre
      const nextEight = ch.questions.slice(2, 10);
      const selected = [...firstTwo, ...nextEight];

      const clonedQuestions: Question[] = selected.map((q, qIndex) => {
        const cloned = { ...q, questionNumber: qIndex + 1, globalIndex: gIdx++ };
        allMiniQuestions.push(cloned);
        return cloned;
      });

      miniChapters.push({
        ...ch,
        shortTitle: `${ch.code} (10 q)`,
        questions: clonedQuestions
      });
    }

    return {
      chapters: miniChapters,
      allQuestions: allMiniQuestions,
      totalQuestions: allMiniQuestions.length,
      errors: csvResult.errors,
      warnings: csvResult.warnings
    };
  }

  // Module 5 All (Banque intégrale exhaustive de l'ensemble des questions)
  if (moduleId === 'module-5-all') {
    const csvContent = customSource || MODULE_5_CSV_SOURCE;
    const csvResult = parseAndValidateCsv(csvContent);
    return {
      chapters: csvResult.chapters,
      allQuestions: csvResult.allQuestions,
      totalQuestions: csvResult.totalQuestions,
      errors: csvResult.errors,
      warnings: csvResult.warnings
    };
  }

  // Module Global (combinaison ordonnée des modules 1, 2 et 5 mini)
  if (moduleId === 'module-all') {
    const m1m2Source = customSource || `${MODULE_1_MARKDOWN_SOURCE}\n\n${MODULE_2_MARKDOWN_SOURCE}`;
    const m1m2Result = parseMarkdownQuiz(m1m2Source);
    const overrides = getStoredAnswerOverrides();

    for (const chapter of m1m2Result.chapters) {
      for (const q of chapter.questions) {
        const lookupKey = `${chapter.code}-${q.questionNumber}`;
        const defaultEntry = DEFAULT_ANSWER_KEYS[lookupKey];
        if (overrides[lookupKey]) {
          q.correctAnswer = overrides[lookupKey];
        } else if (!q.correctAnswer && defaultEntry) {
          q.correctAnswer = defaultEntry.answer;
        }
        if (!q.explanation && defaultEntry) {
          q.explanation = defaultEntry.explanation;
        }
      }
    }

    const m5MiniResult = loadQuizDataForModule('module-5');
    const allChapters = [...m1m2Result.chapters, ...m5MiniResult.chapters];
    const allQuestions: Question[] = [];
    let gIdx = 1;

    for (const ch of allChapters) {
      for (const q of ch.questions) {
        q.globalIndex = gIdx++;
        allQuestions.push(q);
      }
    }

    return {
      chapters: allChapters,
      allQuestions,
      totalQuestions: allQuestions.length,
      errors: [...(m1m2Result.errors || []), ...m5MiniResult.errors],
      warnings: [...m1m2Result.warnings, ...m5MiniResult.warnings]
    };
  }

  // Module 1 ou Module 2 (Markdown)
  let source: string;
  if (customSource) {
    source = customSource;
  } else if (moduleId === 'module-1') {
    source = MODULE_1_MARKDOWN_SOURCE;
  } else {
    source = MODULE_2_MARKDOWN_SOURCE;
  }

  const parseResult = parseMarkdownQuiz(source);
  const overrides = getStoredAnswerOverrides();

  // Associe la bonne réponse et l'explication à chaque question
  for (const chapter of parseResult.chapters) {
    for (const q of chapter.questions) {
      const lookupKey = `${chapter.code}-${q.questionNumber}`;
      const defaultEntry = DEFAULT_ANSWER_KEYS[lookupKey];

      // Priorité : 1) Surcharge utilisateur, 2) Bonne réponse parsée dans le Markdown, 3) Barème par défaut
      if (overrides[lookupKey]) {
        q.correctAnswer = overrides[lookupKey];
      } else if (!q.correctAnswer && defaultEntry) {
        q.correctAnswer = defaultEntry.answer;
      }

      if (!q.explanation && defaultEntry) {
        q.explanation = defaultEntry.explanation;
      }
    }
  }

  return parseResult;
}

/**
 * Rétro-compatibilité : charge l'ensemble du Module 2
 */
export function loadModule2QuizData(customMarkdown?: string): ParseResult {
  return loadQuizDataForModule('module-2', customMarkdown);
}

/**
 * Charge l'ensemble du Module 5 depuis le CSV officiel
 */
export function loadModule5QuizData(customCsv?: string): ParseResult {
  return loadQuizDataForModule('module-5', customCsv);
}

/**
 * Calcule l'évaluation complète d'une session de quiz selon les règles officielles :
 * - Bonne réponse : +2 points
 * - Mauvaise réponse : -1 point (ou 0 en mode entraînement)
 * - Aucune réponse : 0 point
 * - Note max : Total questions × 2
 * - Pourcentage : (score brut / note max) × 100
 * - Supporte l'état normal ('COMPLETED') et l'état prématuré ('INTERRUPTED')
 */
export function evaluateQuizSession(
  questions: Question[],
  userAnswers: Record<string, OptionKey>,
  passThresholdPercent: number,
  timeSpentSeconds: number,
  timeLimitMinutes: number,
  moduleId?: ModuleId,
  moduleName?: string,
  isPracticeMode: boolean = false,
  status: ExamStatus = 'COMPLETED'
): QuizEvaluation {
  let rawScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const isInterrupted = status === 'INTERRUPTED';
  const results: QuestionResult[] = [];
  const chapterMap: Record<string, {
    chapter: Chapter | { id: string; code: string; title: string };
    total: number;
    correct: number;
    wrong: number;
    unanswered: number;
    points: number;
  }> = {};

  for (const q of questions) {
    const chapId = q.chapterId;
    if (!chapterMap[chapId]) {
      chapterMap[chapId] = {
        chapter: {
          id: q.chapterId,
          code: q.chapterNumber,
          title: q.chapterTitle
        },
        total: 0,
        correct: 0,
        wrong: 0,
        unanswered: 0,
        points: 0
      };
    }
    chapterMap[chapId].total += 1;

    const userAns = userAnswers[q.id];
    const isUnanswered = userAns === undefined || userAns === null || userAns === '';
    const isCorrect = !isUnanswered && userAns === q.correctAnswer;

    let points = 0;
    if (isUnanswered) {
      points = 0;
      unansweredCount += 1;
      chapterMap[chapId].unanswered += 1;
    } else if (isCorrect) {
      points = 2;
      correctCount += 1;
      chapterMap[chapId].correct += 1;
      chapterMap[chapId].points += 2;
    } else {
      // In practice mode, no negative penalty (0 point instead of -1)
      points = isPracticeMode ? 0 : -1;
      wrongCount += 1;
      chapterMap[chapId].wrong += 1;
      chapterMap[chapId].points += points;
    }

    rawScore += points;

    results.push({
      question: q,
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      isCorrect,
      isUnanswered,
      points,
      explanation: q.explanation
    });
  }

  const maxScore = questions.length * 2;
  const percentage = maxScore > 0 ? Math.round(((rawScore / maxScore) * 100) * 10) / 10 : 0;
  const isPassed = !isInterrupted && percentage >= passThresholdPercent;
  const answeredCount = correctCount + wrongCount;

  const chapterSummaries: ChapterSummary[] = Object.values(chapterMap).map((item) => {
    const chapMax = item.total * 2;
    const chapPct = chapMax > 0 ? Math.round(((item.points / chapMax) * 100) * 10) / 10 : 0;
    return {
      chapterId: item.chapter.id,
      chapterCode: item.chapter.code,
      chapterTitle: item.chapter.title,
      totalQuestions: item.total,
      correctCount: item.correct,
      wrongCount: item.wrong,
      unansweredCount: item.unanswered,
      points: item.points,
      maxPoints: chapMax,
      percentage: chapPct
    };
  });

  // Identifier les chapitres avec le plus d'erreurs
  const sortedByErrors = [...chapterSummaries]
    .filter((c) => c.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount || a.percentage - b.percentage);

  const weakestChapters = sortedByErrors.slice(0, 3);

  // Formatage des temps
  const spentM = Math.floor(timeSpentSeconds / 60);
  const spentS = timeSpentSeconds % 60;
  const timeSpentFormatted = `${spentM}m ${spentS.toString().padStart(2, '0')}s`;

  const totalLimitSec = timeLimitMinutes * 60;
  const remainingSec = Math.max(0, totalLimitSec - timeSpentSeconds);
  const remM = Math.floor(remainingSec / 60);
  const remS = remainingSec % 60;
  const timeRemainingFormatted = `${remM}m ${remS.toString().padStart(2, '0')}s`;

  return {
    moduleId,
    moduleName,
    status,
    isInterrupted,
    totalQuestions: questions.length,
    maxScore,
    rawScore,
    percentage,
    correctCount,
    wrongCount,
    unansweredCount,
    answeredCount,
    isPassed,
    passThreshold: passThresholdPercent,
    timeSpentFormatted,
    timeRemainingFormatted,
    timeLimitMinutes,
    results,
    chapterSummaries,
    weakestChapters
  };
}

/**
 * Formate les secondes sous la forme MM:SS
 */
export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
