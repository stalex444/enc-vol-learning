'use client';

import React, { useState, useEffect } from 'react';
import { useLearningStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, Copy, Check, Home } from 'lucide-react';

export default function CompletePage() {
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [completionCode, setCompletionCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const progress = useLearningStore((state) => state.progress);

  useEffect(() => {
    // Generate completion code from progress data
    const completedCount = progress.filter(p => p.completed).length;
    const timestamp = new Date().getTime();
    const code = `ENC-${timestamp.toString(36).toUpperCase()}-${completedCount}`;
    setCompletionCode(code);
  }, [progress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  };

  const copyConfirmation = () => {
    const confirmationText = `
ENCEPHALON VOLUNTEER TRAINING - COMPLETION CONFIRMATION

Name: ${volunteerName}
Email: ${volunteerEmail}
Completion Code: ${completionCode}
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${new Date().toLocaleTimeString('en-US')}

All modules completed successfully.
    `.trim();

    navigator.clipboard.writeText(confirmationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {showForm ? (
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  Get Your Completion Confirmation
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your information to generate your completion confirmation code
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={volunteerEmail}
                      onChange={(e) => setVolunteerEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" variant="primary" className="w-full">
                    Generate Confirmation Code
                  </Button>
                </form>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block border-4 border-primary-400 rounded-lg p-8 mb-6 bg-primary-50">
                    <div className="text-6xl mb-4">🦋</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Training Complete!
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      {volunteerName}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <div className="bg-white rounded-lg p-4 border-2 border-primary-300">
                      <p className="text-sm text-gray-600 mb-1">Completion Code</p>
                      <p className="text-2xl font-mono font-bold text-primary-700">
                        {completionCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 border-l-4 border-primary-400 p-6 rounded-r-lg mb-8">
                  <h3 className="font-bold text-gray-900 mb-3">What You've Accomplished:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Completed all training modules</li>
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
                  <Button 
                    size="lg" 
                    variant="primary"
                    onClick={copyConfirmation}
                    className="flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Confirmation
                      </>
                    )}
                  </Button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-white text-primary-700 border-2 border-primary-200 rounded-full font-medium hover:border-primary-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Return Home
                  </button>
                </div>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900 text-center">
                    <strong>Next Step:</strong> Copy your confirmation and send it to{' '}
                    <a href="mailto:crew@encephalon.com" className="underline font-semibold">
                      crew@encephalon.com
                    </a>
                  </p>
                </div>
              </div>
            )}
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
