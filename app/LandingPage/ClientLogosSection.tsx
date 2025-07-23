'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const clientLogos = [
  {
    id: 1,
    src: '/logos/logo1.png',
    alt: 'PulseMetrics',
    desc: 'AI-powered analytics for hospitals',
    hasShadow: true,
  },
  {
    id: 2,
    src: '/logos/logo2.png',
    alt: 'BrandLift',
    desc: 'Brand marketing automation suite',
  },
  {
    id: 3,
    src: '/logos/logo3.png',
    alt: 'InsightHive',
    desc: 'Real-time data for product teams',
  },
  {
    id: 4,
    src: '/logos/logo4.png',
    alt: 'DataNest',
    desc: 'Cloud data storage for SMBs',
    hasShadow: true,
  },
  {
    id: 5,
    src: '/logos/logo5.png',
    alt: 'Trackify',
    desc: 'Customer behavior tracking platform',
  },
  {
    id: 6,
    src: '/logos/logo6.png',
    alt: 'LeadSpark',
    desc: 'Lead gen platform for agencies',
  },
];

export default function ClientLogosSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  return (
    <section className="py-24 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Purple Box */}
        <div className="md:col-span-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] rounded-2xl px-8 py-12 shadow-lg h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Our Clients</h2>
          <p className="text-purple-200 text-sm leading-relaxed">
            From early-stage startups to global enterprise teams, businesses around the world trust
            <span className="font-semibold text-white"> UserInsight </span>
            to visualize, track, and optimize visitor data.
            <br /><br />
            We’re proud to partner with data-driven teams across 10+ countries who rely on us to power their growth decisions.
          </p>
        </div>

        {/* Right Logo Cards */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className={`bg-white px-4 py-6 rounded-xl text-center ${
                logo.hasShadow ? 'shadow-xl' : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-2">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-800">{logo.alt}</h4>
              <p className="text-xs text-gray-500 mt-1">{logo.desc}</p>
            </motion.div>
          ))}
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
