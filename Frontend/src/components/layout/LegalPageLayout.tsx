import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import { CalendarDays } from 'lucide-react';

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface LegalRelatedLink {
  href: string;
  label: string;
  description: string;
}

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
  highlights?: LegalHighlight[];
  relatedLinks?: LegalRelatedLink[];
}

export default function LegalPageLayout({
  badge,
  title,
  subtitle,
  lastUpdated,
  sections,
  highlights,
  relatedLinks,
}: LegalPageLayoutProps) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      <PageSection band="white" narrow>
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border">
          <span className="inline-flex items-center gap-2 text-sm text-muted bg-background border border-border rounded-full px-4 py-2">
            <CalendarDays size={16} className="text-primary shrink-0" aria-hidden />
            Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </span>
          <p className="text-sm text-muted">
            Unity State Bentiu Website — official government digital portal
          </p>
        </div>

        {highlights && highlights.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {highlights.map(({ icon: Icon, title: highlightTitle, description }) => (
              <article key={highlightTitle} className="page-stat-card border-l-4 border-l-primary">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={20} className="text-primary" aria-hidden />
                </div>
                <h3 className="font-semibold text-primary-dark mb-1">{highlightTitle}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-24 content-card p-5 lg:p-6"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              On this page
            </h2>
            <ol className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-start gap-2 text-sm text-muted hover:text-primary py-2 min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                  >
                    <span className="text-xs font-semibold text-primary/70 mt-0.5 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="content-card p-6 sm:p-8 scroll-mt-28"
              >
                <SectionHeader title={section.title} />
                <div className="prose-content">{section.content}</div>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      {relatedLinks && relatedLinks.length > 0 && (
        <PageSection band="muted" narrow>
          <SectionHeader title="Related resources" subtitle="Other pages that may help you understand our digital services." />
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="content-card-hover group p-5 sm:p-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <h3 className="font-semibold text-primary-dark mb-1 group-hover:text-primary">{link.label}</h3>
                <p className="text-sm text-muted leading-relaxed">{link.description}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}
