import type { Metadata } from 'next';
import { getArticles, getCategories } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import FilterChips from '@/components/FilterChips';
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
  title: 'News Center | Unity State Bentiu Website',
  description: 'Verified news and official government updates from Unity State, South Sudan.',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const [articlesData, categories] = await Promise.all([
    getArticles({ page: parseInt(params.page || '1'), category: params.category }),
    getCategories(),
  ]);

  const chips = [
    { href: '/news', label: 'All', active: !params.category },
    ...categories.map((cat) => ({
      href: `/news?category=${cat.slug}`,
      label: cat.name as string,
      active: params.category === cat.slug,
    })),
  ];

  return (
    <>
      <PageHero
        badge="Official Updates"
        title="News Center"
        subtitle="Verified government news and official updates from Unity State — official sources only."
      />

      <PageSection band="muted">
        <FilterChips chips={chips} className="mb-8" />
        {articlesData.items.length === 0 ? (
          <EmptyState
            message="No articles found for this category. Check back soon for verified government news."
            actionHref="/news"
            actionLabel="View all news"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.items.map((article) => (
              <ArticleCard key={article._id as string} article={article as Parameters<typeof ArticleCard>[0]['article']} />
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
