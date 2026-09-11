/**
 * Application complète de simulation d'examen Drone Knowledge Assessment
 * Support multi-modules : Module 1, Module 2, et Examen Intégral (1+2)
 * @license Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chapter, ModuleId, OptionKey, Question, QuizConfig, QuizEvaluation } from './types';
import { MODULE_1_MARKDOWN_SOURCE, MODULE_2_MARKDOWN_SOURCE } from './data/rawMarkdown';
import { evaluateQuizSession, loadQuizDataForModule, MODULE_DEFINITIONS } from './utils/quizDataLoader';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { SetupView } from './components/SetupView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { CorrectionView } from './components/CorrectionView';
import { SourceInspectorModal } from './components/SourceInspectorModal';

export default function App() {
  // 1. Choix du module (Module 1 par défaut, ou Module 2, ou Tous)
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('module-1');

  // Surcharges éventuelles du markdown éditées par l'utilisateur
  const [customMarkdownMap, setCustomMarkdownMap] = useState<Partial<Record<ModuleId, string>>>({});
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

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

  // 2. Navigation d'écrans : home, setup, quiz, results, correction
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'quiz' | 'results' | 'correction'>('home');

  // 3. Configuration de la session active
  const [currentConfig, setCurrentConfig] = useState<QuizConfig>({
    moduleId: 'module-1',
    selectedChapterIds: [],
    durationMinutes: 30,
    passThresholdPercent: 85,
    shuffleQuestions: false
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

  // Référence pour le calcul d'horloge sans dérive
  const timerIntervalRef = useRef<number | null>(null);
  const targetEndTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Sécurité anti-quitter accidentel (Section 6 du prompt)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizActive) {
        e.preventDefault();
        e.returnValue = 'Votre session d\'examen est en cours. Quitter la page entraînera la perte de vos réponses.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
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

  // Démarrer une session de quiz
  const handleStartQuiz = (config: QuizConfig) => {
    setCurrentConfig(config);

    // Filtrer les questions selon les chapitres choisis
    const selectedChaps = quizData.chapters.filter((c) =>
      config.selectedChapterIds.includes(c.id)
    );

    let questionsToUse = selectedChaps.flatMap((c) => c.questions);

    if (config.shuffleQuestions) {
      // Mélange aléatoire avec Fisher-Yates
      questionsToUse = [...questionsToUse].sort(() => Math.random() - 0.5);
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
      shuffleQuestions: false
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

  // Soumission manuelle
  const handleSubmitQuiz = () => {
    setIsQuizActive(false);

    const activeModInfo = MODULE_DEFINITIONS[selectedModuleId];
    const finalEvaluation = evaluateQuizSession(
      activeQuestions,
      userAnswers,
      currentConfig.passThresholdPercent,
      timeSpentSeconds,
      currentConfig.durationMinutes,
      selectedModuleId,
      activeModInfo?.name
    );

    setEvaluation(finalEvaluation);
    setCurrentView('results');
  };

  // Soumission automatique à l'expiration du temps
  const handleAutoSubmitOnTimeOut = () => {
    setIsQuizActive(false);

    const activeModInfo = MODULE_DEFINITIONS[selectedModuleId];
    const finalEvaluation = evaluateQuizSession(
      activeQuestions,
      userAnswers,
      currentConfig.passThresholdPercent,
      currentConfig.durationMinutes * 60,
      currentConfig.durationMinutes,
      selectedModuleId,
      activeModInfo?.name
    );

    setEvaluation(finalEvaluation);
    setCurrentView('results');
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
        onNavigateHome={() => setCurrentView('home')}
        onOpenSourceInspector={() => setIsInspectorOpen(true)}
        isQuizActive={isQuizActive}
      />

      {/* Vue active */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            selectedModuleId={selectedModuleId}
            onSelectModule={handleSelectModule}
            chapters={quizData.chapters}
            totalQuestions={quizData.totalQuestions}
            onStartConfig={() => setCurrentView('setup')}
            onQuickStartAll={handleQuickStartAll}
          />
        )}

        {currentView === 'setup' && (
          <SetupView
            selectedModuleId={selectedModuleId}
            chapters={quizData.chapters}
            onStartQuiz={handleStartQuiz}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'quiz' && activeQuestions.length > 0 && (
          <QuizView
            chapters={quizData.chapters}
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
          />
        )}

        {currentView === 'results' && evaluation && (
          <ResultsView
            evaluation={evaluation}
            onViewCorrection={() => setCurrentView('correction')}
            onRetakeSameQuiz={handleRetakeSameQuiz}
            onNewQuiz={() => setCurrentView('setup')}
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
