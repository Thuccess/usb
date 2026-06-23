import type { Metadata } from 'next';
import { getArticle } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import PageHeroBreadcrumb from '@/components/layout/PageHeroBreadcrumb';
import PageSection from '@/components/layout/PageSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticle(slug);
    return {
      title: `${article.title as string} | Unity State Bentiu Website`,
      description: (article.excerpt as string) || '',
    };
  } catch {
    return { title: 'Article Not Found' };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  let article: Record<string, unknown>;
  try {
    article = await getArticle(slug);
  } catch {
    notFound();
  }

  const category = article.category as { name: string; slug: string } | undefined;
  const author = article.authorId as { name: string } | undefined;

  return (
    <>
      <PageHero
        badge="News Article"
        title={article.title as string}
        subtitle={(article.excerpt as string) || undefined}
        compact
        breadcrumb={
          <PageHeroBreadcrumb
            items={[
              { label: 'News', href: '/news' },
              ...(category ? [{ label: category.name, href: `/news?category=${category.slug}` }] : []),
            ]}
          />
        }
      />

      <PageSection band="white" narrow>
        <article className="content-card p-6 sm:p-8">
          {Boolean(article.isBreaking) && (
            <span className="inline-block breaking-badge text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase">
              Breaking News
            </span>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-6 pb-6 border-b border-border">
            {author && <span>By {author.name}</span>}
            {article.publishedAt ? <time>{formatDate(article.publishedAt as string)}</time> : null}
            {category && (
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {category.name}
              </span>
            )}
          </div>

          {typeof article.featuredImage === 'string' && article.featuredImage && (
            <img
              src={article.featuredImage as string}
              alt={article.title as string}
              className="w-full rounded-xl mb-8 max-h-96 object-cover"
            />
          )}

          <div
            className="prose-content text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body as string }}
          />

          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
              {(article.tags as string[]).map((tag) => (
                <span key={tag} className="bg-background border border-border text-muted text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </PageSection>
    </>
  );
}
