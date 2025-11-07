'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import welcomeData from '@/content/welcome.json';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full">
              <span className="text-5xl">🦋</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-primary-900 mb-6 tracking-tight">
              {welcomeData.hero.title}
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              {welcomeData.hero.subtitle}
            </p>

            {/* Opening Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto mb-16"
            >
              <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary-100">
                <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-primary-200">"</div>
                <blockquote className="text-lg font-light text-gray-700 italic leading-relaxed relative z-10">
                  {welcomeData.hero.quote.text}
                </blockquote>
                <p className="mt-4 text-primary-700 font-medium">
                  — {welcomeData.hero.quote.author}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-16">
          {welcomeData.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-semibold text-primary-900 mb-6">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Quote */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-primary-100">
              "
            </div>
            <blockquote className="text-2xl font-light text-gray-700 italic leading-relaxed relative z-10">
              {welcomeData.closingQuote.text}
            </blockquote>
            <p className="mt-6 text-primary-700 font-medium">
              — {welcomeData.closingQuote.author}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/learn/01-foundation/01">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium text-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl">
              {welcomeData.callToAction.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="mt-4 text-gray-600">
            {welcomeData.callToAction.description}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
