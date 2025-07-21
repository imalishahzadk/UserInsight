'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CLIENT_LOGIN_ROUTE } from '@/core/routes';

export default function HeroSection() {
  return (
    <section className="text-white py-20 px-6 md:px-12 mt-[5%]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <motion.div
          className="text-center md:text-left md:max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          See Who’s{' '}
<span className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
  Visiting
</span>.
            Capture Leads. <br />
            <span className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent   ">Grow Smarter.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Real-time website analytics with built-in lead capture — no coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
          <Link href={CLIENT_LOGIN_ROUTE}>
  <button className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] cursor-pointer hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all">
    Start Free Trial
  </button>
</Link>
            <Link href="/demo">
              <button className="border cursor-pointer border-purple-500 text-purple-300 hover:text-white hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] font-semibold py-3 px-6 rounded-xl transition-all">
                Book a Live Demo
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Graphic (Optional) */}
        <motion.div
          className="w-full md:w-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="/images/hero.png"
            alt="Analytics Dashboard"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
