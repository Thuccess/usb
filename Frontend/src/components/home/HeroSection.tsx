import Link from 'next/link';
import { Newspaper, MessageSquare, Bell, ShieldCheck, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { COUNTIES } from '@/lib/constants';
import HeroBackgroundSlider from '@/components/home/HeroBackgroundSlider';

const quickStats = [
  { icon: MapPin, label: `${COUNTIES.length} Counties`, sublabel: 'Statewide coverage' },
  { icon: ShieldCheck, label: 'Verified News', sublabel: 'Official sources only' },
  { icon: Globe, label: 'Digital Services', sublabel: 'ICT-enabled access' },
];

const ctas = [
  { href: '/news', label: 'Latest News', description: 'Verified updates', icon: Newspaper, primary: true },
  { href: '/notices', label: 'Public Notices', description: 'Alerts & directives', icon: Bell },
  { href: '/feedback', label: 'Citizen Feedback', description: 'Share your voice', icon: MessageSquare },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white min-h-[min(560px,88vh)] flex items-center">
      <HeroBackgroundSlider />

      <div className="relative w-full max-w-7xl page-container py-12 sm:py-14 md:py-16 lg:py-20 pb-20 sm:pb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/25 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <ShieldCheck size={14} className="text-white shrink-0" aria-hidden />
            Official Government Portal
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight mb-4 text-white drop-shadow-md">
            <span className="block border-l-4 border-white pl-4 sm:pl-5">
              Unity State Bentiu Website
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mb-8 pl-4 sm:pl-5 border-l border-white/25 drop-shadow-sm">
            Your trusted source for verified government information, public notices, and digital
            services across Unity State, South Sudan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl">
            {ctas.map((cta) => {
              const Icon = cta.icon;
              return (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`hero-cta-card group flex flex-col gap-2 p-4 rounded-xl min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark ${
                    cta.primary ? 'ring-1 ring-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        cta.primary ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon size={20} aria-hidden />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0 mt-0.5"
                      aria-hidden
                    />
                  </div>
                  <span className="font-semibold text-sm text-foreground">{cta.label}</span>
                  <span className="text-xs text-muted leading-snug">{cta.description}</span>
                </Link>
              );
            })}
          </div>

          <div className="hero-stat-strip rounded-2xl p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3 min-w-0 sm:min-w-[140px]">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight text-white truncate">{stat.label}</p>
                      <p className="text-xs text-white/70 leading-snug">{stat.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
