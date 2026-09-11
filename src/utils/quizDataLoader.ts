import {
  Chapter,
  ChapterSummary,
  OptionKey,
  Question,
  QuestionResult,
  QuizEvaluation
} from '../types';
import { DEFAULT_ANSWER_KEYS } from '../data/defaultAnswerKeys';
import { MODULE_2_MARKDOWN_SOURCE } from '../data/rawMarkdown';
import { parseMarkdownQuiz, ParseResult } from './markdownParser';

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
 * Charge l'ensemble des chapitres et questions du Module 2 avec leurs barèmes
 */
export function loadModule2QuizData(customMarkdown?: string): ParseResult {
  const source = customMarkdown || MODULE_2_MARKDOWN_SOURCE;
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
 * Calcule l'évaluation complète d'une session de quiz selon les règles officielles :
 * - Bonne réponse : +2 points
 * - Mauvaise réponse : -1 point
 * - Aucune réponse : 0 point
 * - Note max : Total questions × 2
 * - Pourcentage : (score brut / note max) × 100
 */
export function evaluateQuizSession(
  questions: Question[],
  userAnswers: Record<string, OptionKey>,
  passThresholdPercent: number,
  timeSpentSeconds: number,
  timeLimitMinutes: number
): QuizEvaluation {
  let rawScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

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
      points = -1;
      wrongCount += 1;
      chapterMap[chapId].wrong += 1;
      chapterMap[chapId].points -= 1;
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
  const isPassed = percentage >= passThresholdPercent;

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
    totalQuestions: questions.length,
    maxScore,
    rawScore,
    percentage,
    correctCount,
    wrongCount,
    unansweredCount,
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
