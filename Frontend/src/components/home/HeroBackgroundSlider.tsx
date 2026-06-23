'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  {
    src: '/hero/flood-resilience.png',
    alt: 'Traditional homes in flood waters across Unity State',
  },
  {
    src: '/hero/oil-industry.png',
    alt: 'Unity State oil industry facility visit',
  },
  {
    src: '/hero/governor-office.png',
    alt: 'The Office of Governor of Unity State',
  },
  {
    src: '/hero/official-ceremony.png',
    alt: 'Official ceremony in Unity State',
  },
] as const;

const INTERVAL_MS = 6000;

export default function HeroBackgroundSlider() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-slide ${index === active ? 'hero-slide-active' : ''}`}
          >
            <img
              src={slide.src}
              alt=""
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="hero-overlay absolute inset-0" />
        <div className="hero-pattern absolute inset-0 opacity-[0.12]" />
        <div className="hero-glow pointer-events-none absolute inset-0 opacity-80" />
      </div>

      <div
        className="absolute bottom-6 right-4 sm:right-6 lg:right-8 z-10 flex items-center gap-2"
        role="tablist"
        aria-label="Hero background slides"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show slide ${index + 1}: ${slide.alt}`}
            onClick={() => setActive(index)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className={`hero-dot block ${index === active ? 'hero-dot-active' : ''}`} />
          </button>
        ))}
      </div>
    </>
  );
}
