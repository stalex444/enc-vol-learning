// Core types for the Encephalon Learning Platform

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapters: Chapter[];
  order: number;
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  estimatedTime: number; // in minutes
  phases: ChapterPhase[];
}

export interface ChapterPhase {
  type: 'breathing' | 'story' | 'content' | 'why' | 'quiz' | 'scenario' | 'summary';
  data: any;
}

export interface BreathingExercise {
  duration: number; // in seconds
  instruction: string;
  guidedText: string[];
}

export interface StoryHook {
  title: string;
  story: string;
  image?: string;
  reflection: string;
}

export interface WhyThisMatters {
  quote: string;
  author: string;
  explanation: string;
  keyPoints: string[];
}

export interface ContentSection {
  type: 'text' | 'list' | 'callout' | 'protocol' | 'image';
  content: string | string[];
  title?: string;
  variant?: 'info' | 'warning' | 'success' | 'protocol';
  imageUrl?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface Scenario {
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
  nextScenarioId?: string;
}

export interface ChapterSummary {
  keyTakeaways: string[];
  reflectionPrompt: string;
  nextSteps: string;
}

export interface Protocol {
  id: string;
  title: string;
  category: 'medical' | 'safety' | 'communication';
  steps: ProtocolStep[];
  criticalNotes: string[];
}

export interface ProtocolStep {
  order: number;
  instruction: string;
  details?: string;
  warning?: string;
}

export interface UserProgress {
  userId: string;
  completedChapters: string[];
  currentModule: string;
  currentChapter: string;
  quizScores: Record<string, number>;
  scenarioChoices: Record<string, string[]>;
  startedAt: Date;
  lastAccessedAt: Date;
}

export interface DrJoeQuote {
  id: string;
  text: string;
  context: string;
  category: 'meditation' | 'healing' | 'transformation' | 'community';
}
