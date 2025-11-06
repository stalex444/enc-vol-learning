import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChapterProgress {
  moduleId: string;
  chapterId: string;
  completed: boolean;
  quizScore?: number;
  lastAccessed: string;
}

interface LearningStore {
  progress: ChapterProgress[];
  currentModule: string | null;
  
  // Actions
  markChapterComplete: (moduleId: string, chapterId: string, quizScore?: number) => void;
  setCurrentModule: (moduleId: string) => void;
  getModuleProgress: (moduleId: string) => number;
  getTotalProgress: () => number;
  isChapterComplete: (moduleId: string, chapterId: string) => boolean;
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      progress: [],
      currentModule: null,

      markChapterComplete: (moduleId, chapterId, quizScore) => {
        set((state) => {
          const existingIndex = state.progress.findIndex(
            (p) => p.moduleId === moduleId && p.chapterId === chapterId
          );

          const newProgress = [...state.progress];
          
          if (existingIndex >= 0) {
            newProgress[existingIndex] = {
              ...newProgress[existingIndex],
              completed: true,
              quizScore,
              lastAccessed: new Date().toISOString(),
            };
          } else {
            newProgress.push({
              moduleId,
              chapterId,
              completed: true,
              quizScore,
              lastAccessed: new Date().toISOString(),
            });
          }

          return { progress: newProgress };
        });
      },

      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),

      getModuleProgress: (moduleId) => {
        const state = get();
        const moduleChapters = state.progress.filter(
          (p) => p.moduleId === moduleId
        );
        const completed = moduleChapters.filter((p) => p.completed).length;
        return moduleChapters.length > 0 ? (completed / moduleChapters.length) * 100 : 0;
      },

      getTotalProgress: () => {
        const state = get();
        if (state.progress.length === 0) return 0;
        const completed = state.progress.filter((p) => p.completed).length;
        return (completed / state.progress.length) * 100;
      },

      isChapterComplete: (moduleId, chapterId) => {
        const state = get();
        const chapter = state.progress.find(
          (p) => p.moduleId === moduleId && p.chapterId === chapterId
        );
        return chapter?.completed || false;
      },
    }),
    {
      name: 'encephalon-learning-storage',
    }
  )
);
