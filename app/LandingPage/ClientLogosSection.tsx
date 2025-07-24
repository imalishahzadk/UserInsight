'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const clientLogos = [
  { id: 1, src: '/logos/masteryma.png', alt: 'Mastery Martial Arts', hasShadow: true },
  { id: 2, src: '/logos/stick.jpeg', alt: 'Stick & Tin LLC' },
  { id: 3, src: '/logos/shynable.jpeg', alt: 'Shynable Digital' },
  { id: 4, src: '/logos/lion.jpeg', alt: 'Lion Heart Transport', hasShadow: true },
  { id: 5, src: '/logos/ob.png', alt: 'Obtech Enterprise' },
  // Removed the image logo for 'And Many More' — replaced below
];

export default function ClientLogosSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  return (
    <section className="py-14 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Purple Box */}
        <div className="md:col-span-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] rounded-2xl px-8 py-12 shadow-lg h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Our Clients</h2>
          <p className="text-purple-200 text-sm leading-relaxed">
            From early-stage startups to global enterprises, data-driven businesses worldwide trust{' '}
            <span className="font-semibold text-white">UserInsight</span> to optimize their website performance and user engagement.
          </p>
        </div>

        {/* Right Logo Cards */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className={`bg-white h-40 px-4 py-6 rounded-xl flex flex-col justify-center items-center ${
                logo.hasShadow ? 'shadow-xl' : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={60}
                className="object-contain h-[50px] md:h-[70px] w-auto mb-1 transition-all duration-300"
              />
              <h4 className="text-xs md:text-sm lg:text-base font-semibold text-gray-800 text-center leading-tight">
                {logo.alt}
              </h4>
            </motion.div>
          ))}

          {/* Add And Many More text card */}
          <motion.div
            className="bg-white h-40 px-4 py-6 rounded-xl flex flex-col justify-center items-center border border-gray-200"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: clientLogos.length * 0.1 }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent text-center">
              And Many More...
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={ref}
        className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 text-center gap-8"
      >
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
            {startCount && <CountUp end={2000000} duration={2.5} separator="," />}+
          </h3>
          <p className="text-sm text-gray-300 mt-1">Pageviews Tracked</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
            {startCount && <CountUp end={100000} duration={2.5} separator="," />}+
          </h3>
          <p className="text-sm text-gray-300 mt-1">Leads Captured</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
            {startCount && <CountUp end={400} duration={2.5} />}+
          </h3>
          <p className="text-sm text-gray-300 mt-1">Active Clients</p>
        </div>
      </div>
    </section>
  );
}
