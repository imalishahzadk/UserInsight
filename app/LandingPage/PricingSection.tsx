'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function PricingSection() {
return (
<section className="py-24 px-6 md:px-12 text-white">
<div className="max-w-6xl mx-auto text-center mb-16">
<h2 className="text-3xl sm:text-4xl font-bold">Choose your Plan</h2>
<p className="text-gray-400 mt-4">
Explore our prices and see why over 100 Framer creators choose Frameblox to build their sites quickly.
</p>
</div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* Free Plan */}
    <motion.div
      className="border border-gray-700 rounded-2xl p-8 flex flex-col justify-between bg-[#111122] hover:border-purple-500 transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Free Plan</h3>
        <p className="text-sm text-gray-400 mb-6">
          Frameblox provides the tools you need to quickly build a high-quality website.
        </p>
        <p className="text-4xl font-bold mb-2 text-white">$0</p>
        <p className="text-sm text-gray-500 mb-6">/ month</p>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>Access to simple features</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>1 User</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>1GB data</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>Basic chat and support</span>
          </li>
        </ul>
      </div>
      <button className="mt-8 cursor-pointer bg-white text-black rounded-full py-2 px-6 hover:bg-gray-100 transition">
        Get it now
      </button>
    </motion.div>

    {/* Pro Plan */}
    <motion.div
      className="border border-purple-500 rounded-2xl p-8 flex flex-col justify-between bg-white text-black relative shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="absolute top-4 right-4 text-xs bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc]  text-white font-semibold px-3 py-1 rounded-full">
        Best Seller
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Pro Plan</h3>
        <p className="text-sm text-gray-700 mb-6">
          Frameblox provides the tools you need to quickly build a high-quality website.
        </p>
        <p className="text-4xl font-bold mb-2">$20</p>
        <p className="text-sm text-gray-500 mb-6">/ month</p>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-600 mt-1" />
            <span>100+ integrations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-600 mt-1" />
            <span>Unlimited sites</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-600 mt-1" />
            <span>20GB data with CDN</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-600 mt-1" />
            <span>Priority chat and email support</span>
          </li>
        </ul>
      </div>
      <button className="mt-8 cursor-pointer bg-black text-white rounded-full py-2 px-6 hover:bg-gray-900 transition">
        Get it now
      </button>
    </motion.div>

    {/* Enterprise Plan */}
    <motion.div
      className="border border-gray-700 rounded-2xl p-8 flex flex-col justify-between bg-[#111122] hover:border-purple-500 transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Enterprise Plan</h3>
        <p className="text-sm text-gray-400 mb-6">
          Frameblox provides the tools you need to quickly build a high-quality website.
        </p>
        <p className="text-4xl font-bold mb-2 text-white">$60</p>
        <p className="text-sm text-gray-500 mb-6">/ month</p>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc]  mt-1" />
            <span>Advanced features</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>Unlimited individual users</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>Unlimited data</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] mt-1" />
            <span>Priority support</span>
          </li>
        </ul>
      </div>
      <button className="mt-8 cursor-pointer bg-white text-black rounded-full py-2 px-6 hover:bg-gray-100 transition">
        Get it now
      </button>
    </motion.div>
  </div>
</section>
);
}