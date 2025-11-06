// Enhanced type definitions for mastery-based learning

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  estimatedTime: string; // e.g., "15 min"
  phase1_prime: PrimePhase;
  phase2_immerse: ImmersePhase;
  phase3_integrate: IntegratePhase;
  phase4_anchor: AnchorPhase;
}

export interface PrimePhase {
  breathing: string; // Guided breathing instruction
  story: string; // Real retreat story hook
  whyThisMatters: string; // Dr. Joe's voice
  learningObjectives: string[];
}

export interface ImmersePhase {
  content: ContentSection[];
  pullQuotes: string[]; // Dr. Joe quotes throughout
}

export interface ContentSection {
  type: 'text' | 'list' | 'callout' | 'protocol' | 'image' | 'video';
  title?: string;
  content: string | string[];
  variant?: 'info' | 'warning' | 'critical' | 'sacred';
  imageUrl?: string;
  videoUrl?: string;
}

export interface IntegratePhase {
  reflections: string[]; // Thought-provoking questions
  quiz?: MasteryQuiz;
  scenario?: BranchingScenario;
}

export interface MasteryQuiz {
  questions: QuizQuestion[];
  passingScore: number; // 85% for critical protocols
  isCritical: boolean; // Requires mastery
  retakeAllowed: boolean;
  feedbackStyle: 'thoughtful' | 'immediate'; // Not just correct/incorrect
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  thoughtfulFeedback: {
    correct: string; // Why this is optimal
    incorrect: string; // What to consider
    deeperInsight: string; // Dr. Joe's perspective
  };
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface BranchingScenario {
  id: string;
  title: string;
  description: string;
  initialSituation: string;
  choices: ScenarioChoice[];
}

export interface ScenarioChoice {
  id: string;
  text: string;
  outcome: string;
  isOptimal: boolean;
  feedback: string;
  nextScenarioId?: string; // For branching paths
  drJoeInsight?: string; // Optional wisdom
}

export interface AnchorPhase {
  summary: string[]; // Key takeaways
  embodimentPractice: string; // How to embody this learning
  nextSteps: string;
  reflectionPrompt: string;
}

export interface UserProgress {
  userId: string;
  completedChapters: string[];
  currentModule: string;
  currentChapter: string;
  masteryScores: Record<string, MasteryScore>; // Chapter ID -> Score
  scenarioChoices: Record<string, string[]>;
  startedAt: Date;
  lastAccessedAt: Date;
  overallMastery: number; // Percentage
}

export interface MasteryScore {
  score: number;
  attempts: number;
  achievedMastery: boolean; // >= 85% on critical content
  completedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  chapters: Chapter[];
  isCritical: boolean; // Requires 85% mastery
}
