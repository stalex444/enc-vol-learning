'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLearningStore } from '@/lib/store';
import { getChapterContent, getNextChapter } from '@/lib/content-loader';
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
  const [isNavigating, setIsNavigating] = useState(false);
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
    setIsNavigating(true);
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button
            onClick={() => router.push('/')}
            className="hover:text-primary-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => router.push('/learn')}
            className="hover:text-primary-600 transition-colors"
          >
            Modules
          </button>
          <span>/</span>
          <span className="text-primary-700 font-medium">
            {chapterData.title}
          </span>
        </div>

        {/* Chapter Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-primary-900 mb-4">
            {chapterData.title}
          </h1>
          <p className="text-gray-600">
            {chapterData.estimatedTime}
          </p>
          {chapterData.type === 'reference' && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              📚 Quick Reference Guide
            </div>
          )}
        </div>

        {/* Reference/Appendix Content */}
        {chapterData.type === 'reference' && chapterData.content?.sections && (
          <div className="space-y-8 mb-16">
            {chapterData.content.sections.map((section: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Phase 1: Prime - Story & Why This Matters */}
        {chapterData.phase1_prime && (
          <div className="space-y-12 mb-16">
            {/* Breathing Exercise */}
            {chapterData.phase1_prime.breathing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100"
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">🫁</div>
                  <h3 className="text-2xl font-light text-gray-900">
                    {chapterData.phase1_prime.breathing.intro}
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {chapterData.phase1_prime.breathing.instructions}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Story */}
            {chapterData.phase1_prime.story && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-3xl p-8 md:p-12 border border-primary-100"
              >
                <div className="prose prose-lg max-w-none">
                  {chapterData.phase1_prime.story.content.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Why This Matters */}
            {chapterData.phase1_prime.whyThisMatters && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
                  <h2 className="text-3xl font-light text-primary-900">Why This Matters</h2>
                </div>

                {/* Quote */}
                <div className="relative bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                  <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                    🦋
                  </div>
                  <blockquote className="text-xl italic text-gray-700 mb-3 mt-4">
                    "{chapterData.phase1_prime.whyThisMatters.quote}"
                  </blockquote>
                  <p className="text-primary-700 font-medium">
                    — {chapterData.phase1_prime.whyThisMatters.author}
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {chapterData.phase1_prime.whyThisMatters.content.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Learning Objectives */}
                {chapterData.phase1_prime.learningObjectives && (
                  <div className="bg-primary-50/50 rounded-2xl p-8 border border-primary-100">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">
                      In this chapter, you'll learn:
                    </h3>
                    <ul className="space-y-3">
                      {chapterData.phase1_prime.learningObjectives.map((objective: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Phase 2: Immerse - Main Content Sections */}
        {chapterData.phase2_immerse?.sections && (
          <div className="space-y-12 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
              <h2 className="text-3xl font-light text-primary-900">Deep Dive</h2>
            </div>

            {chapterData.phase2_immerse.sections.map((section: any, index: number) => (
              <div key={index} className="space-y-6">
                <h3 className="text-2xl font-light text-primary-900">
                  {section.title}
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.pullQuote && (
                  <div className="my-8 pl-8 border-l-4 border-primary-400">
                    <blockquote className="text-2xl font-light italic text-gray-700 mb-2">
                      "{section.pullQuote.text}"
                    </blockquote>
                    <p className="text-primary-700 font-medium">
                      — {section.pullQuote.author}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Phase 3: Integrate - Quiz (if exists) */}
        {chapterData.phase3_integrate?.quiz && (
          <div className="space-y-8 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
              <h2 className="text-3xl font-light text-primary-900">Practice & Integration</h2>
            </div>

            <p className="text-gray-600 mb-8">
              These scenarios will help you practice applying what you've learned in real situations.
            </p>

            {chapterData.phase3_integrate.quiz.map((question: any, qIndex: number) => (
              <div key={qIndex} className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-700 font-semibold">
                    {qIndex + 1}
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {question.question}
                  </p>
                </div>

                <div className="space-y-3 ml-12">
                  {question.options.map((option: any, oIndex: number) => (
                    <details key={oIndex} className="group">
                      <summary className="cursor-pointer p-4 rounded-xl border-2 border-gray-200 hover:border-primary-200 bg-white transition-all list-none">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-open:border-primary-400 group-open:bg-primary-400 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 group-open:opacity-100" />
                          </div>
                          <span className="text-gray-700">{option.text}</span>
                        </div>
                      </summary>
                      <div className={`mt-3 ml-8 p-4 rounded-xl ${
                        option.isCorrect
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-amber-50 border border-amber-200'
                      }`}>
                        <p className={`text-sm leading-relaxed ${
                          option.isCorrect ? 'text-green-800' : 'text-amber-800'
                        }`}>
                          {option.isCorrect ? '✓ ' : '! '}{option.feedback}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phase 4: Anchor - Summary */}
        {chapterData.phase4_anchor && (
          <div className="space-y-12 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
              <h2 className="text-3xl font-light text-primary-900">Key Takeaways</h2>
            </div>

            {/* Summary Points */}
            {chapterData.phase4_anchor.summary?.keyPoints && (
              <div className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-3xl p-8 md:p-12 border border-primary-100">
                <ul className="space-y-4">
                  {chapterData.phase4_anchor.summary.keyPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0 mt-2" />
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {chapterData.phase4_anchor.summary.integration && (
                  <div className="mt-8 pt-8 border-t border-primary-200">
                    <div className="prose prose-lg max-w-none">
                      {chapterData.phase4_anchor.summary.integration.split('\n\n').map((paragraph: string, i: number) => (
                        <p key={i} className="text-gray-700 leading-relaxed italic mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Closing Quote */}
            {chapterData.phase4_anchor.closingQuote && (
              <div className="text-center py-8">
                <blockquote className="text-2xl font-light italic text-gray-700 mb-4">
                  "{chapterData.phase4_anchor.closingQuote.text}"
                </blockquote>
                <p className="text-primary-700 font-medium">
                  — {chapterData.phase4_anchor.closingQuote.author}
                </p>
              </div>
            )}

            {/* Next Chapter Preview */}
            {chapterData.phase4_anchor.nextChapter && (
              <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-2">Up next</p>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  {chapterData.phase4_anchor.nextChapter.title}
                </h3>
                <p className="text-gray-600">
                  {chapterData.phase4_anchor.nextChapter.preview}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => router.push('/learn')}
            className="px-6 py-3 text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Back to Modules
          </button>
          
          <button
            onClick={() => handleChapterComplete(100)}
            disabled={isNavigating}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isNavigating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading next chapter...
              </>
            ) : (
              <>
                Complete & Continue →
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
