import type { Metadata } from 'next';
import { getSettings, getArticles } from '@/lib/api';
import { GOVERNOR_OFFICE_TITLE } from '@/lib/constants';
import { getInitials } from '@/lib/utils';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import ArticleCard from '@/components/ArticleCard';
import FeatureTile from '@/components/FeatureTile';
import EmptyState from '@/components/EmptyState';
import { Image, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: `${GOVERNOR_OFFICE_TITLE} | Unity State Bentiu Website`,
};

export default async function GovernorPage() {
  const [settings, articlesData] = await Promise.all([
    getSettings(),
    getArticles({ page: 1 }),
  ]);

  const governorTitle = (settings.governorTitle as string) || GOVERNOR_OFFICE_TITLE;
  const governorName = (settings.governorName as string) || 'Governor of Unity State';
  const governorMessage = (settings.governorMessage as string) || '';
  const governorImage = settings.governorImage as string | undefined;
  const initials = getInitials(governorName);

  const speeches = articlesData.items.filter((a) =>
    (a.tags as string[] | undefined)?.includes('speech') ||
    (a.category as { slug: string })?.slug === 'politics'
  ).slice(0, 6);

  return (
    <>
      <PageHero
        badge="Executive Office"
        title={governorTitle}
        subtitle="Official communications, speeches, and vision for Unity State."
      />
      <PageSection band="white">
        <div className="content-card border-l-4 border-l-primary p-6 sm:p-8 mb-12">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            {governorImage ? (
              <img
                src={governorImage}
                alt={governorName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-primary ring-4 ring-primary/10 mx-auto md:mx-0"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary mx-auto md:mx-0 shrink-0">
                {initials || 'GS'}
              </div>
            )}
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{governorTitle}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-4">{governorName}</h2>
              {governorMessage && (
                <blockquote className="relative pl-5 border-l-4 border-primary">
                  <p className="text-muted text-base sm:text-lg leading-relaxed italic">&ldquo;{governorMessage}&rdquo;</p>
                </blockquote>
              )}
            </div>
          </div>
        </div>

        <SectionHeader title="Vision Statement" />
        <div className="content-card p-6 sm:p-8 mb-12">
          <p className="text-muted leading-relaxed">
            Building a Transparent, Resilient Unity State — where every citizen, regardless of connectivity level,
            has access to verified government information and digital public services. The Governor&apos;s office is
            committed to peace, development, and accountability across all six counties.
          </p>
        </div>

        <SectionHeader title="Speeches & Press Releases" href="/news" />
        {speeches.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {speeches.map((article) => (
              <ArticleCard key={article._id as string} article={article as Parameters<typeof ArticleCard>[0]['article']} />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mb-12"
            message="Official speeches and press releases will appear here."
            actionHref="/news"
            actionLabel="Visit News Center"
          />
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <FeatureTile
            href="/media"
            title="Photo Gallery"
            description="Governor's public engagements and official visits"
            icon={Image}
          />
          <FeatureTile
            href="/media"
            title="Video Library"
            description="Speeches, appearances, and official addresses"
            icon={Video}
          />
        </div>
      </PageSection>
    </>
  );
}
