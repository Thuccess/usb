import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  accent?: 'primary' | 'muted' | 'dark';
  loading?: boolean;
}

export default function DashboardStatCard({
  label,
  value,
  icon: Icon,
  href,
  accent = 'primary',
  loading,
}: DashboardStatCardProps) {
  const accentStyles = {
    primary: 'border-l-primary bg-primary/5',
    muted: 'border-l-primary/40 bg-white',
    dark: 'border-l-foreground bg-foreground/[0.03]',
  };

  const iconStyles = {
    primary: 'bg-primary text-white',
    muted: 'bg-primary/10 text-primary',
    dark: 'bg-foreground text-white',
  };

  const content = (
    <article
      className={cn(
        'content-card border-l-4 p-5 sm:p-6 h-full transition-all',
        accentStyles[accent],
        href && 'hover:border-primary hover:shadow-md group'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', iconStyles[accent])}>
          <Icon size={22} aria-hidden />
        </div>
        {href && (
          <ArrowUpRight
            size={18}
            className="text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0 mt-1"
            aria-hidden
          />
        )}
      </div>
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-9 w-16 bg-black/10 rounded" />
          <div className="h-4 w-28 bg-black/5 rounded" />
        </div>
      ) : (
        <>
          <p className="text-3xl sm:text-4xl font-bold text-primary-dark tabular-nums">{value}</p>
          <p className="text-sm text-muted mt-1">{label}</p>
        </>
      )}
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
