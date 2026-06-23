import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardQuickActionProps {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

export default function DashboardQuickAction({
  href,
  label,
  description,
  icon: Icon,
  variant = 'outline',
  external,
}: DashboardQuickActionProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex items-start gap-4 p-4 sm:p-5 rounded-xl border min-h-[44px] transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        variant === 'primary'
          ? 'bg-primary text-white border-primary hover:bg-primary-dark shadow-sm'
          : 'bg-white border-border hover:border-primary hover:shadow-sm'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
          variant === 'primary' ? 'bg-white/15' : 'bg-primary/10'
        )}
      >
        <Icon size={20} className={variant === 'primary' ? 'text-white' : 'text-primary'} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className={cn('font-semibold text-sm', variant === 'primary' ? 'text-white' : 'text-primary-dark')}>
          {label}
        </p>
        <p className={cn('text-xs mt-0.5 leading-relaxed', variant === 'primary' ? 'text-white/75' : 'text-muted')}>
          {description}
        </p>
      </div>
    </Link>
  );
}
