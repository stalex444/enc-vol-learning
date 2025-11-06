'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLearningStore } from '@/lib/store';
import { BreathingExercise } from '@/components/learning/BreathingExercise';
import { ChevronLeft, ChevronRight, CheckCircle2, Construction } from 'lucide-react';

// Module information
const MODULE_INFO: Record<string, { title: string; available: boolean }> = {
  '01-foundation': { title: 'Foundation & Sacred Responsibility', available: true },
  '02-communication': { title: 'Communication & Protocols', available: false },
  '03-participant-care': { title: 'Participant Care & Support', available: false },
  '04-event-operations': { title: 'Event Operations & Logistics', available: false },
  '05-embodiment': { title: 'Embodiment & Integration', available: false },
};

// Sample chapter content - in production this would come from JSON files
const SAMPLE_CHAPTER = {
  id: '01-welcome',
  moduleId: '01-foundation',
  title: 'Welcome & Sacred Responsibility',
  estimatedTime: '15 min',
  
  phase1_prime: {
    story: `It was Day 3, just after lunch. Sarah, a first-time volunteer, noticed a participant sitting alone outside the ballroom, tears streaming down her face. Sarah's heart raced. She wanted to help but suddenly felt paralyzed.

"Should I approach? Should I call someone? What if I make it worse?"

She stood there for 30 seconds, frozen—until she remembered her training. She took three breaths. Felt her feet on the ground. Made the decision from coherence, not fear.

She approached gently: "I notice you're having a difficult time. Would some company help?"

The participant looked up, relief flooding her face. "Yes. Thank you for seeing me."

That moment of groundedness—that's what this training gives you.`,
    whyThisMatters: {
      quote: "Your presence alone can change the energy in a room.",
      author: "Dr. Joe Dispenza",
      content: `When you volunteer at a Dr. Joe Dispenza retreat, you're not just supporting logistics. You're holding space for transformation. You're part of the container that allows thousands of people to do some of the most vulnerable, courageous work of their lives.

Participants come carrying burdens you may never see—terminal diagnoses, devastating loss, years of trauma. They're here to break through. To heal. To become new.

And you? You're the steady presence. The calm in the storm. The person who knows what to do when someone is overwhelmed, when energy is moving, when the unexpected happens.

This isn't about being perfect. It's about being prepared. About knowing the protocols so deeply that when pressure comes, you can respond from coherence, not panic.

Because as we know from the work: when you're in coherence, you become an organizing force for the field.`
    },
    learningObjectives: [
      "Understand the depth and sacredness of volunteer service",
      "Recognize your role in holding the energetic container",
      "Know the core principles that guide all volunteer actions",
      "Feel prepared, not anxious, about the responsibility ahead"
    ]
  },

  phase2_immerse: {
    sections: [
      {
        title: "The Sacred Container",
        content: `Dr. Joe often speaks about "the monastery"—the sacred space we create together. As a volunteer, you are a guardian of that space.

Every interaction matters. Every decision ripples through the field. When you show up grounded, present, and clear, participants feel safe. When you're flustered or scattered, they sense it.

This is why preparation isn't optional. Why protocols exist. Why we ask you to embody the work, not just understand it.`,
        pullQuote: {
          text: "When we give from the heart, we're in alignment with the divine. And in that state, we become more of who we truly are.",
          author: "Dr. Joe Dispenza"
        }
      },
      {
        title: "What Service Means Here",
        content: `Service at these retreats is different from other volunteer experiences. You're not just helping—you're holding.

You hold space when someone is crying and can't speak.
You hold boundaries when someone tries to approach Dr. Joe during teaching.
You hold coherence when chaos erupts around you.
You hold confidentiality about everything you see and hear.

This requires something beyond good intentions. It requires:
- Deep familiarity with protocols
- Trust in your own nervous system
- Willingness to act with authority when needed
- Humility to ask for help when you're unsure

We're not looking for perfect people. We're looking for present people. People willing to show up, again and again, from their hearts.`
      },
      {
        title: "The Volunteer Agreements",
        content: `These aren't rules to constrain you—they're principles to empower you.

**Confidentiality**: Everything you witness stays within this container. Participants' vulnerability, their breakthroughs, their struggles—all sacred. Dr. Joe's teachings, the event flow, behind-the-scenes operations—all protected. This isn't about secrecy. It's about safety.

**Respect for Dr. Joe's Space**: He holds the energy for the entire event. Every teaching, every meditation, every moment. To do this, he maintains strong boundaries. No photos, no personal requests, no hallway conversations unless he initiates. This preserves his capacity to serve at the highest level.

**Embodying the Work**: You can't ask participants to be present while you're scattered. Can't hold space for emotion while you're drowning in your own. Can't guide others to coherence while you're in survival mode. You lead by example. Always.`
      }
    ]
  },

  phase3_integrate: {
    quiz: [
      {
        question: "A participant approaches you in tears, asking to speak with Dr. Joe about a personal healing. What's your response?",
        options: [
          {
            text: "Tell them Dr. Joe doesn't take personal requests and suggest they submit through the website",
            isCorrect: true,
            feedback: "Exactly right. You're honoring Dr. Joe's boundaries with kindness. You might add: 'I understand this is important to you. The website has a process for personal messages, and Customer Care can help guide you.' You're being clear and compassionate."
          },
          {
            text: "Bring them to Dr. Joe during the break and explain the situation",
            isCorrect: false,
            feedback: "This puts Dr. Joe in a difficult position and crosses the boundary we're here to protect. Remember: he maintains these boundaries to preserve his energy for teaching. The kind response is to explain the process and direct them to Customer Care."
          },
          {
            text: "Take their message and promise to deliver it to Dr. Joe personally",
            isCorrect: false,
            feedback: "While your heart is in the right place, this bypasses the established protocol and creates an expectation you can't fulfill. The proper channel is through the website or Customer Care—that ensures everyone is treated fairly."
          },
          {
            text: "Tell them you're not allowed to help and walk away",
            isCorrect: false,
            feedback: "The words might be technically correct, but the energy is all wrong. We're here to serve with heart. A better approach: 'I understand this matters deeply to you. Let me walk you to Customer Care—they can help you submit your message through the proper channel.'"
          }
        ]
      },
      {
        question: "Your friend from home asks what happens during the meditations and if there are any 'crazy stories' you can share. How do you respond?",
        options: [
          {
            text: "Share general information about the event but keep specific participant stories confidential",
            isCorrect: true,
            feedback: "Well done. You can share your own experience and general observations without violating anyone's privacy. You might say: 'The meditations are profound. I witnessed deep transformation, but the specific stories aren't mine to tell. What I can say is: it changed me too.'"
          },
          {
            text: "Tell them about a powerful moment but change the person's name to protect their identity",
            isCorrect: false,
            feedback: "Changing names doesn't make it okay. The participant's story isn't yours to share, even anonymously. These moments are sacred. What you witnessed in that container stays in that container. You can share about your own experience—that's always yours to tell."
          },
          {
            text: "Explain that everything is confidential and you can't discuss any specifics",
            isCorrect: true,
            feedback: "Perfect. Clear, firm, and kind. Confidentiality isn't negotiable—not even for close friends. You're protecting the sacred space and honoring every person's vulnerability. This is integrity."
          },
          {
            text: "Share stories but only with people you trust completely",
            isCorrect: false,
            feedback: "Trust isn't the issue—consent is. No participant gave permission for their story to be shared outside the event, no matter who you're telling. This is a non-negotiable boundary. The retreat is a sanctuary, and you're the guardian of what happens within it."
          }
        ]
      }
    ]
  },

  phase4_anchor: {
    summary: {
      keyPoints: [
        "You're not just supporting an event—you're holding sacred space for transformation",
        "Confidentiality protects the container and honors every participant's vulnerability",
        "Dr. Joe's boundaries exist to preserve his capacity to serve at the highest level",
        "You lead by example—embodying presence, coherence, and groundedness",
        "Protocols aren't restrictions—they're tools that empower you to act with clarity"
      ],
      integration: "Take a moment. Feel what you've just absorbed. This isn't just information—it's an invitation into a way of being. When you show up at the retreat, you'll carry this with you: the understanding that your presence matters, your groundedness serves, and your commitment to these principles creates safety for everyone."
    },
    closingQuote: {
      text: "Let's lead by example. Let's love like never before. Let's serve as the elevated beings we are becoming.",
      author: "Dr. Joe Dispenza"
    },
    nextChapter: {
      title: "Communication Protocols",
      preview: "Understanding who to call, when to call, and how to request assistance with clarity"
    }
  }
};

export default function ChapterPage({
  params,
}: {
  params: { moduleId: string; chapterId: string };
}) {
  const [currentPhase, setCurrentPhase] = useState<'breathing' | 'prime' | 'immerse' | 'integrate' | 'anchor'>('breathing');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const router = useRouter();
  const markChapterComplete = useLearningStore((state) => state.markChapterComplete);

  const handleBreathingComplete = () => {
    setCurrentPhase('prime');
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correctAnswers = SAMPLE_CHAPTER.phase3_integrate.quiz.filter(
      (q, index) => q.options[quizAnswers[index]]?.isCorrect
    ).length;
    const score = (correctAnswers / SAMPLE_CHAPTER.phase3_integrate.quiz.length) * 100;
    
    if (score >= 80) {
      markChapterComplete(params.moduleId, params.chapterId, score);
    }
  };

  const handleNext = () => {
    router.push('/');
  };

  // Check if module is available
  const moduleInfo = MODULE_INFO[params.moduleId];
  const isModuleAvailable = moduleInfo?.available ?? false;
  const moduleTitle = moduleInfo?.title ?? 'Module';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button
            onClick={() => router.push('/')}
            className="hover:text-primary-600 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-700 font-medium">
            {isModuleAvailable ? SAMPLE_CHAPTER.title : moduleTitle}
          </span>
        </div>

        {/* Coming Soon for unavailable modules */}
        {!isModuleAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-8"
            >
              <Construction className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-light text-primary-900 mb-4">
              Coming Soon
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {moduleTitle}
            </p>

            <div className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-3xl p-12 border border-primary-100 max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                This module is currently under development. We're crafting content that honors the depth and sacredness of this work.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In the meantime, you can explore the available modules or return to the homepage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Home
              </button>
              
              {params.moduleId !== '01-foundation' && (
                <button
                  onClick={() => router.push('/learn/01-foundation/01')}
                  className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-full font-medium hover:border-primary-400 transition-all duration-300 hover:scale-105"
                >
                  Start with Module 1
                </button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-16 pt-8 border-t border-primary-100">
              <p className="text-sm text-gray-500 mb-4">Module Development Progress</p>
              <div className="flex items-center justify-center gap-3">
                {Object.entries(MODULE_INFO).map(([id, info]) => (
                  <div
                    key={id}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      info.available ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={info.title}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                1 of 5 modules available
              </p>
            </div>
          </motion.div>
        )}

        {/* Full chapter content for available modules */}
        {isModuleAvailable && (

        <AnimatePresence mode="wait">
          {/* Phase: Breathing Exercise */}
          {currentPhase === 'breathing' && (
            <motion.div
              key="breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BreathingExercise onComplete={handleBreathingComplete} />
            </motion.div>
          )}

          {/* Phase: Prime - Story + Why This Matters */}
          {currentPhase === 'prime' && (
            <motion.div
              key="prime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Title section */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl font-light text-primary-900 mb-4">
                    {SAMPLE_CHAPTER.title}
                  </h1>
                  <p className="text-gray-600">
                    Estimated time: {SAMPLE_CHAPTER.estimatedTime}
                  </p>
                </motion.div>
              </div>

              {/* Story Hook */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-3xl p-12 border border-primary-100"
              >
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {SAMPLE_CHAPTER.phase1_prime.story.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Why This Matters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
                  <h2 className="text-3xl font-light text-primary-900">
                    Why This Matters
                  </h2>
                </div>

                {/* Dr. Joe Quote */}
                <div className="relative bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                  <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                    🦋
                  </div>
                  <blockquote className="text-xl italic text-gray-700 mb-3 mt-4">
                    "{SAMPLE_CHAPTER.phase1_prime.whyThisMatters.quote}"
                  </blockquote>
                  <p className="text-primary-700 font-medium">
                    — {SAMPLE_CHAPTER.phase1_prime.whyThisMatters.author}
                  </p>
                </div>

                {/* Main content */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  {SAMPLE_CHAPTER.phase1_prime.whyThisMatters.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Learning Objectives */}
                <div className="bg-primary-50/50 rounded-2xl p-8 border border-primary-100">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">
                    In this chapter, you'll learn:
                  </h3>
                  <ul className="space-y-3">
                    {SAMPLE_CHAPTER.phase1_prime.learningObjectives.map((objective, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Continue button */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setCurrentPhase('immerse')}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Ready to dive deeper
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase: Immerse - Main Content */}
          {currentPhase === 'immerse' && (
            <motion.div
              key="immerse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {SAMPLE_CHAPTER.phase2_immerse.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-light text-primary-900">
                    {section.title}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.pullQuote && (
                    <div className="my-12 pl-8 border-l-4 border-primary-400">
                      <blockquote className="text-2xl font-light italic text-gray-700 mb-2">
                        "{section.pullQuote.text}"
                      </blockquote>
                      <p className="text-primary-700 font-medium">
                        — {section.pullQuote.author}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Continue button */}
              <div className="flex justify-center pt-8 border-t border-primary-100">
                <button
                  onClick={() => setCurrentPhase('integrate')}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Continue to practice
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase: Integrate - Quiz */}
          {currentPhase === 'integrate' && (
            <motion.div
              key="integrate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-3xl font-light text-primary-900 mb-4">
                  Let's integrate what you've learned
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These scenarios will help you practice applying the principles
                  in real situations you'll encounter.
                </p>
              </div>

              {/* Quiz */}
              <div className="space-y-8">
                {SAMPLE_CHAPTER.phase3_integrate.quiz.map((question, qIndex) => (
                  <div
                    key={qIndex}
                    className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-700 font-semibold">
                        {qIndex + 1}
                      </div>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {question.question}
                      </p>
                    </div>

                    <div className="space-y-3 ml-12">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[qIndex] === oIndex;
                        const showFeedback = quizSubmitted && isSelected;
                        
                        return (
                          <div key={oIndex}>
                            <button
                              onClick={() => !quizSubmitted && setQuizAnswers(prev => ({
                                ...prev,
                                [qIndex]: oIndex
                              }))}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                isSelected
                                  ? 'border-primary-400 bg-primary-50'
                                  : 'border-gray-200 hover:border-primary-200 bg-white'
                              } ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? 'border-primary-400 bg-primary-400'
                                    : 'border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span className="text-gray-700">{option.text}</span>
                              </div>
                            </button>

                            {showFeedback && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`mt-3 ml-8 p-4 rounded-xl ${
                                  option.isCorrect
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-amber-50 border border-amber-200'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  {option.isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="text-amber-600 text-xs">!</span>
                                    </div>
                                  )}
                                  <p className={`text-sm leading-relaxed ${
                                    option.isCorrect ? 'text-green-800' : 'text-amber-800'
                                  }`}>
                                    {option.feedback}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit button */}
              {!quizSubmitted && (
                <div className="flex justify-center">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < SAMPLE_CHAPTER.phase3_integrate.quiz.length}
                    className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Check my answers
                  </button>
                </div>
              )}

              {/* Continue to anchor after quiz */}
              {quizSubmitted && (
                <div className="flex justify-center pt-8 border-t border-primary-100">
                  <button
                    onClick={() => setCurrentPhase('anchor')}
                    className="group px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Phase: Anchor - Summary */}
          {currentPhase === 'anchor' && (
            <motion.div
              key="anchor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-light text-primary-900 mb-4">
                  Chapter Complete
                </h2>
                <p className="text-gray-600">
                  Take a moment to let this integrate
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-3xl p-12 border border-primary-100">
                <h3 className="text-2xl font-light text-primary-900 mb-6">
                  Key Takeaways
                </h3>
                <ul className="space-y-4">
                  {SAMPLE_CHAPTER.phase4_anchor.summary.keyPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0 mt-2" />
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-primary-200">
                  <p className="text-gray-700 leading-relaxed italic">
                    {SAMPLE_CHAPTER.phase4_anchor.summary.integration}
                  </p>
                </div>
              </div>

              {/* Closing Quote */}
              <div className="text-center py-12">
                <blockquote className="text-2xl font-light italic text-gray-700 mb-4">
                  "{SAMPLE_CHAPTER.phase4_anchor.closingQuote.text}"
                </blockquote>
                <p className="text-primary-700 font-medium">
                  — {SAMPLE_CHAPTER.phase4_anchor.closingQuote.author}
                </p>
              </div>

              {/* Next Chapter Preview */}
              <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Up next</p>
                    <h3 className="text-xl font-semibold text-primary-900 mb-1">
                      {SAMPLE_CHAPTER.phase4_anchor.nextChapter.title}
                    </h3>
                    <p className="text-gray-600">
                      {SAMPLE_CHAPTER.phase4_anchor.nextChapter.preview}
                    </p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="group px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 ml-6 flex-shrink-0"
                  >
                    Back to Home
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>
    </div>
  );
}
