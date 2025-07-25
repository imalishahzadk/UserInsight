'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserPlusIcon, WrenchScrewdriverIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function LiveDemoSection() {
  return (
    <section className="py-10 px-6 md:px-12 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          See It in Action
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Watch how UserInsight gives you clarity in under 60 seconds.
          From tracking sessions to collecting leads — everything works with just one line of code.
        </motion.p>

        {/* Video Container */}
        <motion.div
          className="w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-[#292b45] mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CxiyPQnUuRY"
            title="UserInsight Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            {
              icon: <UserPlusIcon className="h-8 w-8 text-purple-400" />,
              title: 'Create an Account',
              desc: 'We’ll handle the setup.',
            },
            {
              icon: <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />,
              title: 'We Install the Tracker',
              desc: 'No tech headaches.',
            },
            {
              icon: <EyeIcon className="h-8 w-8 text-purple-400" />,
              title: 'Watch Leads & Behavior Live',
              desc: 'Get instant insights.',
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-[#13132b] border border-[#292b45] rounded-xl p-6 shadow-sm"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/signup">
            <button className="cursor-pointer bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition-all">
              Try It Yourself →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
