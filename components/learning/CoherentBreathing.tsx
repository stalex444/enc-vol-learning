'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface CoherentBreathingProps {
  instruction: string;
  duration?: number; // Total duration in seconds
  onComplete: () => void;
}

const BREATH_CYCLE = 6; // 6 seconds per full cycle (coherent breathing)
const INHALE_TIME = 3; // 3 seconds inhale
const EXHALE_TIME = 3; // 3 seconds exhale

export const CoherentBreathing: React.FC<CoherentBreathingProps> = ({
  instruction,
  duration = 60,
  onComplete,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycleProgress, setCycleProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const cycleInterval = setInterval(() => {
      setCycleProgress((prev) => {
        const newProgress = (prev + 0.1) % BREATH_CYCLE;
        
        // Switch phase at halfway point
        if (newProgress < INHALE_TIME) {
          setBreathPhase('inhale');
        } else {
          setBreathPhase('exhale');
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(cycleInterval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(duration);
    setCycleProgress(0);
    setBreathPhase('inhale');
  };

  const handleSkip = () => {
    onComplete();
  };

  const breathingGuide = breathPhase === 'inhale' 
    ? 'Breathe in through your nose...' 
    : 'Breathe out through your mouth...';

  const scale = breathPhase === 'inhale' 
    ? 1 + (cycleProgress / INHALE_TIME) * 0.3 
    : 1.3 - ((cycleProgress - INHALE_TIME) / EXHALE_TIME) * 0.3;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-500 to-sacred-violet p-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-center"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Coherent Breathing
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {instruction}
            </p>
          </div>

          {!isActive && timeLeft === duration ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="relative w-48 h-48 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-sacred-violet rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🌬️</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  6-second breathing cycles • {Math.floor(duration / 60)} minute{duration >= 120 ? 's' : ''}
                </p>
                <Button onClick={handleStart} size="lg" className="mx-auto min-w-[200px]">
                  Begin Practice
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="sm">
                  Skip to content
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Breathing Circle */}
              <div className="relative w-64 h-64 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 via-sacred-violet to-sacred-gold rounded-full shadow-2xl"
                  animate={{
                    scale: scale,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={breathPhase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-white"
                    >
                      <p className="text-2xl font-semibold mb-2 capitalize">
                        {breathPhase}
                      </p>
                      <p className="text-5xl font-bold">
                        {Math.ceil(breathPhase === 'inhale' 
                          ? INHALE_TIME - cycleProgress 
                          : BREATH_CYCLE - cycleProgress
                        )}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Guidance Text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={breathPhase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl text-gray-700 font-light min-h-[60px] flex items-center justify-center"
                >
                  {breathingGuide}
                </motion.p>
              </AnimatePresence>

              {/* Time Remaining */}
              <div className="text-sm text-gray-500">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} remaining
              </div>

              {timeLeft === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button onClick={onComplete} size="lg" className="mx-auto">
                    Continue to Learning
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
