import { Chapter, OptionKey, Question, QuestionOption } from '../types';

/**
 * Metadata des titres de chapitres des Modules 1 et 2 pour enrichir l'affichage
 */
export const CHAPTER_METADATA: Record<string, { short: string; title: string }> = {
  // Module 1 : Fondamentaux & Réglementation
  '1.1': {
    short: 'Chapitre 1.1',
    title: 'Avertissement pédagogique'
  },
  '1.2': {
    short: 'Chapitre 1.2',
    title: 'Définitions et vocabulaire'
  },
  '1.3': {
    short: 'Chapitre 1.3',
    title: 'Familles de drones et classifications'
  },
  '1.4': {
    short: 'Chapitre 1.4',
    title: 'Usages et écosystème industriel'
  },
  '1.5': {
    short: 'Chapitre 1.5',
    title: 'Anatomie et architecture UAS'
  },
  '1.6': {
    short: 'Chapitre 1.6',
    title: 'Cadre réglementaire'
  },

  // Module 2 : Mécanique du vol, Propulsion & Systèmes
  '2.1': {
    short: 'Chapitre 2.1',
    title: 'Aérodynamique & Vol stationnaire (Théorie du disque)'
  },
  '2.2': {
    short: 'Chapitre 2.2',
    title: 'Dynamique du vol & Commande sous-actionnée'
  },
  '2.3': {
    short: 'Chapitre 2.3',
    title: 'Repères de mesure, Angles d\'Euler & Quaternions'
  },
  '2.4': {
    short: 'Chapitre 2.4',
    title: 'Aérodynamique des hélices & Figure de mérite'
  },
  '2.5': {
    short: 'Chapitre 2.5',
    title: 'Moteurs sans balais (Brushless) & Régimes de fonctionnement'
  },
  '2.6': {
    short: 'Chapitre 2.6',
    title: 'Stabilité statique, Stabilité dynamique & Amortissement'
  },
  '2.7': {
    short: 'Chapitre 2.7',
    title: 'Boucle de régulation & Correcteur PID'
  },
  '2.8': {
    short: 'Chapitre 2.8',
    title: 'Vibrations mécaniques, Fréquences propres & Filtrage'
  },
  '2.9': {
    short: 'Chapitre 2.9',
    title: 'Tenseur d\'inertie, Centrage & Moments d\'inertie'
  },
  '2.10': {
    short: 'Chapitre 2.10',
    title: 'Voilure fixe & Aéronefs convertibles (VTOL)'
  },
  '2.11': {
    short: 'Chapitre 2.11',
    title: 'Dimensionnement énergétique, Batteries & Autonomie'
  },
  '2.12': {
    short: 'Chapitre 2.12',
    title: 'Simulation logicielle (SITL) & Autopilote ArduPilot'
  }
};

export interface ParseResult {
  chapters: Chapter[];
  allQuestions: Question[];
  totalQuestions: number;
  warnings: string[];
}

/**
 * Analyseur syntaxique robuste pour le fichier Markdown des questions.
 * Gère le texte multiligne, les en-têtes variés et les choix multiples.
 */
export function parseMarkdownQuiz(markdownText: string): ParseResult {
  const lines = markdownText.split(/\r?\n/);
  const chapters: Chapter[] = [];
  const warnings: string[] = [];

  let currentChapter: Chapter | null = null;
  let currentQuestion: Partial<Question> | null = null;
  let currentOptions: QuestionOption[] = [];
  let currentOption: Partial<QuestionOption> | null = null;
  let globalQuestionCounter = 0;

  function commitCurrentOption() {
    if (currentOption && currentOption.key) {
      currentOptions.push({
        key: currentOption.key as OptionKey,
        text: (currentOption.text || '').trim()
      });
      currentOption = null;
    }
  }

  function commitCurrentQuestion() {
    commitCurrentOption();

    if (currentQuestion && currentChapter) {
      if (!currentQuestion.text || currentQuestion.text.trim().length === 0) {
        warnings.push(`Question vide détectée dans le chapitre ${currentChapter.code}`);
        return;
      }
      if (currentOptions.length < 2) {
        warnings.push(
          `La question ${currentQuestion.questionNumber} (${currentChapter.code}) n'a que ${currentOptions.length} choix.`
        );
      }

      globalQuestionCounter += 1;
      const finalQuestion: Question = {
        id: currentQuestion.id || `q-${currentChapter.id}-${currentQuestion.questionNumber}`,
        chapterId: currentChapter.id,
        chapterNumber: currentChapter.code,
        chapterTitle: currentChapter.title,
        questionNumber: currentQuestion.questionNumber || currentChapter.questions.length + 1,
        globalIndex: globalQuestionCounter,
        text: currentQuestion.text.trim(),
        options: [...currentOptions],
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation
      };

      currentChapter.questions.push(finalQuestion);
      currentQuestion = null;
      currentOptions = [];
    }
  }

  function commitCurrentChapter() {
    commitCurrentQuestion();
    if (currentChapter && currentChapter.questions.length > 0) {
      chapters.push(currentChapter);
    }
    currentChapter = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      continue;
    }

    // 1. Détection d'un en-tête de chapitre
    // Exemples : "1.1. Auto-évaluation", "2.1.11. Auto-évaluation", "## Chapitre 1.3", etc.
    const chapterMatch =
      trimmed.match(/^#*\s*(\d+\.\d+)(?:\.\d+)?\.?\s*(?:Auto-évaluation|Chapitre)?\s*(?:[-—–]\s*(.*))?/i) ||
      trimmed.match(/^#*\s*Chapitre\s*([0-9\.]+)\s*(?:[-—–]\s*(.*))?/i);

    if (chapterMatch && !trimmed.toLowerCase().startsWith('question')) {
      commitCurrentChapter();
      const codeBase = chapterMatch[1]; // ex: "1.1", "2.1" ou "2.10"
      const explicitSubtitle = chapterMatch[2]?.trim();
      const meta = CHAPTER_METADATA[codeBase] || {
        short: `Chapitre ${codeBase}`,
        title: explicitSubtitle || trimmed
      };

      currentChapter = {
        id: `chap-${codeBase.replace('.', '-')}`,
        code: codeBase,
        shortTitle: meta.short,
        title: `${meta.short} — ${meta.title}`,
        questions: []
      };
      continue;
    }

    // 2. Détection d'une nouvelle question
    // Exemple : "Question 1. En quoi le bilan des forces..."
    const questionMatch = trimmed.match(/^Question\s*(\d+)[\.:\)]\s*(.*)/i);
    if (questionMatch) {
      if (!currentChapter) {
        // Chapitre implicite par défaut si non spécifié au tout début
        currentChapter = {
          id: 'chap-intro',
          code: '2.0',
          shortTitle: 'Chapitre Général',
          title: 'Questions Générales — Module 2',
          questions: []
        };
      }
      commitCurrentQuestion();

      const qNum = parseInt(questionMatch[1], 10);
      const qText = questionMatch[2] || '';

      currentQuestion = {
        id: `q-${currentChapter.id}-${qNum}`,
        questionNumber: qNum,
        text: qText
      };
      continue;
    }

    // 3. Détection d'une option de réponse
    // Exemple : "A. Il ne diffère pas...", "B. Un seul organe..."
    const optionMatch = trimmed.match(/^([A-E])[\.:\)]\s+(.*)/i);
    if (optionMatch && currentQuestion) {
      commitCurrentOption();
      const key = optionMatch[1].toUpperCase() as OptionKey;
      let optText = optionMatch[2] || '';

      // Vérifie si le texte de l'option indique explicitement la bonne réponse
      let isAnswer = false;
      if (optText.includes('[x]') || optText.includes('(correcte)') || optText.includes('✓')) {
        isAnswer = true;
        optText = optText.replace(/\[x\]|\(correcte\)|✓/gi, '').trim();
      }

      currentOption = {
        key,
        text: optText
      };

      if (isAnswer) {
        currentQuestion.correctAnswer = key;
      }
      continue;
    }

    // 4. Détection éventuelle de bonne réponse explicite
    // Ex: "Réponse : B" ou "Bonne réponse : C"
    const explicitAnswerMatch = trimmed.match(/^(?:Bonne\s+)?R[ée]ponse\s*(?:attendue|correcte)?\s*[:=]\s*([A-E])/i);
    if (explicitAnswerMatch && currentQuestion) {
      currentQuestion.correctAnswer = explicitAnswerMatch[1].toUpperCase() as OptionKey;
      continue;
    }

    // 5. Détection d'une explication
    // Ex: "Explication : ..."
    const explanationMatch = trimmed.match(/^Explication\s*[:=]\s*(.*)/i);
    if (explanationMatch && currentQuestion) {
      currentQuestion.explanation = explanationMatch[1].trim();
      continue;
    }

    // 6. Ligne de continuation (pour question ou option multiligne)
    if (currentOption) {
      currentOption.text = (currentOption.text ? currentOption.text + ' ' : '') + trimmed;
    } else if (currentQuestion) {
      currentQuestion.text = (currentQuestion.text ? currentQuestion.text + ' ' : '') + trimmed;
    }
  }

  // Clôturer le dernier élément
  commitCurrentChapter();

  const allQuestions = chapters.flatMap((c) => c.questions);

  return {
    chapters,
    allQuestions,
    totalQuestions: allQuestions.length,
    warnings
  };
}
