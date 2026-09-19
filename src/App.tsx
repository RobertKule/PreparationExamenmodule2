/**
 * Application complète de simulation d'examen Drone Knowledge Assessment
 * Support multi-modules : Module 1, Module 2, Module 5, et Examen Intégral (1, 2 & 5)
 * Gestion robuste des sessions : Examen Terminé et Examen Interrompu avec conservation d'état
 * @license Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  ActiveExamSession, 
  Chapter, 
  ModuleId, 
  OptionKey, 
  Question, 
  QuizConfig, 
  QuizEvaluation, 
  QuizHistoryEntry 
} from './types';
import { MODULE_1_MARKDOWN_SOURCE, MODULE_2_MARKDOWN_SOURCE } from './data/rawMarkdown';
import { MODULE_5_CSV_SOURCE } from './data/module5Csv';
import { evaluateQuizSession, loadQuizDataForModule, MODULE_DEFINITIONS } from './utils/quizDataLoader';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { SetupView } from './components/SetupView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { CorrectionView } from './components/CorrectionView';
import { SourceInspectorModal } from './components/SourceInspectorModal';
import { CustomImportView } from './components/CustomImportView';
import { 
  clearLocalQuizHistory, 
  clearStoredActiveExamSession, 
  getLocalQuizHistory, 
  getStoredActiveExamSession, 
  saveActiveExamSession, 
  saveQuizResultToHistory 
} from './utils/historyStorage';

export default function App() {
  // 1. Choix du module (Module 5 par défaut à l'accueil)
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('module-5');

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

  // Session active ou interrompue enregistrée
  const [activeSession, setActiveSession] = useState<ActiveExamSession | null>(() => getStoredActiveExamSession());

  // Texte source actif correspondant au module choisi
  const currentMarkdownText = useMemo(() => {
    if (customMarkdownMap[selectedModuleId]) {
      return customMarkdownMap[selectedModuleId]!;
    }
    if (selectedModuleId === 'module-1') return MODULE_1_MARKDOWN_SOURCE;
    if (selectedModuleId === 'module-2') return MODULE_2_MARKDOWN_SOURCE;
    if (selectedModuleId === 'module-5' || selectedModuleId === 'module-5-all') return MODULE_5_CSV_SOURCE;
    return `${MODULE_1_MARKDOWN_SOURCE}\n\n${MODULE_2_MARKDOWN_SOURCE}\n\n# MODULE 5 (CSV SOURCE)\n${MODULE_5_CSV_SOURCE}`;
  }, [selectedModuleId, customMarkdownMap]);

  // Parse les données du quiz à partir de la source du module actif
  const quizData = useMemo(() => {
    return loadQuizDataForModule(selectedModuleId, customMarkdownMap[selectedModuleId]);
  }, [selectedModuleId, customMarkdownMap]);

  // 2. Navigation d'écrans : home, setup, quiz, results, correction, custom-import
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'quiz' | 'results' | 'correction' | 'custom-import'>('home');

  // 3. Configuration de la session active
  const [currentConfig, setCurrentConfig] = useState<QuizConfig>({
    moduleId: 'module-5',
    selectedChapterIds: [],
    durationMinutes: 60,
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

  // Notice d'annulation ou interruption de session
  const [sessionCancellationNotice, setSessionCancellationNotice] = useState<string | null>(null);

  // Référence pour le calcul d'horloge sans dérive
  const timerIntervalRef = useRef<number | null>(null);
  const targetEndTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Synchronisation continue des états pour la session persistée
  const userAnswersRef = useRef<Record<string, OptionKey>>({});
  const timeSpentRef = useRef<number>(0);
  const timeRemainingRef = useRef<number>(0);
  const currentQIndexRef = useRef<number>(0);
  const activeQuestionsRef = useRef<Question[]>([]);
  const currentConfigRef = useRef<QuizConfig>(currentConfig);
  const selectedModuleIdRef = useRef<ModuleId>(selectedModuleId);

  useEffect(() => {
    userAnswersRef.current = userAnswers;
  }, [userAnswers]);

  useEffect(() => {
    timeSpentRef.current = timeSpentSeconds;
  }, [timeSpentSeconds]);

  useEffect(() => {
    timeRemainingRef.current = timeRemainingSeconds;
  }, [timeRemainingSeconds]);

  useEffect(() => {
    currentQIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    activeQuestionsRef.current = activeQuestions;
  }, [activeQuestions]);

  useEffect(() => {
    currentConfigRef.current = currentConfig;
  }, [currentConfig]);

  useEffect(() => {
    selectedModuleIdRef.current = selectedModuleId;
  }, [selectedModuleId]);

  // Interruption élégante et sécurisée d'un examen en cours (sans perte des réponses)
  const handleInterruptQuiz = (reason?: string) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const questions = activeQuestionsRef.current;
    const answers = userAnswersRef.current;
    const config = currentConfigRef.current;
    const spentSec = timeSpentRef.current;
    const remSec = timeRemainingRef.current;
    const qIndex = currentQIndexRef.current;
    const modId = selectedModuleIdRef.current;

    const activeModInfo = MODULE_DEFINITIONS[modId];
    const partialEvaluation = evaluateQuizSession(
      questions,
      answers,
      config.passThresholdPercent,
      spentSec,
      config.durationMinutes,
      modId,
      config.isCustomBank ? (config.customBankTitle || 'Test Personnalisé') : activeModInfo?.name,
      Boolean(config.isPracticeMode),
      'INTERROMPU'
    );

    // Mettre à jour et enregistrer la session active avec le statut INTERROMPU
    const interruptedSession: ActiveExamSession = {
      sessionId: activeSession?.sessionId || `session-${Date.now()}`,
      moduleId: modId,
      moduleName: config.isCustomBank ? (config.customBankTitle || 'Test Personnalisé') : (activeModInfo?.name || 'Examen Drone'),
      status: 'INTERROMPU',
      config,
      questions,
      currentQuestionIndex: qIndex,
      answers,
      flaggedIds,
      startTime: startTimeRef.current || Date.now(),
      targetEndTime: targetEndTimeRef.current,
      timeRemainingSeconds: remSec,
      timeSpentSeconds: spentSec,
      totalTimeSeconds: config.durationMinutes * 60,
      lastUpdatedTimestamp: Date.now(),
      isCustomBank: Boolean(config.isCustomBank),
      customBankTitle: config.customBankTitle
    };

    saveActiveExamSession(interruptedSession);
    setActiveSession(interruptedSession);

    // Enregistrer l'évaluation partielle dans l'historique avec le statut INTERROMPU
    const titleOverride = config.isCustomBank
      ? (config.customBankTitle || 'Test Personnalisé')
      : activeModInfo?.name;

    saveQuizResultToHistory(partialEvaluation, titleOverride, Boolean(config.isPracticeMode));
    setLocalHistory(getLocalQuizHistory());

    setIsQuizActive(false);
    setEvaluation(partialEvaluation);

    if (reason) {
      setSessionCancellationNotice(reason);
    }

    // Afficher la page de résultat spécifique "Examen interrompu"
    setCurrentView('results');
  };

  // Sécurité et détection de fermeture de page (sauvegarde automatique de l'état sans effacement brutal)
  useEffect(() => {
    if (!isQuizActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Sauvegarder immédiatement l'état courant dans localStorage avant déchargement
      const s: ActiveExamSession = {
        sessionId: activeSession?.sessionId || `session-${Date.now()}`,
        moduleId: selectedModuleIdRef.current,
        moduleName: currentConfigRef.current.isCustomBank 
          ? (currentConfigRef.current.customBankTitle || 'Test Personnalisé') 
          : (MODULE_DEFINITIONS[selectedModuleIdRef.current]?.name || 'Examen Drone'),
        status: 'INTERROMPU',
        config: currentConfigRef.current,
        questions: activeQuestionsRef.current,
        currentQuestionIndex: currentQIndexRef.current,
        answers: userAnswersRef.current,
        flaggedIds,
        startTime: startTimeRef.current || Date.now(),
        targetEndTime: targetEndTimeRef.current,
        timeRemainingSeconds: timeRemainingRef.current,
        timeSpentSeconds: timeSpentRef.current,
        totalTimeSeconds: currentConfigRef.current.durationMinutes * 60,
        lastUpdatedTimestamp: Date.now(),
        isCustomBank: Boolean(currentConfigRef.current.isCustomBank),
        customBankTitle: currentConfigRef.current.customBankTitle
      };
      saveActiveExamSession(s);

      e.preventDefault();
      e.returnValue = 'Votre session d\'examen est en cours. Vos réponses ont été sauvegardées.';
      return e.returnValue;
    };

    const handlePageHide = () => {
      const s: ActiveExamSession = {
        sessionId: activeSession?.sessionId || `session-${Date.now()}`,
        moduleId: selectedModuleIdRef.current,
        moduleName: currentConfigRef.current.isCustomBank 
          ? (currentConfigRef.current.customBankTitle || 'Test Personnalisé') 
          : (MODULE_DEFINITIONS[selectedModuleIdRef.current]?.name || 'Examen Drone'),
        status: 'INTERROMPU',
        config: currentConfigRef.current,
        questions: activeQuestionsRef.current,
        currentQuestionIndex: currentQIndexRef.current,
        answers: userAnswersRef.current,
        flaggedIds,
        startTime: startTimeRef.current || Date.now(),
        targetEndTime: targetEndTimeRef.current,
        timeRemainingSeconds: timeRemainingRef.current,
        timeSpentSeconds: timeSpentRef.current,
        totalTimeSeconds: currentConfigRef.current.durationMinutes * 60,
        lastUpdatedTimestamp: Date.now(),
        isCustomBank: Boolean(currentConfigRef.current.isCustomBank),
        customBankTitle: currentConfigRef.current.customBankTitle
      };
      saveActiveExamSession(s);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [isQuizActive, activeSession, flaggedIds]);

  // Gestion du décompte de la minuterie globale
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
        setTimeSpentSeconds((prev) => {
          const next = prev + 1;
          timeSpentRef.current = next;
          return next;
        });
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
      timeRemainingRef.current = remainingSec;
      timeSpentRef.current = spentSec;

      // Si le temps atteint zéro
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

  // Démarrer une nouvelle session d'examen
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

    // Mélange aléatoire des propositions de réponses
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

    // Appliquer la limite du nombre de questions si configurée
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
    targetEndTimeRef.current = config.durationMinutes > 0 ? now + totalSeconds * 1000 : null;

    // Créer et enregistrer la session active
    const activeModInfo = MODULE_DEFINITIONS[config.moduleId || selectedModuleId];
    const newSession: ActiveExamSession = {
      sessionId: `session-${now}`,
      moduleId: config.moduleId || selectedModuleId,
      moduleName: config.isCustomBank ? (config.customBankTitle || 'Test Personnalisé') : (activeModInfo?.name || 'Examen Drone'),
      status: 'IN_PROGRESS',
      config,
      questions: questionsToUse,
      currentQuestionIndex: 0,
      answers: {},
      flaggedIds: {},
      startTime: now,
      targetEndTime: targetEndTimeRef.current,
      timeRemainingSeconds: totalSeconds,
      timeSpentSeconds: 0,
      totalTimeSeconds: totalSeconds,
      lastUpdatedTimestamp: now,
      isCustomBank: Boolean(config.isCustomBank),
      customBankTitle: config.customBankTitle
    };

    setActiveSession(newSession);
    saveActiveExamSession(newSession);

    setIsQuizActive(true);
    setCurrentView('quiz');
  };

  // Reprendre un examen interrompu ou en cours
  const handleResumeActiveSession = (sessionToResume?: ActiveExamSession) => {
    const s = sessionToResume || activeSession || getStoredActiveExamSession();
    if (!s) return;

    setCurrentConfig(s.config);
    if (s.moduleId) {
      setSelectedModuleId(s.moduleId);
    }
    setActiveQuestions(s.questions);
    setCurrentQuestionIndex(s.currentQuestionIndex || 0);
    setUserAnswers(s.answers || {});
    setFlaggedIds(s.flaggedIds || {});
    setTimeRemainingSeconds(s.timeRemainingSeconds);
    setTimeSpentSeconds(s.timeSpentSeconds);

    const now = Date.now();
    startTimeRef.current = now - (s.timeSpentSeconds * 1000);
    targetEndTimeRef.current = s.timeRemainingSeconds > 0 ? now + (s.timeRemainingSeconds * 1000) : null;

    const resumingSession: ActiveExamSession = {
      ...s,
      status: 'IN_PROGRESS',
      lastUpdatedTimestamp: now
    };

    setActiveSession(resumingSession);
    saveActiveExamSession(resumingSession);

    setIsQuizActive(true);
    setCurrentView('quiz');
  };

  // Consulter le bilan partiel d'une session interrompue depuis l'accueil
  const handleViewInterruptedSession = () => {
    const s = activeSession || getStoredActiveExamSession();
    if (!s) return;

    const activeModInfo = MODULE_DEFINITIONS[s.moduleId];
    const partialEvaluation = evaluateQuizSession(
      s.questions,
      s.answers || {},
      s.config.passThresholdPercent,
      s.timeSpentSeconds,
      s.config.durationMinutes,
      s.moduleId,
      s.config.isCustomBank ? (s.config.customBankTitle || 'Test Personnalisé') : activeModInfo?.name,
      Boolean(s.config.isPracticeMode),
      'INTERROMPU'
    );

    setEvaluation(partialEvaluation);
    setCurrentView('results');
  };

  // Abandonner définitivement la session active stockée
  const handleDiscardActiveSession = () => {
    clearStoredActiveExamSession();
    setActiveSession(null);
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

  // Revoir spécifiquement les chapitres recommandés suite aux erreurs
  const handleReviewRecommendedChapters = (chapterIds: string[]) => {
    handleStartQuiz({
      moduleId: selectedModuleId,
      selectedChapterIds: chapterIds,
      durationMinutes: Math.max(10, chapterIds.length * 4),
      passThresholdPercent: currentConfig.passThresholdPercent || 85,
      shuffleQuestions: false,
      shuffleAnswers: false,
      isPracticeMode: true,
      isCustomBank: Boolean(currentConfig.isCustomBank),
      customBankTitle: currentConfig.customBankTitle
    });
  };

  // Sélection d'une option (conserve les réponses en mémoire et en stockage local)
  const handleSelectOption = (questionId: string, optionKey: OptionKey) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: optionKey
      };

      // Mettre à jour la session active en temps réel
      if (activeSession) {
        const s: ActiveExamSession = {
          ...activeSession,
          answers: updated,
          currentQuestionIndex,
          timeSpentSeconds,
          timeRemainingSeconds,
          lastUpdatedTimestamp: Date.now()
        };
        saveActiveExamSession(s);
        setActiveSession(s);
      }

      return updated;
    });
  };

  // Effacer la sélection pour une question (laisser vide, 0 pt)
  const handleClearOption = (questionId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];

      if (activeSession) {
        const s: ActiveExamSession = {
          ...activeSession,
          answers: copy,
          currentQuestionIndex,
          timeSpentSeconds,
          timeRemainingSeconds,
          lastUpdatedTimestamp: Date.now()
        };
        saveActiveExamSession(s);
        setActiveSession(s);
      }

      return copy;
    });
  };

  // Marquer/dé-marquer pour révision
  const handleToggleFlag = (questionId: string) => {
    setFlaggedIds((prev) => {
      const updated = {
        ...prev,
        [questionId]: !prev[questionId]
      };

      if (activeSession) {
        const s: ActiveExamSession = {
          ...activeSession,
          flaggedIds: updated,
          lastUpdatedTimestamp: Date.now()
        };
        saveActiveExamSession(s);
        setActiveSession(s);
      }

      return updated;
    });
  };

  // Enregistrement de l'évaluation finale et archivage dans l'historique (Examen TERMINÉ)
  const recordCompletedEvaluationAndHistory = (spentSeconds: number, durationMins: number) => {
    setIsQuizActive(false);

    // Supprimer la session active en cours car l'examen est terminé normalement
    clearStoredActiveExamSession();
    setActiveSession(null);

    const activeModInfo = MODULE_DEFINITIONS[selectedModuleId];
    const finalEvaluation = evaluateQuizSession(
      activeQuestions,
      userAnswers,
      currentConfig.passThresholdPercent,
      spentSeconds,
      durationMins,
      selectedModuleId,
      currentConfig.isCustomBank ? (currentConfig.customBankTitle || 'Banque Personnalisée') : activeModInfo?.name,
      Boolean(currentConfig.isPracticeMode),
      'COMPLETED'
    );

    setEvaluation(finalEvaluation);

    // Sauvegarde automatique dans l'historique local
    const titleOverride = currentConfig.isCustomBank
      ? (currentConfig.customBankTitle || 'Test Personnalisé')
      : activeModInfo?.name;

    saveQuizResultToHistory(finalEvaluation, titleOverride, Boolean(currentConfig.isPracticeMode));
    setLocalHistory(getLocalQuizHistory());

    setCurrentView('results');
  };

  // Soumission manuelle (Examen TERMINÉ normalement)
  const handleSubmitQuiz = () => {
    recordCompletedEvaluationAndHistory(timeSpentSeconds, currentConfig.durationMinutes);
  };

  // Soumission automatique à l'expiration du temps (Examen TERMINÉ)
  const handleAutoSubmitOnTimeOut = () => {
    recordCompletedEvaluationAndHistory(currentConfig.durationMinutes * 60, currentConfig.durationMinutes);
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
            handleInterruptQuiz("Vous êtes revenu à l'accueil en cours d'examen. Votre progression a été enregistrée avec le statut Interrompu.");
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
            activeSession={activeSession}
            onResumeActiveSession={() => handleResumeActiveSession()}
            onViewInterruptedSession={handleViewInterruptedSession}
            onDiscardActiveSession={handleDiscardActiveSession}
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
            onAbandonQuiz={() => handleInterruptQuiz("Vous avez choisi d'interrompre votre examen. Votre score partiel a été calculé et vos réponses restent conservées.")}
            isPracticeMode={Boolean(currentConfig.isPracticeMode)}
          />
        )}

        {currentView === 'results' && evaluation && (
          <ResultsView
            evaluation={evaluation}
            canResume={Boolean(activeSession && (evaluation.status === 'INTERRUPTED' || evaluation.isInterrupted))}
            onResumeQuiz={() => handleResumeActiveSession()}
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
