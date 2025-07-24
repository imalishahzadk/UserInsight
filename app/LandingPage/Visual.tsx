'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    title: 'Tell Us About Your Site',
    description: 'Just sign up and give access — that’s it. We’ll handle the rest.',
    image: '/images/step1.png',
  },
  {
    title: 'We Do the Integration',
    description: 'No coding, no stress. We embed the script for you.',
    image: '/images/step2.png',
  },
  {
    title: 'You See Results',
    description: 'Watch live leads, clicks, and behaviors in your dashboard.',
    image: '/images/step3.png',
  },
];

export default function VisualWorkflowSection() {
  return (
    <section className="py-10 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We Handle Setup. You Focus on Growth.
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          In just three simple steps, you’ll start tracking leads and user behavior with zero hassle.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="w-32 h-32 relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
