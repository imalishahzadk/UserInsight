'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Fatima R.',
    role: 'Marketing Manager, BrightWeb Agency',
    rating: 5,
    text: 'UserInsight showed us exactly where users were dropping off and helped us recover over 30% lost leads in the first week.',
    avatar: '/avatars/fatima.jpeg',
  },
  {
    name: 'John D.',
    role: 'Growth Marketer',
    rating: 5,
    text: 'UserInsight makes it insanely simple to understand visitor behavior.',
    avatar: '/avatars/john.jpeg',
  },
  {
    name: 'Lina M.',
    role: 'Founder, SaaSly',
    rating: 5,
    text: 'We gained clear insight into what pages drive conversions.',
    avatar: '/avatars/lina.jpeg',
  },
  {
    name: 'Adeel K.',
    role: 'CRO Consultant',
    rating: 5,
    text: 'The clean dashboard and setup made onboarding painless.',
    avatar: '/avatars/adeel.jpeg',
  },
  {
    name: 'Karla G.',
    role: 'CMO, Shoply',
    rating: 5,
    text: 'In 1 week, we captured 300+ leads with their popup tools.',
    avatar: '/avatars/karla.jpeg',
  },
  {
    name: 'Alex N.',
    role: 'Data Analyst',
    rating: 5,
    text: 'No coding needed. Just plugged in and saw results instantly.',
    avatar: '/avatars/alex.jpeg',
  },
  {
    name: 'Sasha T.',
    role: 'eCommerce Manager',
    rating: 5,
    text: 'Finally, a product that’s made for marketers not just devs.',
    avatar: '/avatars/sasha.jpeg',
  },
  {
    name: 'Bryce W.',
    role: 'Digital Lead, Launchly',
    rating: 5,
    text: 'The location/device data helped us segment much better.',
    avatar: '/avatars/bryce.jpeg',
  },
  {
    name: 'Nashit R.',
    role: 'Startup Founder',
    rating: 5,
    text: 'I recommend it to every founder I mentor. Just works.',
    avatar: '/avatars/nashit.jpeg',
  },
  {
    name: 'Kim A.',
    role: 'Agency Strategist',
    rating: 5,
    text: 'We show this tool off to every client during onboarding.',
    avatar: '/avatars/kim.jpeg',
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 px-6 md:px-12 text-white">
      {/* Top Testimonial Swiper with fade + pagination */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="mb-16 max-w-5xl mx-auto"
      >
        {[testimonials[0], testimonials[1], testimonials[2]].map((t, i) => (
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
                <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full overflow-hidden bg-gray-800">
  <Image
    src={t.avatar}
    alt={t.name}
    width={32}
    height={32}
    className="w-full h-full object-cover"
  />
</div>


              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots Centered */}
      <div className="flex justify-center mt-4">
        <div className="swiper-pagination !static !relative"></div>
      </div>

      {/* Bottom Testimonial Cards Carousel */}
      <div className="relative max-w-6xl mx-auto mt-12">
        {/* Left Arrow */}
        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10">
          <button className="swiper-button-prev w-6 h-6 bg-[#2f2f4f] rounded-full text-purple-300 hover:bg-gradient-to-r from-[#7367f0] via-[#9d80f5] to-[#ce9ffc] transition flex items-center justify-center absolute transform -translate-y-1/2 z-10">
            <ArrowLeftIcon className="w-2 h-2" />
          </button>
        </div>
        {/* Right Arrow */}
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
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
                <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full overflow-hidden ring-2 ring-purple-400 bg-gray-800">
  <Image
    src={t.avatar}
    alt={t.name}
    width={40}
    height={40}
    className="w-full h-full object-cover"
  />
</div>

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
