'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { CLIENT_LOGIN_ROUTE } from '@/core/routes';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur bg-[#0a0a1f]/30 border-b border-white/10 shadow-md'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 flex justify-between items-center">
        {/* Logo with image and text */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo Image */}
          <div className="w-8 h-8 mt-1 relative">
            <Image
              src="/logo.png" // <-- Replace with actual image path
              alt="UserInsight Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          {/* Text Logo */}
          <span className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
              User
            </span>
            Insight
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href={CLIENT_LOGIN_ROUTE}>
            <button className="ml-4 cursor-pointer bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all">
              Login
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-300 backdrop-blur bg-[#0a0a1f]/60">
          <Link href="/" className="block hover:text-white transition">Home</Link>
          <Link href="/pricing" className="block hover:text-white transition">Pricing</Link>
          <Link href="/about" className="block hover:text-white transition">About</Link>
          <Link href={CLIENT_LOGIN_ROUTE} className="block">
            <button className="mt-2 w-full bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all">
              Login
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
