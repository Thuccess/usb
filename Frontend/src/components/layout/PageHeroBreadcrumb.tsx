import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeroBreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}

export default function PageHeroBreadcrumb({ items, className }: PageHeroBreadcrumbProps) {
  return (
    <nav
      className={cn('page-hero-breadcrumb flex flex-wrap items-center gap-1.5 text-sm', className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
          {index > 0 && <ChevronRight size={14} className="text-white/50 shrink-0" aria-hidden />}
          {item.href ? (
            <Link href={item.href} className="text-white/75 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/90 line-clamp-1">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
