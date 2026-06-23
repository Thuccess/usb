'use client';

import SiteLogo from '@/components/SiteLogo';

export default function HomeErrorFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <SiteLogo variant="hero" className="mx-auto mb-6 bg-white rounded-2xl p-4 shadow-sm ring-1 ring-border" />
      <p className="text-muted mb-6">Connecting to server... Please ensure the API is running.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Retry
      </button>
    </div>
  );
}
