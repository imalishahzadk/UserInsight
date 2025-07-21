'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className=" py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between rounded-3xl overflow-hidden shadow-2xl bg-black relative">
        
        {/* Left Abstract Circle Graphic */}
        <div className="relative w-full lg:w-1/2 h-72 md:h-96 flex items-center justify-center bg-[#0f0f25]">
          <Image
            src="/images/fida-circle.png" // Replace this with your actual asset path
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
            Learn More<br />about UserInsight
          </motion.h2>
          <p className="text-gray-400 mb-6 max-w-md">
            Your analytics platform should serve you — not the other way around. We’re here to help you grow smarter.
          </p>
          <button className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:bg-purple-700 text-white cursor-pointer font-semibold py-3 px-6 rounded-full transition duration-300">
  Explore UserInsight →
</button>

        </div>
      </div>
    </section>
  );
}


