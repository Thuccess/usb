import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ title, subtitle, href, linkText = 'View all' }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-dark border-l-4 border-primary pl-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted mt-2 pl-4 line-clamp-2 sm:line-clamp-none">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-medium text-primary hover:underline shrink-0 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
