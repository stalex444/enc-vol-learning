'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, Download, Home } from 'lucide-react';

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-gold-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card variant="elevated" className="overflow-hidden">
          <div className="bg-gradient-to-r from-butterfly-purple via-butterfly-blue to-butterfly-gold p-8 text-white text-center">
            <Award className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Congratulations!</h1>
            <p className="text-xl opacity-90">You've completed your Encephalon Crew Training</p>
          </div>
          
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <div className="inline-block border-4 border-butterfly-purple rounded-lg p-8 mb-6">
                <div className="text-6xl mb-4">🦋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Certificate of Completion
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  This certifies that
                </p>
                <p className="text-3xl font-bold text-butterfly-purple mb-4">
                  [Your Name]
                </p>
                <p className="text-gray-700 mb-2">
                  has successfully completed the
                </p>
                <p className="text-xl font-semibold text-gray-900 mb-4">
                  Encephalon Crew Training Program
                </p>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-butterfly-purple p-6 rounded-r-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-3">What You've Accomplished:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Completed 5 comprehensive training modules</li>
                <li>✓ Learned critical safety and communication protocols</li>
                <li>✓ Practiced real-world scenarios and decision-making</li>
                <li>✓ Embodied the principles of conscious service</li>
                <li>✓ Prepared to hold space for transformation</li>
              </ul>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 italic mb-4">
                "You are now ready to serve as a guardian of sacred space, holding presence 
                and compassion for all who walk through the doors of transformation."
              </p>
              <p className="text-gray-600">— The Encephalon Team</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </Button>
              <Link href="/">
                <Button size="lg" variant="outline">
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:crew@encephalon.com" className="text-butterfly-purple hover:underline">
              crew@encephalon.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
