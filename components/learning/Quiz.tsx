'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Quiz as QuizType } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  data: QuizType;
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = data.questions[currentQuestion];
  const isLastQuestion = currentQuestion === data.questions.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSelectAnswer = (optionId: string) => {
    if (!showFeedback) {
      setSelectedAnswer(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setShowFeedback(true);
    setAnswers([...answers, selectedAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / data.questions.length) * 100);
      onComplete(finalScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="mb-6 flex justify-between items-center">
            <Badge variant="purple">
              Question {currentQuestion + 1} of {data.questions.length}
            </Badge>
            <span className="text-sm text-gray-600">
              Score: {score}/{currentQuestion + (showFeedback && isCorrect ? 1 : 0)}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const showCorrect = showFeedback && option.id === question.correctAnswer;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-butterfly-purple bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{option.text}</span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-blue-50'}`}>
              <p className="text-gray-800">{question.explanation}</p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              size="lg"
              className="ml-auto"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="ml-auto">
              {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
