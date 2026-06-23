import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FilterChip {
  href: string;
  label: string;
  active?: boolean;
}

interface FilterChipsProps {
  chips: FilterChip[];
  className?: string;
}

export default function FilterChips({ chips, className }: FilterChipsProps) {
  return (
    <div className={cn('overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible', className)}>
      <div className="flex flex-wrap gap-2 min-w-min sm:min-w-0">
        {chips.map((chip) => (
          <Link
            key={chip.href + chip.label}
            href={chip.href}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium min-h-[44px] inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              chip.active
                ? 'bg-primary text-white shadow-sm'
                : 'bg-card border border-border text-foreground hover:border-primary hover:bg-primary/10'
            )}
            aria-current={chip.active ? 'page' : undefined}
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
