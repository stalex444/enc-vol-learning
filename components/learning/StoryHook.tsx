'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { StoryHook as StoryHookType } from '@/types';

interface StoryHookProps {
  data: StoryHookType;
  onComplete: () => void;
}

export const StoryHook: React.FC<StoryHookProps> = ({ data, onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
          </div>

          {data.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={data.image} 
                alt={data.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.story}
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-butterfly-purple p-6 rounded-r-lg">
            <p className="text-gray-800 italic">
              {data.reflection}
            </p>
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
