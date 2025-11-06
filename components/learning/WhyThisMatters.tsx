'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { WhyThisMatters as WhyThisMattersType } from '@/types';
import { Quote } from 'lucide-react';

interface WhyThisMattersProps {
  data: WhyThisMattersType;
  onComplete: () => void;
}

export const WhyThisMatters: React.FC<WhyThisMattersProps> = ({ data, onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Why This Matters
            </h2>
            <p className="text-sm text-gray-500">Dr. Joe&apos;s Perspective</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg mb-8">
            <Quote className="w-12 h-12 text-butterfly-purple mb-4" />
            <blockquote className="text-xl text-gray-800 italic mb-4">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
            <p className="text-sm text-gray-600 font-semibold">— {data.author}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              {data.explanation}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points:</h3>
            {data.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-butterfly-purple text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 flex-1">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={onComplete} size="lg" className="ml-auto">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
