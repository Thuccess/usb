'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TickerItem {
  _id: string;
  title: string;
  slug: string;
  category?: { slug: string };
}

interface BreakingNewsTickerProps {
  items: TickerItem[];
}

export default function BreakingNewsTicker({ items }: BreakingNewsTickerProps) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (!items.length) return null;

  const displayItems = items.slice(0, 5);

  if (reducedMotion) {
    return (
      <div className="bg-primary-dark text-white">
        <div className="max-w-7xl page-container flex flex-wrap items-center gap-3 py-2">
          <span className="breaking-badge px-3 py-1 text-xs font-bold uppercase shrink-0 min-h-[44px] inline-flex items-center">
            Breaking
          </span>
          {displayItems.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.category?.slug || 'general'}/${item.slug}`}
              className="text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded shrink-0 min-h-[44px] inline-flex items-center"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/news"
            className="text-xs font-medium hover:underline shrink-0 ml-auto min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            All breaking news →
          </Link>
        </div>
      </div>
    );
  }

  const doubled = [...displayItems, ...displayItems];

  return (
    <div
      className="bg-primary-dark text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="max-w-7xl page-container flex items-center">
        <span className="breaking-badge px-3 sm:px-4 py-2 text-xs font-bold uppercase shrink-0 z-10 min-h-[44px] inline-flex items-center">
          Breaking
        </span>
        <div className="overflow-hidden flex-1 py-2 min-w-0">
          <div
            className={`ticker-scroll flex whitespace-nowrap gap-8 ${paused ? 'ticker-paused' : ''}`}
          >
            {doubled.map((item, i) => (
              <Link
                key={`${item._id}-${i}`}
                href={`/news/${item.category?.slug || 'general'}/${item.slug}`}
                className="text-sm hover:underline inline-flex items-center gap-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded"
              >
                <span className="text-white/70" aria-hidden>●</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/news"
          className="text-xs font-medium px-3 sm:px-4 py-2 shrink-0 hover:underline min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          All →
        </Link>
      </div>
    </div>
  );
}
