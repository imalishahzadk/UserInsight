'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function CTASection() {
  return (
    <section className="py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between rounded-3xl overflow-hidden shadow-2xl bg-black relative">
        
        {/* Left Abstract Circle Graphic */}
        <div className="relative w-full lg:w-1/2 h-66 md:h-108 flex items-center justify-center bg-[#0f0f25]">
          <Image
            src="/images/fida-circle.png"
            alt="Abstract graphic"
            width={300}
            height={300}
            className="opacity-40"
          />
        </div>

        {/* Right CTA Text Block */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 text-white">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to stop guessing?
          </motion.h2>

          <p className="text-gray-400 mb-4 max-w-md">
            Transparent usage-based pricing. No hidden fees. Cancel anytime.
          </p>

          <ul className="text-sm text-gray-400 mb-6 space-y-2">
            {[
              'Free white-glove setup',
              'GDPR & CCPA Compliant',
              '7-day free trial',
              'Unlimited support',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <button className="cursor-pointer bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition duration-300">
              Get a Custom Quote
            </button>
            <button className="cursor-pointer border border-purple-400 text-purple-200 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:text-white font-semibold py-3 px-6 rounded-full transition duration-300">
              Let’s Find Your Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
