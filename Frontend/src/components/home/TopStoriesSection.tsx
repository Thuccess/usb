import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/SectionHeader';
import type { HomeArticle } from '@/components/home/types';

interface TopStoriesSectionProps {
  articles: HomeArticle[];
}

export default function TopStoriesSection({ articles }: TopStoriesSectionProps) {
  const [featured, ...rest] = articles.slice(0, 4);

  return (
    <div className="lg:col-span-2">
      <SectionHeader title="Top Stories" href="/news" />
      {articles.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
          <p className="text-muted mb-4">No stories yet. Check back soon for verified government news.</p>
          <Link
            href="/news"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Visit News Center →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {featured && <ArticleCard article={featured} variant="featured" />}
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
