'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Mr Horton',
    role: '',
    rating: 5,
    text: 'UserInsight helped us visualize where customers drop off. Clean interface, very insightful.',
  },
  {
    name: 'Matt Powell',
    role: 'UX Lead',
    rating: 5,
    text: 'The session replays and behavior heatmaps helped us pinpoint major UX issues easily.',
  },
  {
    name: 'Joseph Frament',
    role: '',
    rating: 5,
    text: 'This tool gave our conversion rates a serious boost. Very impressed with the features.',
  },
  {
    name: 'Marcus Lay',
    role: '',
    rating: 5,
    text: 'UserInsight gives us the full picture of user behavior—no code setup, just results.',
  },
  {
    name: 'Wilfred Jr',
    role: '',
    rating: 5,
    text: 'The live insights helped us make real-time changes to our funnel. Amazing tool!',
  },
  {
    name: 'Hunar Muhammad',
    role: '',
    rating: 5,
    text: 'Highly recommend UserInsight for any startup looking to understand their traffic fast.',
  },
  {
    name: 'AbdulKadir Jeilan',
    role: '',
    rating: 5,
    text: 'Finally, a tool that doesn’t require a dev to implement and delivers actionable data.',
  },
];

// Reusable initials avatar
const InitialAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const bgColors = ['bg-purple-600', 'bg-pink-600', 'bg-blue-600', 'bg-yellow-600', 'bg-green-600'];
  const color = bgColors[name.length % bgColors.length];

  return (
    <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold text-sm ${color}`}>
      {initials}
    </div>
  );
};

export default function TestimonialSection() {
  return (
    <section className="py-14 px-6 md:px-12 text-white">
      {/* Section Heading */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What People Are Saying About{' '}
        <span className="bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] bg-clip-text text-transparent">
          UserInsight
        </span>
      </motion.h2>

      {/* Top Testimonial Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="mb-16 max-w-5xl mx-auto"
      >
        {testimonials.slice(0, 3).map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-[#26263f] rounded-xl px-8 py-10 relative shadow-lg min-h-[200px]">
              <p className="text-2xl sm:text-3xl font-light leading-snug">
                <span className="text-5xl font-serif mr-2 text-purple-400">“</span>
                {t.text}
              </p>
              <div className="absolute bottom-6 right-8 flex items-center gap-3">
                <div className="text-right">
                  <p className="uppercase text-sm font-bold text-white">{t.name}</p>
                  <div className="w-12 h-1 bg-purple-400 mt-1 rounded-full"></div>
                </div>
                <InitialAvatar name={t.name} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
        <div className="swiper-pagination !static !relative"></div>
      </div>

      {/* Bottom Carousel */}
      <div className="relative max-w-6xl mx-auto mt-12">
        {/* Arrows */}
        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10">
          <button className="swiper-button-prev w-6 h-6 bg-[#2f2f4f] rounded-full text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] transition flex items-center justify-center absolute transform -translate-y-1/2 z-10">
            <ArrowLeftIcon className="w-2 h-2" />
          </button>
        </div>
        <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-10">
          <button className="swiper-button-next w-6 h-6 bg-[#2f2f4f] rounded-full text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] transition flex items-center justify-center absolute transform -translate-y-1/2 z-10">
            <ArrowRightIcon className="w-2 h-2" />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#1c1c33] rounded-xl shadow-md p-6 text-white h-full flex flex-col justify-between">
                <p className="font-bold mb-2">{t.text.slice(0, 30)}...</p>
                <div className="text-yellow-400 mb-2">{"★".repeat(t.rating)}</div>
                <p className="text-gray-300 text-sm mb-4">{t.text}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <InitialAvatar name={t.name} />
                  <div>
                    <p className="text-sm text-gray-200">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
