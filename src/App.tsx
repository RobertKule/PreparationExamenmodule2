/**
 * Application complète de simulation d'examen Drone Knowledge Assessment
 * Support multi-modules : Module 1, Module 2, et Examen Intégral (1+2)
 * @license Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chapter, ModuleId, OptionKey, Question, QuizConfig, QuizEvaluation, QuizHistoryEntry } from './types';
import { MODULE_1_MARKDOWN_SOURCE, MODULE_2_MARKDOWN_SOURCE } from './data/rawMarkdown';
import { evaluateQuizSession, loadQuizDataForModule, MODULE_DEFINITIONS } from './utils/quizDataLoader';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { SetupView } from './components/SetupView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { CorrectionView } from './components/CorrectionView';
import { SourceInspectorModal } from './components/SourceInspectorModal';
import { CustomImportView } from './components/CustomImportView';
import { clearLocalQuizHistory, getLocalQuizHistory, saveQuizResultToHistory } from './utils/historyStorage';

export default function App() {
  // 1. Choix du module (Module 1 par défaut, ou Module 2, ou Tous)
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('module-1');

  // Surcharges éventuelles du markdown éditées par l'utilisateur
  const [customMarkdownMap, setCustomMarkdownMap] = useState<Partial<Record<ModuleId, string>>>({});
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  // Données de banque importée personnalisée (CSV ou Markdown)
  const [customImportData, setCustomImportData] = useState<{
    chapters: Chapter[];
    questions: Question[];
    bankTitle: string;
  } | null>(null);

  // Historique local des sessions
  const [localHistory, setLocalHistory] = useState<QuizHistoryEntry[]>(() => getLocalQuizHistory());

  // Texte markdown actif correspondant au module choisi
  const currentMarkdownText = useMemo(() => {
    if (customMarkdownMap[selectedModuleId]) {
      return customMarkdownMap[selectedModuleId]!;
    }
    if (selectedModuleId === 'module-1') return MODULE_1_MARKDOWN_SOURCE;
    if (selectedModuleId === 'module-2') return MODULE_2_MARKDOWN_SOURCE;
    return `${MODULE_1_MARKDOWN_SOURCE}\n\n${MODULE_2_MARKDOWN_SOURCE}`;
  }, [selectedModuleId, customMarkdownMap]);

  // Parse les données du quiz à partir de la source du module actif
  const quizData = useMemo(() => {
    return loadQuizDataForModule(selectedModuleId, customMarkdownMap[selectedModuleId]);
  }, [selectedModuleId, customMarkdownMap]);

  // 2. Navigation d'écrans : home, setup, quiz, results, correction, custom-import
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'quiz' | 'results' | 'correction' | 'custom-import'>('home');

  // 3. Configuration de la session active
  const [currentConfig, setCurrentConfig] = useState<QuizConfig>({
    moduleId: 'module-1',
    selectedChapterIds: [],
    durationMinutes: 30,
    passThresholdPercent: 85,
    shuffleQuestions: false,
    shuffleAnswers: false,
    isPracticeMode: false,
    isCustomBank: false
  });

  // 4. État de l'examen en cours
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionKey>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);

  // 5. Résultat d'évaluation
  const [evaluation, setEvaluation] = useState<QuizEvaluation | null>(null);

  // Notice d'annulation de session (Exigence 1)
  const [sessionCancellationNotice, setSessionCancellationNotice] = useState<string | null>(null);

  // Référence pour le calcul d'horloge sans dérive
  const timerIntervalRef = useRef<number | null>(null);
  const targetEndTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Annuler la session active sans enregistrer ni soumettre les réponses (Exigence 1)
  const cancelActiveSession = (reason?: string) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsQuizActive(false);
    setUserAnswers({});
    setFlaggedIds({});
    setActiveQuestions([]);
    setSessionCancellationNotice(
      reason ||
      "Votre session a été automatiquement annulée car vous avez quitté ou actualisé l'interface d'examen avant la validation. Vos réponses n'ont pas été enregistrées."
    );
    setCurrentView('home');
  };

  // Sécurité et détection de sortie de quiz (beforeunload, pagehide, visibilitychange - Exigence 1)
  useEffect(() => {
    if (!isQuizActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Toute sortie ou rafraîchissement annulera définitivement votre session d\'examen en cours.';
      return e.returnValue;
    };

    const handlePageHide = () => {
      cancelActiveSession();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cancelActiveSession(
          "Votre session d'examen a été annulée car vous avez quitté la fenêtre du quiz avant la soumission. Conformément aux consignes de sécurité, vos réponses n'ont pas été enregistrées."
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isQuizActive]);

  // Gestion du décompte de la minuterie globale (Section 6 du prompt)
  useEffect(() => {
    if (!isQuizActive) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    // Si durée libre (durationMinutes === 0), on incrémente juste le temps passé
    if (currentConfig.durationMinutes === 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
    }

    // Minuterie dégressive
    timerIntervalRef.current = window.setInterval(() => {
      if (!targetEndTimeRef.current || !startTimeRef.current) return;

      const now = Date.now();
      const remainingMs = targetEndTimeRef.current - now;
      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
      const spentSec = Math.floor((now - startTimeRef.current) / 1000);

      setTimeRemainingSeconds(remainingSec);
      setTimeSpentSeconds(spentSec);

      // Si le temps atteint zéro (Section 6 du prompt)
      if (remainingSec <= 0) {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        handleAutoSubmitOnTimeOut();
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isQuizActive, currentConfig.durationMinutes]);

  // Changement de module sélectionné
  const handleSelectModule = (modId: ModuleId) => {
    if (isQuizActive) return; // Ne pas interrompre un quiz en cours
    setSelectedModuleId(modId);
  };

  // Vider l'historique local
  const handleClearHistory = () => {
    clearLocalQuizHistory();
    setLocalHistory([]);
  };

  // Validation d'un import personnalisé
  const handleCustomImportConfirm = (chapters: Chapter[], questions: Question[], bankTitle: string) => {
    setCustomImportData({ chapters, questions, bankTitle });
    setCurrentConfig({
      moduleId: 'module-1',
      selectedChapterIds: chapters.map((c) => c.id),
      durationMinutes: Math.max(15, Math.ceil(questions.length * 1.5)),
      passThresholdPercent: 85,
      shuffleQuestions: false,
      shuffleAnswers: false,
      isPracticeMode: false,
      isCustomBank: true,
      customBankTitle: bankTitle
    });
    setCurrentView('setup');
  };

  // Démarrer une session de quiz
  const handleStartQuiz = (config: QuizConfig) => {
    setCurrentConfig(config);
    setSessionCancellationNotice(null);

    // Déterminer les chapitres sources (banque personnalisée ou modules standards)
    const chaptersPool = (config.isCustomBank && customImportData)
      ? customImportData.chapters
      : quizData.chapters;

    // Filtrer les questions selon les chapitres choisis
    const selectedChaps = chaptersPool.filter((c) =>
      config.selectedChapterIds.includes(c.id)
    );

    let questionsToUse = selectedChaps.flatMap((c) => c.questions);

    if (config.shuffleQuestions) {
      // Mélange aléatoire des questions
      questionsToUse = [...questionsToUse].sort(() => Math.random() - 0.5);
    }

    // Mélange aléatoire des propositions de réponses (Exigence 11)
    if (config.shuffleAnswers) {
      const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
      questionsToUse = questionsToUse.map((q) => {
        const correctText = q.options.find((o) => o.key === q.correctAnswer)?.text;
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        const newOptions = shuffledOptions.map((opt, idx) => ({
          key: optionKeys[idx] || 'A',
          text: opt.text
        }));
        const newCorrectKey = newOptions.find((o) => o.text === correctText)?.key || q.correctAnswer;
        return {
          ...q,
          options: newOptions,
          correctAnswer: newCorrectKey
        };
      });
    }

    // Appliquer la limite du nombre de questions si configurée (Exigence stepper)
    if (config.questionCountLimit && config.questionCountLimit > 0 && config.questionCountLimit < questionsToUse.length) {
      questionsToUse = questionsToUse.slice(0, config.questionCountLimit);
    }

    // Réinitialisation des états
    setActiveQuestions(questionsToUse);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedIds({});

    const totalSeconds = config.durationMinutes * 60;
    setTimeRemainingSeconds(totalSeconds);
    setTimeSpentSeconds(0);

    const now = Date.now();
    startTimeRef.current = now;
    targetEndTimeRef.current = now + totalSeconds * 1000;

    setIsQuizActive(true);
    setCurrentView('quiz');
  };

  // Démarrage rapide de tous les chapitres du module actif depuis l'accueil
  const handleQuickStartAll = (durationMinutes: number) => {
    handleStartQuiz({
      moduleId: selectedModuleId,
      selectedChapterIds: quizData.chapters.map((c) => c.id),
      durationMinutes,
      passThresholdPercent: 85,
      shuffleQuestions: false,
      shuffleAnswers: false,
      isPracticeMode: false,
      isCustomBank: false
    });
  };

  // Revoir spécifiquement les chapitres recommandés suite aux erreurs (Exigence 4)
  const handleReviewRecommendedChapters = (chapterIds: string[]) => {
    handleStartQuiz({
      moduleId: selectedModuleId,
      selectedChapterIds: chapterIds,
      durationMinutes: Math.max(10, chapterIds.length * 4),
      passThresholdPercent: currentConfig.passThresholdPercent || 85,
      shuffleQuestions: false,
      shuffleAnswers: false,
      isPracticeMode: true, // Mode entraînement sans pénalité pour favoriser l'apprentissage
      isCustomBank: Boolean(currentConfig.isCustomBank),
      customBankTitle: currentConfig.customBankTitle
    });
  };

  // Sélection d'une option (conserve les réponses)
  const handleSelectOption = (questionId: string, optionKey: OptionKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  // Effacer la sélection pour une question (laisser vide, 0 pt)
  const handleClearOption = (questionId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Marquer/dé-marquer pour révision
  const handleToggleFlag = (questionId: string) => {
    setFlaggedIds((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Enregistrement de l'évaluation et sauvegarde dans l'historique local (Exigences 15 & 16)
  const recordEvaluationAndHistory = (spentSeconds: number, durationMins: number) => {
    setIsQuizActive(false);

    const activeModInfo = MODULE_DEFINITIONS[selectedModuleId];
    const finalEvaluation = evaluateQuizSession(
      activeQuestions,
      userAnswers,
      currentConfig.passThresholdPercent,
      spentSeconds,
      durationMins,
      selectedModuleId,
      currentConfig.isCustomBank ? (currentConfig.customBankTitle || 'Banque Personnalisée') : activeModInfo?.name,
      Boolean(currentConfig.isPracticeMode)
    );

    setEvaluation(finalEvaluation);

    // Sauvegarde automatique dans l'historique local (Exigence 16)
    const titleOverride = currentConfig.isCustomBank
      ? (currentConfig.customBankTitle || 'Test Personnalisé')
      : activeModInfo?.name;

    saveQuizResultToHistory(finalEvaluation, titleOverride, Boolean(currentConfig.isPracticeMode));
    setLocalHistory(getLocalQuizHistory());

    setCurrentView('results');
  };

  // Soumission manuelle
  const handleSubmitQuiz = () => {
    recordEvaluationAndHistory(timeSpentSeconds, currentConfig.durationMinutes);
  };

  // Soumission automatique à l'expiration du temps
  const handleAutoSubmitOnTimeOut = () => {
    recordEvaluationAndHistory(currentConfig.durationMinutes * 60, currentConfig.durationMinutes);
  };

  // Recommencer le même quiz avec les mêmes questions
  const handleRetakeSameQuiz = () => {
    handleStartQuiz(currentConfig);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased">
      {/* Navbar principale */}
      <Navbar
        currentView={currentView}
        selectedModuleId={selectedModuleId}
        onSelectModule={handleSelectModule}
        onNavigateHome={() => {
          if (isQuizActive) {
            cancelActiveSession("Vous avez quitté la session pour revenir à l'accueil. La session a été annulée sans enregistrement.");
          } else {
            setCurrentView('home');
          }
        }}
        onOpenSourceInspector={() => setIsInspectorOpen(true)}
        isQuizActive={isQuizActive}
      />

      {/* Vue active */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            selectedModuleId={selectedModuleId}
            onSelectModule={(modId) => {
              setCustomImportData(null);
              setCurrentConfig((prev) => ({ ...prev, isCustomBank: false, customBankTitle: undefined }));
              handleSelectModule(modId);
            }}
            chapters={quizData.chapters}
            totalQuestions={quizData.totalQuestions}
            onStartConfig={() => {
              setCustomImportData(null);
              setCurrentConfig((prev) => ({ ...prev, isCustomBank: false, customBankTitle: undefined }));
              setCurrentView('setup');
            }}
            onQuickStartAll={handleQuickStartAll}
            sessionCancellationNotice={sessionCancellationNotice}
            onDismissCancellationNotice={() => setSessionCancellationNotice(null)}
            onNavigateToCustomImport={() => setCurrentView('custom-import')}
            localHistory={localHistory}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentView === 'custom-import' && (
          <CustomImportView
            onCancel={() => setCurrentView('home')}
            onConfirmImport={handleCustomImportConfirm}
          />
        )}

        {currentView === 'setup' && (
          <SetupView
            selectedModuleId={selectedModuleId}
            chapters={(currentConfig.isCustomBank && customImportData) ? customImportData.chapters : quizData.chapters}
            onStartQuiz={handleStartQuiz}
            onBackToHome={() => setCurrentView('home')}
            isCustomBank={Boolean(currentConfig.isCustomBank)}
            customBankTitle={customImportData?.bankTitle}
          />
        )}

        {currentView === 'quiz' && activeQuestions.length > 0 && (
          <QuizView
            chapters={(currentConfig.isCustomBank && customImportData) ? customImportData.chapters : quizData.chapters}
            questions={activeQuestions}
            currentQuestionIndex={currentQuestionIndex}
            answers={userAnswers}
            flaggedIds={flaggedIds}
            timeRemainingSeconds={timeRemainingSeconds}
            totalTimeSeconds={currentConfig.durationMinutes * 60}
            onSelectOption={handleSelectOption}
            onClearOption={handleClearOption}
            onToggleFlag={handleToggleFlag}
            onNavigateToQuestion={setCurrentQuestionIndex}
            onSubmitQuiz={handleSubmitQuiz}
            onAbandonQuiz={() => cancelActiveSession("Vous avez choisi d'abandonner l'examen. La session a été annulée et aucune réponse n'a été enregistrée.")}
            isPracticeMode={Boolean(currentConfig.isPracticeMode)}
          />
        )}

        {currentView === 'results' && evaluation && (
          <ResultsView
            evaluation={evaluation}
            onViewCorrection={() => setCurrentView('correction')}
            onRetakeSameQuiz={handleRetakeSameQuiz}
            onNewQuiz={() => setCurrentView('setup')}
            onReviewRecommendedChapters={handleReviewRecommendedChapters}
          />
        )}

        {currentView === 'correction' && evaluation && (
          <CorrectionView
            evaluation={evaluation}
            onBackToResults={() => setCurrentView('results')}
            onRetakeQuiz={handleRetakeSameQuiz}
          />
        )}
      </main>

      {/* Modal d'inspection du fichier Markdown source et du parser */}
      <SourceInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        activeMarkdownText={currentMarkdownText}
        selectedModuleId={selectedModuleId}
        onSelectModule={handleSelectModule}
        onApplyCustomMarkdown={(newText) => {
          setCustomMarkdownMap((prev) => ({
            ...prev,
            [selectedModuleId]: newText
          }));
        }}
        onResetDefaultMarkdown={() => {
          setCustomMarkdownMap((prev) => {
            const copy = { ...prev };
            delete copy[selectedModuleId];
            return copy;
          });
        }}
      />
    </div>
  );
}
