import { QuizEvaluation, QuizHistoryEntry } from '../types';

const STORAGE_KEY = 'drone_quiz_history_v1';

export function getLocalQuizHistory(): QuizHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to read quiz history from localStorage:', err);
    return [];
  }
}

export function saveQuizResultToHistory(
  evaluation: QuizEvaluation,
  titleOverride?: string,
  isPracticeMode?: boolean
): QuizHistoryEntry {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const entryTitle =
    titleOverride ||
    evaluation.moduleName ||
    (evaluation.moduleId === 'module-1'
      ? 'Module 1 : Fondamentaux'
      : evaluation.moduleId === 'module-2'
      ? 'Module 2 : Mécanique du vol'
      : evaluation.moduleId === 'module-all'
      ? 'Examen Intégral (1+2)'
      : 'Session d\'évaluation');

  const newEntry: QuizHistoryEntry = {
    id: `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    dateFormatted,
    title: entryTitle,
    totalQuestions: evaluation.totalQuestions,
    rawScore: evaluation.rawScore,
    maxScore: evaluation.maxScore,
    percentage: evaluation.percentage,
    isPassed: evaluation.isPassed,
    passThreshold: evaluation.passThreshold,
    timeSpentFormatted: evaluation.timeSpentFormatted,
    isPracticeMode: isPracticeMode
  };

  try {
    const history = getLocalQuizHistory();
    // Conserver les 30 derniers résultats pour un affichage léger et rapide
    const updated = [newEntry, ...history].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save quiz history to localStorage:', err);
  }

  return newEntry;
}

export function clearLocalQuizHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear quiz history:', err);
  }
}
