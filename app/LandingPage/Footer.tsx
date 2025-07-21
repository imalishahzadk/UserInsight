'use client';

import { Mail, Facebook, Linkedin, Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className=" text-white px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold text-purple-400">UserInsight</h2>
          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Empowering businesses with intelligent website analytics. Transform visitor data into actionable insights to optimize your user experience.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] flex items-center justify-center text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent transition">
              <Rocket className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] flex items-center justify-center text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent transition">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1a1a2e] flex items-center justify-center text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent transition">
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <div className="w-8 h-1 bg-purple-400 rounded mb-4"></div>
          <ul className="space-y-2 text-gray-300 text-sm cursor-pointer">
            <li className="hover:text-white transition">› Home</li>
            <li className="hover:text-white transition">› Pricing</li>
            <li className="hover:text-white transition">› About</li>
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
            <li className="hover:text-white transition">› GDPR Compliance</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <h4 className="font-semibold text-white mb-1 text-sm">Subscribe to Our Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Get the latest updates and offers</p>
          <div className="flex items-center rounded-lg overflow-hidden bg-[#2e2e4d]">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-sm text-white placeholder-gray-400 px-4 py-2 flex-grow outline-none"
            />
            <button className="bg-purple-500 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent transition px-3 py-2 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
