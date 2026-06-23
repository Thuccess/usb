import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  badge = 'Official Government Portal',
  className,
  breadcrumb,
  children,
  compact,
}: PageHeroProps) {
  const isCompact = compact ?? title.length > 72;

  return (
    <section
      className={cn(
        'relative overflow-hidden text-white',
        isCompact ? 'min-h-0' : 'min-h-[220px] sm:min-h-[260px]',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-primary-dark to-primary" aria-hidden />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12] mix-blend-luminosity"
        style={{ backgroundImage: "url('/hero/governor-office.png')" }}
        aria-hidden
      />
      <div className="page-hero-overlay absolute inset-0" aria-hidden />
      <div className="hero-pattern absolute inset-0 opacity-[0.08]" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none bg-white/10"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none bg-primary/40"
        aria-hidden
      />
      <div
        className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-white/30 via-primary to-primary-dark"
        aria-hidden
      />

      <div
        className={cn(
          'relative max-w-7xl page-container',
          isCompact ? 'py-8 sm:py-10 md:py-12' : 'py-10 sm:py-12 md:py-14 lg:py-16'
        )}
      >
        {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/25 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 backdrop-blur-sm">
          <ShieldCheck size={14} className="text-white shrink-0" aria-hidden />
          {badge}
        </span>

        <h1
          className={cn(
            'font-bold text-white leading-[1.12] tracking-tight mb-3 max-w-4xl drop-shadow-md',
            isCompact
              ? 'text-xl sm:text-2xl lg:text-3xl'
              : 'text-2xl sm:text-3xl lg:text-[2.75rem]'
          )}
        >
          <span
            className={cn(
              'block border-l-4 border-white pl-4 sm:pl-5',
              isCompact && 'line-clamp-3 sm:line-clamp-none'
            )}
          >
            {title}
          </span>
        </h1>

        {subtitle && (
          <p
            className={cn(
              'text-white/85 leading-relaxed max-w-3xl pl-4 sm:pl-5 border-l border-white/25 drop-shadow-sm',
              isCompact
                ? 'text-sm sm:text-base line-clamp-3 sm:line-clamp-none'
                : 'text-base sm:text-lg'
            )}
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/15 flex flex-wrap gap-2">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
