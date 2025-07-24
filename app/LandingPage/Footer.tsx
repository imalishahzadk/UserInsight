'use client';

import Image from 'next/image';
import { Mail, Facebook, Linkedin, Rocket, ShieldCheck, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand + Trust */}
        <div>
          <div className="flex items-center gap-2">
            {/* Logo Image */}
            <div className="w-8 h-8 mt-1 relative">
              <Image
                src="/logo.png"
                alt="UserInsight Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>

            {/* Logo Text */}
            <span className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
              User
            </span>
            Insight
          </span>
          </div>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Empowering businesses with intelligent website analytics. Transform visitor data into actionable insights to optimize your user experience.
          </p>

          {/* Trust Icons */}
          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              No Data Sharing
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              400+ Brands Onboarded
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] cursor-pointer flex items-center justify-center hover:text-white transition">
              <Rocket className="w-4 h-4 text-purple-300 " />
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] cursor-pointer flex items-center justify-center hover:text-white transition">
              <Facebook className="w-4 h-4 text-purple-300" />
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] cursor-pointer flex items-center justify-center hover:text-white transition">
              <Linkedin className="w-4 h-4 text-purple-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <div className="w-8 h-1 bg-purple-400 rounded mb-4"></div>
          <ul className="space-y-2 text-gray-300 text-sm cursor-pointer">
            <li className="hover:text-white transition">› Home</li>
            <li className="hover:text-white transition">› Features</li>
            <li className="hover:text-white transition">› Contact</li>
            <li className="hover:text-white transition">› Blog</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <div className="w-8 h-1 bg-purple-400 rounded mb-4"></div>
          <ul className="space-y-2 text-gray-300 text-sm cursor-pointer">
            <li className="hover:text-white transition">› Privacy Policy</li>
            <li className="hover:text-white transition">› Terms of Service</li>
            <li className="hover:text-white transition">› Cookie Policy</li>
            <li className="hover:text-white transition">› Data Processing Addendum</li>
          </ul>
        </div>

        {/* Newsletter & FAQ CTA */}
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <h4 className="font-semibold text-white mb-1 text-sm">Subscribe for Updates</h4>
          <p className="text-gray-400 text-sm mb-4">Be the first to hear about new features, expert insights, and whitepapers.</p>
          <div className="flex items-center rounded-lg overflow-hidden bg-[#2e2e4d]">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-sm text-white placeholder-gray-400 px-4 py-2 flex-grow outline-none"
            />
            <button className="cursor-pointer bg-purple-500 hover:bg-purple-600 px-3 py-2">
              <Mail className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            <span className="underline cursor-pointer">FAQ:</span> Is this a Google Analytics alternative?
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} UserInsight. All rights reserved.</p>
        <p>
          Powered by{' '}
          <a
            href="https://softechinc.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Softech Inc
          </a>
        </p>
      </div>
    </footer>
  );
}
