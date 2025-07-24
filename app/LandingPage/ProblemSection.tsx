'use client';

import { useEffect, useState } from 'react';
import {
  CursorArrowRaysIcon,
  UserMinusIcon,
  BeakerIcon,
  BoltSlashIcon,
} from '@heroicons/react/24/outline';

const problems = [
  {
    icon: <CursorArrowRaysIcon className="h-8 w-8 text-purple-400" />,
    title: 'Spent on Ads, No Idea if They Work',
    description: 'You’re paying for clicks, but don’t know what’s converting.',
  },
  {
    icon: <UserMinusIcon className="h-8 w-8 text-purple-400" />,
    title: 'Lost Leads Without Even Realizing It',
    description: 'Visitors come and go without a trace or a way to follow up.',
  },
  {
    icon: <BeakerIcon className="h-8 w-8 text-purple-400" />,
    title: 'Analytics That Feel Like Rocket Science',
    description: 'Confusing charts and reports that don’t lead to real action.',
  },
  {
    icon: <BoltSlashIcon className="h-8 w-8 text-purple-400" />,
    title: 'No Clear Next Step',
    description: 'You have data, but don’t know what to actually do with it.',
  },
];

export default function ProblemSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const trigger = document.getElementById('problem-section');
      if (trigger) {
        const top = trigger.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.8) {
          setShow(true);
          window.removeEventListener('scroll', onScroll);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="problem-section" className="py-24 px-6 md:px-12 text-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-14"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          The Problems You're Facing
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-[#13132b] border border-[#292b45] rounded-xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#1e1e3a] p-3 rounded-full">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {problem.title}
                </h3>
              </div>
              <p className="text-sm text-gray-300">{problem.description}</p>
            </div>
          ))}
        </div>

        <p
          className="mt-14 text-center text-xl bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent font-semibold"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease 0.3s',
          }}
        >
          UserInsight solves this instantly.
        </p>
      </div>
    </section>
  );
}
