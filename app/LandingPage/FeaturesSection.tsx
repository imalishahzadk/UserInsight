'use client';

import { motion } from 'framer-motion';
import {
  EyeIcon,
  MapPinIcon,
  DocumentMagnifyingGlassIcon,
  PlayCircleIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Recover Lost Leads',
    description: 'With built-in popups and forms, capture visitors before they leave.',
    icon: <EyeIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1e1e3a]',
  },
  {
    title: 'Geo Tracking',
    description: 'Know where visitors come from, down to the city.',
    icon: <MapPinIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#2a2a45]',
  },
  {
    title: 'Page Level Insights',
    description: 'See which pages get attention and which ones don’t.',
    icon: <DocumentMagnifyingGlassIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#26263f]',
  },
  {
    title: 'Live Session Views',
    description: 'Replay what real users did on your site in real time.',
    icon: <PlayCircleIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1c1c33]',
  },
  {
    title: 'Instant Lead Alerts',
    description: 'Get notified the moment someone interacts with your site.',
    icon: <BellAlertIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#1f1f3d]',
  },
  {
    title: 'Privacy First',
    description: 'GDPR & CCPA compliant — we never sell or share your data.',
    icon: <ShieldCheckIcon className="h-8 w-8 text-purple-300" />,
    bg: 'bg-[#22223e]',
  },
];

export default function FeaturesSection() {
  return (
<section className="py-24 px-6 md:px-12 text-white">
  <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
    {/* Text Block */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center lg:text-left space-y-6 order-1 lg:order-none"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        Powerful Features for Smarter Decisions
      </h2>
      <p className="text-gray-300 text-md leading-relaxed max-w-md mx-auto lg:mx-0">
        From session replays to geo tracking — UserInsight gives you everything you need to
        analyze visitors, capture leads, and act fast.
      </p>
      <button className="mt-4 border cursor-pointer border-purple-500 text-purple-300 hover:text-white hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] px-5 py-2 rounded-xl transition-all">
        Explore All Features
      </button>
    </motion.div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-none">
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
  </div>
</section>

  );
}
