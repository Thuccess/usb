import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: string;
    publishedAt?: string;
    isBreaking?: boolean;
    category?: { name: string; slug: string };
  };
  variant?: 'default' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const href = `/news/${article.category?.slug || 'general'}/${article.slug}`;
  const isFeatured = variant === 'featured';

  if (isFeatured) {
    return (
      <article className="sm:col-span-2 bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div className="grid sm:grid-cols-2 gap-0">
          {article.featuredImage && (
            <Link href={href} className="block overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-56 sm:h-full min-h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          )}
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              {article.category && (
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {article.category.name}
                </span>
              )}
              {article.isBreaking && (
                <span className="breaking-badge text-xs font-bold uppercase px-2 py-0.5 rounded">Breaking</span>
              )}
            </div>
            <Link href={href}>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {article.title}
              </h3>
            </Link>
            {article.excerpt && (
              <p className="text-sm text-muted line-clamp-3 mb-3">{article.excerpt}</p>
            )}
            {article.publishedAt && (
              <time className="text-xs text-muted">{formatDate(article.publishedAt)}</time>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {article.featuredImage && (
        <Link href={href}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {article.category && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
              {article.category.name}
            </span>
          )}
          {article.isBreaking && (
            <span className="breaking-badge text-xs font-bold uppercase px-2 py-0.5 rounded">Breaking</span>
          )}
        </div>
        <Link href={href}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
        </Link>
        {article.excerpt && (
          <p className="text-sm text-muted line-clamp-2 mb-2">{article.excerpt}</p>
        )}
        {article.publishedAt && (
          <time className="text-xs text-muted">{formatDate(article.publishedAt)}</time>
        )}
      </div>
    </article>
  );
}
