'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Scenario as ScenarioType } from '@/types';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ScenarioProps {
  data: ScenarioType;
  onComplete: (choiceIds: string[]) => void;
}

export const Scenario: React.FC<ScenarioProps> = ({ data, onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);

  const choice = data.choices.find(c => c.id === selectedChoice);

  const handleSelectChoice = (choiceId: string) => {
    if (!showFeedback) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;
    setShowFeedback(true);
    setChoiceHistory([...choiceHistory, selectedChoice]);
  };

  const handleContinue = () => {
    onComplete([...choiceHistory, selectedChoice!]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h2>
            <p className="text-gray-600">{data.description}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Situation:</h3>
            <p className="text-gray-700">{data.initialSituation}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">What would you do?</h3>
            <div className="space-y-3">
              {data.choices.map((choice) => {
                const isSelected = selectedChoice === choice.id;
                const showOptimal = showFeedback && choice.isOptimal;
                const showSuboptimal = showFeedback && isSelected && !choice.isOptimal;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showOptimal
                        ? 'border-green-500 bg-green-50'
                        : showSuboptimal
                        ? 'border-yellow-500 bg-yellow-50'
                        : isSelected
                        ? 'border-butterfly-purple bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{choice.text}</p>
                      </div>
                      {showOptimal && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                      {showSuboptimal && <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && choice && (
            <div className={`p-6 rounded-lg ${choice.isOptimal ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'}`}>
              <h4 className="font-bold text-gray-900 mb-2">
                {choice.isOptimal ? '✓ Optimal Response' : '⚠ Consider This'}
              </h4>
              <p className="text-gray-800 mb-3">{choice.outcome}</p>
              <p className="text-gray-700 italic">{choice.feedback}</p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedChoice}
              size="lg"
              className="ml-auto"
            >
              Submit Choice
            </Button>
          ) : (
            <Button onClick={handleContinue} size="lg" className="ml-auto">
              Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
