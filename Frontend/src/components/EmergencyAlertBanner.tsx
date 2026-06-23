'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, X } from 'lucide-react';

interface EmergencyBannerProps {
  active: boolean;
  level: number;
  message: string;
}

const levelStyles: Record<number, string> = {
  1: 'bg-foreground text-white',
  2: 'bg-primary text-white',
  3: 'bg-primary-dark text-white',
};

const levelLabels: Record<number, string> = {
  1: 'CRITICAL ALERT',
  2: 'FLOOD ALERT',
  3: 'ADVISORY',
};

const DISMISS_KEY = 'emergency-banner-dismissed';

export default function EmergencyAlertBanner({ active, level, message }: EmergencyBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (level === 3 && sessionStorage.getItem(DISMISS_KEY) === message) {
      setDismissed(true);
    }
  }, [level, message]);

  if (!active || !message || (level === 3 && dismissed)) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, message);
    setDismissed(true);
  };

  const isCritical = level === 1;

  return (
    <div
      role="alert"
      aria-live={isCritical ? 'assertive' : 'polite'}
      className={`${levelStyles[level] || levelStyles[2]} text-white px-4 py-3 text-sm font-medium`}
    >
      <div className="max-w-7xl page-container flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="flex items-center gap-2 shrink-0">
          <AlertTriangle size={16} className={isCritical ? 'animate-pulse' : ''} aria-hidden />
          <span className="font-bold uppercase text-xs sm:text-sm">{levelLabels[level] || 'ALERT'}</span>
        </span>
        <span className="flex-1 min-w-0 line-clamp-3 sm:line-clamp-2">{message}</span>
        <div className="flex flex-wrap items-center gap-3 shrink-0 text-xs">
          <Link
            href="/notices"
            className="underline underline-offset-2 hover:opacity-90 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
          >
            Read more
          </Link>
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:opacity-90 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
          >
            Emergency contacts
          </Link>
          {level === 3 && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Dismiss advisory"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
