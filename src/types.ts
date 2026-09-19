export type OptionKey = 'A' | 'B' | 'C' | 'D' | 'E' | string;

export type ModuleId = 'module-1' | 'module-2' | 'module-5' | 'module-all';

export type ExamStatus = 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED' | 'INTERROMPU';

export interface ModuleInfo {
  id: ModuleId;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  defaultTimeMinutes: number;
}

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  id: string; // e.g., "q-2-1-1"
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  questionNumber: number;
  globalIndex: number; // 1 to total questions
  text: string;
  options: QuestionOption[];
  correctAnswer?: OptionKey; // Provided or default
  explanation?: string;
}

export interface Chapter {
  id: string;
  code: string; // e.g. "2.1.11"
  title: string; // e.g. "Auto-évaluation 2.1 - Aérodynamique & Sustentation"
  shortTitle: string; // e.g. "Chapitre 2.1"
  questions: Question[];
}

export interface QuizConfig {
  moduleId?: ModuleId;
  selectedChapterIds: string[]; // empty means all
  durationMinutes: number; // 30, 60, or custom
  passThresholdPercent: number; // default 85%
  shuffleQuestions: boolean;
  shuffleAnswers?: boolean; // Mélange aléatoire des propositions A, B, C, D
  questionCountLimit?: number; // 0 for all, or 10, 20, 30
  isPracticeMode?: boolean; // true: pas de pénalité, explications directes
  isCustomBank?: boolean;
  customBankTitle?: string;
}

export interface QuizHistoryEntry {
  id: string;
  timestamp: number;
  dateFormatted: string;
  title: string;
  totalQuestions: number;
  rawScore: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  passThreshold: number;
  timeSpentFormatted: string;
  isPracticeMode?: boolean;
  status?: ExamStatus;
  isInterrupted?: boolean;
  answeredCount?: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, OptionKey>; // questionId -> selectedOption
  flaggedQuestionIds: Record<string, boolean>; // questionId -> boolean
  startTime: number | null;
  targetEndTime: number | null;
  isCompleted: boolean;
  timeSpentSeconds: number;
}

export interface ActiveExamSession {
  sessionId: string;
  moduleId: ModuleId;
  moduleName: string;
  status: ExamStatus;
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, OptionKey>;
  flaggedIds: Record<string, boolean>;
  startTime: number;
  targetEndTime: number | null;
  timeRemainingSeconds: number;
  timeSpentSeconds: number;
  totalTimeSeconds: number;
  lastUpdatedTimestamp: number;
  isCustomBank?: boolean;
  customBankTitle?: string;
}

export interface QuestionResult {
  question: Question;
  userAnswer?: OptionKey;
  correctAnswer?: OptionKey;
  isCorrect: boolean;
  isUnanswered: boolean;
  points: number; // +2, -1, or 0
  explanation?: string;
}

export interface ChapterSummary {
  chapterId: string;
  chapterCode: string;
  chapterTitle: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  points: number;
  maxPoints: number;
  percentage: number;
}

export interface QuizEvaluation {
  moduleId?: ModuleId;
  moduleName?: string;
  status?: ExamStatus; // 'COMPLETED' | 'INTERRUPTED'
  isInterrupted?: boolean;
  totalQuestions: number;
  maxScore: number;
  rawScore: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  answeredCount?: number;
  isPassed: boolean;
  passThreshold: number;
  timeSpentFormatted: string;
  timeRemainingFormatted: string;
  timeLimitMinutes: number;
  results: QuestionResult[];
  chapterSummaries: ChapterSummary[];
  weakestChapters: ChapterSummary[];
}
