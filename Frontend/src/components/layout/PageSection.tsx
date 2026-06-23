import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: React.ReactNode;
  band?: 'white' | 'muted';
  narrow?: boolean;
  className?: string;
  id?: string;
}

export default function PageSection({
  children,
  band = 'white',
  narrow = false,
  className,
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        band === 'muted' ? 'section-band-muted' : 'section-band-white',
        'section-padding',
        className
      )}
    >
      <div className={cn(narrow ? 'max-w-4xl' : 'max-w-7xl', 'page-container')}>{children}</div>
    </section>
  );
}
