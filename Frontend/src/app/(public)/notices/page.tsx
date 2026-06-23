import type { Metadata } from 'next';
import { getNotices } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import FilterChips from '@/components/FilterChips';
import EmptyState from '@/components/EmptyState';
import { NOTICE_TYPE_LABELS, NOTICE_TYPE_COLORS, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Public Notices | Unity State Bentiu Website',
};

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const notices = await getNotices(params.type);

  const chips = [
    { href: '/notices', label: 'All', active: !params.type },
    ...Object.entries(NOTICE_TYPE_LABELS).map(([key, label]) => ({
      href: `/notices?type=${key}`,
      label,
      active: params.type === key,
    })),
  ];

  return (
    <>
      <PageHero
        badge="Government Alerts"
        title="Public Notices"
        subtitle="Official government alerts, directives, recruitment notices, and public announcements."
      />

      <PageSection band="muted" narrow>
        <FilterChips chips={chips} className="mb-8" />
        {notices.length === 0 ? (
          <EmptyState
            message="No active notices at this time. Check back for official government announcements."
            actionHref="/notices"
            actionLabel="View all notices"
          />
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <article
                key={notice._id as string}
                className="content-card-hover p-6 border-l-4 border-l-primary"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      NOTICE_TYPE_COLORS[notice.type as string] || NOTICE_TYPE_COLORS.general
                    }`}
                  >
                    {NOTICE_TYPE_LABELS[notice.type as string]}
                  </span>
                  {notice.priority === 1 && (
                    <span className="text-xs font-bold text-primary uppercase">Priority</span>
                  )}
                  <time className="text-xs text-muted ml-auto">{formatDate(notice.createdAt as string)}</time>
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-dark">{notice.title as string}</h3>
                <p className="text-muted text-sm leading-relaxed">{notice.body as string}</p>
              </article>
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
