'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BREATH_PHASES = [
  { phase: 'inhale', duration: 5000, instruction: 'Inhale' },
  { phase: 'hold', duration: 5000, instruction: 'Hold' },
  { phase: 'exhale', duration: 5000, instruction: 'Exhale' },
] as const;

export function BreathingExercise({ onComplete }: { onComplete: () => void }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const totalCycles = 3;

  useEffect(() => {
    if (!isActive) return;

    const phase = BREATH_PHASES[currentPhase];
    const timer = setTimeout(() => {
      const nextPhase = (currentPhase + 1) % BREATH_PHASES.length;
      
      if (nextPhase === 0) {
        const nextCycle = cycleCount + 1;
        if (nextCycle >= totalCycles) {
          onComplete();
          return;
        }
        setCycleCount(nextCycle);
      }
      
      setCurrentPhase(nextPhase);
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [currentPhase, cycleCount, isActive, onComplete]);

  const currentInstruction = BREATH_PHASES[currentPhase];

  return (
    <div className="relative w-full max-w-2xl mx-auto py-16">
      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h3 className="text-2xl font-light text-primary-900 mb-4">
              Before You Begin
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
              Let's arrive together. Take a moment to settle into your body,
              feel your presence. Three coherent breaths to center yourself.
            </p>
            <button
              onClick={() => setIsActive(true)}
              className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Begin
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            {/* Breathing Circle - The centerpiece */}
            <div className="relative w-48 h-48 mx-auto mb-12">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/20"
                animate={{
                  scale: currentInstruction.phase === 'inhale' ? 1.2 : 
                         currentInstruction.phase === 'hold' ? 1.2 : 1,
                }}
                transition={{
                  duration: currentInstruction.duration / 1000,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main breathing circle */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-2xl flex items-center justify-center"
                animate={{
                  scale: currentInstruction.phase === 'inhale' ? 1.1 : 
                         currentInstruction.phase === 'hold' ? 1.1 : 0.9,
                }}
                transition={{
                  duration: currentInstruction.duration / 1000,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-4xl">🦋</span>
              </motion.div>
            </div>

            {/* Instruction Text */}
            <motion.div
              key={currentInstruction.instruction}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-3xl font-light text-primary-900 mb-2">
                {currentInstruction.instruction}
              </p>
              <p className="text-sm text-gray-500">
                {currentInstruction.duration / 1000} seconds
              </p>
            </motion.div>

            {/* Progress indicator */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalCycles }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i < cycleCount ? 'bg-primary-600' :
                    i === cycleCount ? 'bg-primary-400' :
                    'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Cycle {cycleCount + 1} of {totalCycles}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
