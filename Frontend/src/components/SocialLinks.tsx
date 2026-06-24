import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

type SocialPlatform = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type SocialLinksProps = {
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md';
  tone?: 'dark' | 'light';
  links?: SocialPlatform[];
};

const defaultLinks: SocialPlatform[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Facebook },
  { label: 'Twitter', href: 'https://x.com/', icon: Twitter },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Youtube },
];

export default function SocialLinks({ className = '', showLabels = false, size = 'md', tone = 'dark', links }: SocialLinksProps) {
  const sizeClasses = size === 'sm'
    ? (showLabels ? 'min-h-8 px-3 py-2' : 'h-8 w-8')
    : (showLabels ? 'min-h-9 px-4 py-2' : 'h-9 w-9');
  const iconSize = size === 'sm' ? 14 : 16;
  const baseClasses = tone === 'dark'
    ? 'border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary-dark focus-visible:ring-offset-primary-dark'
    : 'border-border bg-background text-foreground hover:bg-primary hover:text-white focus-visible:ring-offset-background';

  const resolvedLinks = links?.length ? links : defaultLinks;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {resolvedLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Follow us on ${label}`}
          className={`inline-flex items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${baseClasses} ${sizeClasses}`}
        >
          <Icon size={iconSize} aria-hidden />
          {showLabels && <span className="ml-2 text-sm font-medium">{label}</span>}
        </Link>
      ))}
    </div>
  );
}
