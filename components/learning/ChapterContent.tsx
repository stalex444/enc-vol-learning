'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ContentSection } from '@/types';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ChapterContentProps {
  sections: ContentSection[];
  onComplete: () => void;
}

export const ChapterContent: React.FC<ChapterContentProps> = ({ sections, onComplete }) => {
  const renderSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="prose prose-lg max-w-none mb-6">
            {section.title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h3>
            )}
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        );

      case 'list':
        return (
          <div key={index} className="mb-6">
            {section.title && (
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
            )}
            <ul className="space-y-2">
              {(Array.isArray(section.content) ? section.content : [section.content]).map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'callout':
        const icons = {
          info: <Info className="w-6 h-6" />,
          warning: <AlertTriangle className="w-6 h-6" />,
          success: <CheckCircle className="w-6 h-6" />,
          protocol: <AlertCircle className="w-6 h-6" />,
        };

        const colors = {
          info: 'bg-blue-50 border-blue-500 text-blue-900',
          warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
          success: 'bg-green-50 border-green-500 text-green-900',
          protocol: 'bg-red-50 border-red-500 text-red-900',
        };

        const variant = section.variant || 'info';

        return (
          <div key={index} className={`border-l-4 p-6 rounded-r-lg mb-6 ${colors[variant]}`}>
            <div className="flex items-start space-x-3">
              {icons[variant]}
              <div className="flex-1">
                {section.title && (
                  <h4 className="font-bold mb-2">{section.title}</h4>
                )}
                <p>{section.content}</p>
              </div>
            </div>
          </div>
        );

      case 'protocol':
        return (
          <div key={index} className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">
                {section.title || 'Critical Protocol'}
              </h3>
            </div>
            <div className="text-red-900">
              {typeof section.content === 'string' ? (
                <p>{section.content}</p>
              ) : (
                <ol className="list-decimal list-inside space-y-2">
                  {section.content.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="mb-6">
            {section.title && (
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
            )}
            {section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.title || 'Content image'}
                className="w-full rounded-lg shadow-md"
              />
            )}
            {section.content && (
              <p className="text-sm text-gray-600 mt-2 text-center">{section.content}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card variant="elevated">
        <CardContent className="p-8">
          {sections.map((section, index) => renderSection(section, index))}
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
