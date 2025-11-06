import modulesData from '@/content/modules.json';

export interface ChapterContent {
  id: string;
  moduleId: string;
  title: string;
  estimatedTime: string;
  
  phase1_prime: {
    breathing: {
      intro: string;
      instructions: string;
    };
    story: {
      content: string;
    };
    whyThisMatters: {
      quote: string;
      author: string;
      content: string;
    };
    learningObjectives: string[];
  };

  phase2_immerse: {
    sections: Array<{
      title: string;
      content: string;
      pullQuote?: {
        text: string;
        author: string;
      };
    }>;
  };

  phase3_integrate: {
    reflection?: {
      prompt: string;
      placeholder: string;
    };
    quiz: Array<{
      question: string;
      options: Array<{
        text: string;
        isCorrect: boolean;
        feedback: string;
      }>;
    }>;
  };

  phase4_anchor: {
    summary: {
      keyPoints: string[];
      integration: string;
    };
    closingQuote: {
      text: string;
      author: string;
    };
    nextChapter?: {
      title: string;
      preview: string;
    };
  };
}

export async function getChapterContent(
  moduleId: string,
  chapterId: string
): Promise<ChapterContent | null> {
  try {
    const content = await import(
      `@/content/chapters/${moduleId}/${chapterId}.json` 
    );
    return content.default;
  } catch (error) {
    console.error(`Failed to load chapter ${moduleId}/${chapterId}:`, error);
    return null;
  }
}

export function getModules() {
  return modulesData.modules;
}

export function getModule(moduleId: string) {
  return modulesData.modules.find(m => m.id === moduleId);
}

export function getNextChapter(moduleId: string, chapterId: string) {
  const module = getModule(moduleId);
  if (!module) return null;
  
  const currentIndex = module.chapters.findIndex(c => c.id === chapterId);
  if (currentIndex === -1) return null;
  
  // Next chapter in same module
  if (currentIndex < module.chapters.length - 1) {
    return {
      moduleId,
      chapterId: module.chapters[currentIndex + 1].id,
      title: module.chapters[currentIndex + 1].title,
    };
  }
  
  // First chapter of next module
  const moduleIndex = modulesData.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex < modulesData.modules.length - 1) {
    const nextModule = modulesData.modules[moduleIndex + 1];
    return {
      moduleId: nextModule.id,
      chapterId: nextModule.chapters[0].id,
      title: nextModule.chapters[0].title,
    };
  }
  
  // End of all content
  return null;
}
