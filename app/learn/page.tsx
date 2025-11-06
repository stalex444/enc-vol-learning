'use client';

import { useLearningStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';

// Import modules from JSON
import modulesData from '@/content/modules.json';

const modules = modulesData.modules.map(module => ({
  id: module.id,
  title: module.title,
  description: module.description,
  chapters: module.chapters.length,
  estimatedTime: module.estimatedTime,
  color: module.color,
}));

export default function HomePage() {
  const getTotalProgress = useLearningStore((state) => state.getTotalProgress);
  const progress = getTotalProgress();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Intentionally spacious */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          {/* Subtle animated background element */}
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Simple, elegant icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full">
              <span className="text-4xl">🦋</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-primary-900 mb-6 tracking-tight">
              Welcome to Your
              <br />
              <span className="font-semibold">Sacred Preparation</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              You're about to step into one of the most profound roles of service.
              This preparation will ensure you're ready to hold space with
              clarity, compassion, and confidence.
            </p>

            {/* Progress indicator - only show if started */}
            {progress > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-primary-100"
              >
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-medium text-primary-700">
                  {Math.round(progress)}% complete
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Modules Section - Clean, scannable */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-primary-900 mb-2">
            Your Learning Path
          </h2>
          <p className="text-gray-600 mb-12">
            Four core modules plus quick reference materials—designed for mastery, not just completion
          </p>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quote Section - Breathing room */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-primary-100">
              "
            </div>
            <blockquote className="text-2xl font-light text-gray-700 italic leading-relaxed relative z-10">
              You can't wait for healing to feel whole.
              You have to feel whole for healing to begin.
            </blockquote>
            <p className="mt-6 text-primary-700 font-medium">
              — Dr. Joe Dispenza
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Module Card Component - Refined, tactile
function ModuleCard({ module, index }: { module: any; index: number }) {
  const getModuleProgress = useLearningStore((state) => state.getModuleProgress);
  const moduleProgress = getModuleProgress(module.id);
  const isStarted = moduleProgress > 0;
  const isComplete = moduleProgress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/learn/${module.id}/01`}>
        <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
          {/* Colored accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.color}`} />
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Module {index + 1}
                  </span>
                  {isComplete && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Complete
                    </span>
                  )}
                  {isStarted && !isComplete && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                      <Circle className="w-3 h-3 fill-current" />
                      In Progress
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {module.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{module.chapters} chapters</span>
                  <span>•</span>
                  <span>{module.estimatedTime}</span>
                </div>
              </div>
              
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
            </div>

            {/* Progress bar - subtle, only if started */}
            {isStarted && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-primary-700">
                    {Math.round(moduleProgress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${module.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
