import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function calculateProgress(completed: string[], total: number): number {
  return Math.round((completed.length / total) * 100);
}

export function getNextChapter(
  currentModuleId: string,
  currentChapterId: string,
  modules: any[]
): { moduleId: string; chapterId: string } | null {
  const currentModule = modules.find(m => m.id === currentModuleId);
  if (!currentModule) return null;

  const currentChapterIndex = currentModule.chapters.findIndex(
    (c: any) => c.id === currentChapterId
  );

  // Next chapter in same module
  if (currentChapterIndex < currentModule.chapters.length - 1) {
    return {
      moduleId: currentModuleId,
      chapterId: currentModule.chapters[currentChapterIndex + 1].id,
    };
  }

  // First chapter of next module
  const currentModuleIndex = modules.findIndex(m => m.id === currentModuleId);
  if (currentModuleIndex < modules.length - 1) {
    const nextModule = modules[currentModuleIndex + 1];
    return {
      moduleId: nextModule.id,
      chapterId: nextModule.chapters[0].id,
    };
  }

  return null;
}
