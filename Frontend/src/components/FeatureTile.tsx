import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureTileProps {
  href: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  emoji?: string;
}

export default function FeatureTile({ href, title, description, icon: Icon, emoji }: FeatureTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        'content-card group flex flex-col p-6 h-full',
        'hover:border-primary hover:shadow-md transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        {Icon ? (
          <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
            <Icon size={22} className="text-primary" aria-hidden />
          </div>
        ) : emoji ? (
          <span className="text-3xl" aria-hidden>{emoji}</span>
        ) : null}
        <ArrowUpRight
          size={18}
          className="text-muted group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0"
          aria-hidden
        />
      </div>
      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted leading-relaxed flex-1">{description}</p>
    </Link>
  );
}
