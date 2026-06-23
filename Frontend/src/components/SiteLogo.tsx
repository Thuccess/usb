import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const LOGO_SRC = '/unity-state-bentiu-logo.png';
export const LOGO_ALT = 'Unity State - Bentiu official emblem';

const variantStyles = {
  header: 'h-11 sm:h-12 w-auto',
  footer: 'h-14 sm:h-16 w-auto',
  hero: 'h-28 sm:h-36 md:h-40 w-auto',
  admin: 'h-20 w-auto',
  compact: 'h-9 w-auto',
} as const;

interface SiteLogoProps {
  variant?: keyof typeof variantStyles;
  linked?: boolean;
  className?: string;
  /** White backdrop for dark surfaces (footer, admin login) */
  onDark?: boolean;
}

export default function SiteLogo({
  variant = 'header',
  linked = false,
  className,
  onDark = false,
}: SiteLogoProps) {
  const image = (
    <span
      className={cn(
        'inline-flex shrink-0',
        onDark && 'bg-white rounded-xl p-1.5 shadow-sm ring-1 ring-white/20',
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={320}
        height={320}
        priority={variant === 'header' || variant === 'hero'}
        className={cn('object-contain', variantStyles[variant])}
      />
    </span>
  );

  if (linked) {
    return (
      <Link
        href="/"
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
      >
        {image}
      </Link>
    );
  }

  return image;
}
