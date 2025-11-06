'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ChapterSummary as ChapterSummaryType } from '@/types';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ChapterSummaryProps {
  data: ChapterSummaryType;
  onComplete: () => void;
}

export const ChapterSummary: React.FC<ChapterSummaryProps> = ({ data, onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Chapter Complete!</h2>
            <p className="text-gray-600">Great work! Let&apos;s review what you&apos;ve learned.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways:</h3>
            <div className="space-y-3">
              {data.keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start space-x-3 bg-purple-50 p-4 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-butterfly-purple text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 flex-1">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Reflection Moment</h3>
            <p className="text-gray-700 italic mb-4">{data.reflectionPrompt}</p>
            <p className="text-sm text-gray-600">
              Take a moment to consider this before moving forward.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-butterfly-blue p-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-2">Next Steps:</h3>
            <p className="text-gray-800">{data.nextSteps}</p>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={onComplete} size="lg" className="ml-auto">
            Continue to Next Chapter <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
