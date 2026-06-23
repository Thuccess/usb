import type { Metadata } from 'next';
import Link from 'next/link';
import { getProject } from '@/lib/api';
import { PROJECT_CATEGORY_LABELS } from '@/lib/utils';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import PageHeroBreadcrumb from '@/components/layout/PageHeroBreadcrumb';
import PageSection from '@/components/layout/PageSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await getProject(slug);
    return { title: `${project.title as string} | Development Projects` };
  } catch {
    return { title: 'Project Not Found' };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project: Record<string, unknown>;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  const budget = project.budget as number | undefined;
  const spent = (project.spent as number) || 0;
  const progress = budget ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const ministry = project.ministryId as { name: string } | undefined;

  return (
    <>
      <PageHero
        badge="Project Profile"
        title={project.title as string}
        subtitle={project.description as string}
        compact
        breadcrumb={
          <PageHeroBreadcrumb
            items={[
              { label: 'Projects', href: '/projects' },
              { label: project.county as string },
            ]}
          />
        }
      >
        <span className="page-hero-pill capitalize">{project.status as string}</span>
        <span className="page-hero-pill">{PROJECT_CATEGORY_LABELS[project.category as string]}</span>
      </PageHero>

      <PageSection band="white" narrow>
        {typeof project.featuredImage === 'string' && project.featuredImage ? (
          <img src={project.featuredImage} alt="" className="w-full rounded-xl mb-8 max-h-80 object-cover shadow-sm" />
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {budget ? (
            <div className="page-stat-card">
              <p className="text-xs text-muted mb-1 uppercase tracking-wide">Budget</p>
              <p className="font-bold text-xl text-primary-dark">${budget.toLocaleString()}</p>
            </div>
          ) : null}
          {budget ? (
            <div className="page-stat-card">
              <p className="text-xs text-muted mb-1 uppercase tracking-wide">Spent</p>
              <p className="font-bold text-xl text-primary-dark">${spent.toLocaleString()}</p>
            </div>
          ) : null}
          {typeof project.timeline === 'string' && project.timeline ? (
            <div className="page-stat-card">
              <p className="text-xs text-muted mb-1 uppercase tracking-wide">Timeline</p>
              <p className="font-bold text-lg text-primary-dark">{project.timeline}</p>
            </div>
          ) : null}
        </div>

        {budget ? (
          <div className="content-card p-6 mb-8">
            <div className="flex justify-between text-sm mb-3">
              <span className="font-semibold text-primary-dark">Budget Utilization</span>
              <span className="text-muted font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-black/10 rounded-full h-3">
              <div className="bg-primary h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}

        <div className="content-card p-6 sm:p-8 mb-8">
          <p className="text-muted leading-relaxed">{project.description as string}</p>
          {ministry && (
            <p className="text-sm text-muted mt-4 pt-4 border-t border-border">
              <span className="font-medium text-foreground">Ministry:</span> {ministry.name}
            </p>
          )}
        </div>

        {Array.isArray(project.photos) && project.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {(project.photos as string[]).map((photo, i) => (
              <img key={i} src={photo} alt="" className="rounded-xl object-cover h-48 w-full border border-border" />
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
