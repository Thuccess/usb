import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { formatDate, getInitials } from '@/lib/utils';
import { GOVERNOR_OFFICE_TITLE } from '@/lib/constants';
import type { HomeArticle, HomeSettings } from '@/components/home/types';

interface GovernorsDeskCardProps {
  settings: HomeSettings;
  latestSpeech?: HomeArticle | null;
}

export default function GovernorsDeskCard({ settings, latestSpeech }: GovernorsDeskCardProps) {
  const governorName = settings.governorName || 'Governor of Unity State';
  const governorImage = settings.governorImage;
  const initials = getInitials(governorName);

  return (
    <div className="lg:sticky lg:top-24">
      <SectionHeader title={GOVERNOR_OFFICE_TITLE} href="/governor" />
      <div className="bg-card border border-border border-l-4 border-l-primary rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          {governorImage ? (
            <img
              src={governorImage}
              alt={governorName}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary shrink-0">
              {initials || 'GS'}
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{governorName}</h3>
            <p className="text-sm text-muted">Official communications and speeches</p>
          </div>
        </div>

        {latestSpeech && (
          <div className="bg-background rounded-lg p-4 mb-4">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Latest speech</p>
            <Link
              href={`/news/${latestSpeech.category?.slug || 'general'}/${latestSpeech.slug}`}
              className="font-medium text-sm hover:text-primary line-clamp-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {latestSpeech.title}
            </Link>
            {latestSpeech.publishedAt && (
              <time className="text-xs text-muted mt-1 block">{formatDate(latestSpeech.publishedAt)}</time>
            )}
          </div>
        )}

        <Link
          href="/governor"
          className="text-primary text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          View speeches & press releases →
        </Link>
      </div>
    </div>
  );
}
