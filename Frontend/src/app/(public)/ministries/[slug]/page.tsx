import type { Metadata } from 'next';
import Link from 'next/link';
import { getMinistry } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageHeroBreadcrumb from '@/components/layout/PageHeroBreadcrumb';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import ArticleCard from '@/components/ArticleCard';
import ProjectCard from '@/components/ProjectCard';
import EmptyState from '@/components/EmptyState';
import { notFound } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const data = await getMinistry(slug);
    const ministry = data.ministry as Record<string, unknown>;
    return { title: `${ministry.name as string} | Unity State` };
  } catch {
    return { title: 'Ministry Not Found' };
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data: Record<string, unknown>;
  try {
    data = await getMinistry(slug);
  } catch {
    notFound();
  }

  const ministry = data.ministry as Record<string, unknown>;
  const articles = (data.articles as Record<string, unknown>[]) || [];
  const projects = (data.projects as Record<string, unknown>[]) || [];
  const contact = ministry.contact as Record<string, string> | undefined;

  return (
    <>
      <PageHero
        badge="State Ministry"
        title={ministry.name as string}
        subtitle={ministry.mandate as string}
        breadcrumb={
          <PageHeroBreadcrumb
            items={[
              { label: 'Ministries', href: '/ministries' },
              { label: ministry.name as string },
            ]}
          />
        }
      />

      <PageSection band="white">
        {contact && (contact.email || contact.phone) && (
          <div className="content-card p-6 mb-12 flex flex-wrap gap-6">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Mail size={16} aria-hidden />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone size={16} aria-hidden />
                {contact.phone}
              </a>
            )}
          </div>
        )}

        {articles.length > 0 ? (
          <section className="mb-12">
            <SectionHeader title="Latest News" href="/news" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id as string} article={article as Parameters<typeof ArticleCard>[0]['article']} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            className="mb-12"
            message="No news articles from this ministry yet."
            actionHref="/news"
            actionLabel="Visit News Center"
          />
        )}

        {projects.length > 0 ? (
          <section>
            <SectionHeader title="Active Projects" href="/projects" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id as string} project={project as Parameters<typeof ProjectCard>[0]['project']} />
              ))}
            </div>
          </section>
        ) : null}
      </PageSection>
    </>
  );
}
