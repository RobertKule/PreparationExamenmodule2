import { ActiveExamSession, QuizEvaluation, QuizHistoryEntry } from '../types';

const STORAGE_KEY = 'drone_quiz_history_v1';
const ACTIVE_SESSION_KEY = 'drone_active_exam_session_v2';

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
      : evaluation.moduleId === 'module-5'
      ? 'Module 5 : Conception & Dimensionnement'
      : evaluation.moduleId === 'module-all'
      ? 'Examen Intégral (1, 2 & 5)'
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
    isPracticeMode: isPracticeMode,
    status: evaluation.status || 'COMPLETED',
    isInterrupted: evaluation.isInterrupted ?? false,
    answeredCount: evaluation.answeredCount ?? (evaluation.correctCount + evaluation.wrongCount)
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

/**
 * Gestion de la session d'examen active (Persistance pour éviter toute perte de progression)
 */
export function getStoredActiveExamSession(): ActiveExamSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.sessionId && Array.isArray(parsed.questions)) {
      return parsed as ActiveExamSession;
    }
    return null;
  } catch (err) {
    console.warn('Impossible de lire la session active:', err);
    return null;
  }
}

export function saveActiveExamSession(session: ActiveExamSession): void {
  try {
    session.lastUpdatedTimestamp = Date.now();
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn('Erreur lors de la sauvegarde de la session active:', err);
  }
}

export function clearStoredActiveExamSession(): void {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch (err) {
    console.warn('Erreur lors de la suppression de la session active:', err);
  }
}
