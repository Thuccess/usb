import Link from 'next/link';
import { searchContent } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { Newspaper, FolderKanban, Bell } from 'lucide-react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  let results = {
    articles: [] as Record<string, unknown>[],
    projects: [] as Record<string, unknown>[],
    notices: [] as Record<string, unknown>[],
  };

  if (q && q.length >= 2) {
    try {
      results = (await searchContent(q)) as typeof results;
    } catch {
      // API unavailable
    }
  }

  const total = results.articles.length + results.projects.length + results.notices.length;

  return (
    <>
      <PageHero
        badge="Site Search"
        title={q ? `Search results` : 'Search'}
        subtitle={
          q
            ? total > 0
              ? `Found ${total} result${total === 1 ? '' : 's'} for "${q}"`
              : `No results found for "${q}"`
            : 'Use the search box in the header to find news, projects, and public notices.'
        }
      />

      <PageSection band="muted" narrow>
        {!q && (
          <EmptyState message="Enter at least 2 characters in the header search box to find content across the portal." />
        )}

        {q && total === 0 && (
          <EmptyState
            message={`We couldn't find anything matching "${q}". Try different keywords or browse our news and projects.`}
            actionHref="/news"
            actionLabel="Browse News Center"
          />
        )}

        {results.articles.length > 0 && (
          <section className="mb-10">
            <SectionHeader title={`Articles (${results.articles.length})`} />
            <div className="space-y-3">
              {results.articles.map((a) => (
                <Link
                  key={a._id as string}
                  href={`/news/general/${a.slug}`}
                  className="content-card-hover flex items-start gap-4 p-4 group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Newspaper size={18} className="text-primary" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-primary-dark group-hover:text-primary transition-colors">{a.title as string}</h4>
                    {a.excerpt ? <p className="text-sm text-muted line-clamp-1 mt-0.5">{a.excerpt as string}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.projects.length > 0 && (
          <section className="mb-10">
            <SectionHeader title={`Projects (${results.projects.length})`} />
            <div className="space-y-3">
              {results.projects.map((p) => (
                <Link
                  key={p._id as string}
                  href={`/projects/${p.slug}`}
                  className="content-card-hover flex items-start gap-4 p-4 group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FolderKanban size={18} className="text-primary" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-primary-dark group-hover:text-primary transition-colors">{p.title as string}</h4>
                    <p className="text-sm text-muted">{p.county as string}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.notices.length > 0 && (
          <section>
            <SectionHeader title={`Notices (${results.notices.length})`} />
            <div className="space-y-3">
              {results.notices.map((n) => (
                <Link
                  key={n._id as string}
                  href="/notices"
                  className="content-card-hover flex items-start gap-4 p-4 group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Bell size={18} className="text-primary" aria-hidden />
                  </div>
                  <h4 className="font-medium text-primary-dark group-hover:text-primary transition-colors min-w-0 flex-1">{n.title as string}</h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageSection>
    </>
  );
}
