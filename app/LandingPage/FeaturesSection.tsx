'use client';

import { motion } from 'framer-motion';
import {
  CursorArrowRaysIcon,
  ChartBarIcon,
  EnvelopeIcon,
  SparklesIcon,
  GlobeAltIcon,
  RectangleStackIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Real-time Behavior Analytics',
    description: 'Track sessions, clicks, top pages, bounce rate, and more',
    icon: <ChartBarIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1e1e3a]',
  },
  {
    title: 'Lead Capture Popups',
    description: 'Convert visitors using built-in forms, no external tools needed',
    icon: <EnvelopeIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#2a2a45]',
  },
  {
    title: 'Location & Device Insights',
    description: 'See where users are from and what devices they use',
    icon: <GlobeAltIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#26263f]',
  },
  {
    title: 'Clean Dashboard',
    description: 'Understand your data at a glance',
    icon: <RectangleStackIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1c1c33]',
  },
  {
    title: 'Simple Setup',
    description: 'Just copy one script and you’re ready',
    icon: <SparklesIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1f1f3d]',
  },
  {
    title: 'Flexible Integrations',
    description: 'Connect with CRMs, Zapier, and more',
    icon: <PuzzlePieceIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#22223e]',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-6 flex flex-col items-start text-left shadow-md ${feature.bg}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-md font-semibold text-purple-200">{feature.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-400">
            Powerful Features for Smarter Decisions
          </h2>
          <p className="text-gray-300 text-md leading-relaxed max-w-md mx-auto lg:mx-0">
            From user session tracking to lead generation — UserInsight equips you with everything you need to analyze, convert, and grow with confidence.
          </p>
          <button className="mt-4 border border-purple-500 text-purple-300 hover:text-white hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] px-5 py-2 rounded-xl transition-all">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
}
