'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLearningStore } from '@/lib/store';
import { getChapterContent, getNextChapter } from '@/lib/content-loader';
import { ChapterContent } from '@/components/learning/ChapterContent';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';

export default function ChapterPage({
  params,
}: {
  params: { moduleId: string; chapterId: string };
}) {
  const [chapterData, setChapterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const markChapterComplete = useLearningStore((state) => state.markChapterComplete);

  useEffect(() => {
    async function loadChapter() {
      try {
        setLoading(true);
        const content = await getChapterContent(params.moduleId, params.chapterId);
        
        if (!content) {
          setError('Chapter not found');
          return;
        }
        
        setChapterData(content);
      } catch (err) {
        console.error('Error loading chapter:', err);
        setError('Failed to load chapter');
      } finally {
        setLoading(false);
      }
    }

    loadChapter();
  }, [params.moduleId, params.chapterId]);

  const handleChapterComplete = (score: number) => {
    markChapterComplete(params.moduleId, params.chapterId, score);
    
    // Navigate to next chapter or back to modules
    const nextChapter = getNextChapter(params.moduleId, params.chapterId);
    
    if (nextChapter) {
      router.push(`/learn/${nextChapter.moduleId}/${nextChapter.chapterId}`);
    } else {
      // Completed all chapters
      router.push('/learn/complete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {error || 'Chapter Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            This chapter may not be available yet or there was an error loading it.
          </p>
          <button
            onClick={() => router.push('/learn')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white">
      <ChapterContent
        chapter={chapterData}
        onComplete={handleChapterComplete}
        onBack={() => router.push('/learn')}
      />
    </div>
  );
}
