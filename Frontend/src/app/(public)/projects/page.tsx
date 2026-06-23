import type { Metadata } from 'next';
import { getProjects } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import FilterChips from '@/components/FilterChips';
import EmptyState from '@/components/EmptyState';
import { PROJECT_CATEGORY_LABELS } from '@/lib/utils';
import { COUNTIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Development Projects | Unity State Bentiu Website',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; county?: string }>;
}) {
  const params = await searchParams;
  const projects = await getProjects({
    ...(params.category && { category: params.category }),
    ...(params.county && { county: params.county }),
  });

  const chips = [
    { href: '/projects', label: 'All', active: !params.category },
    ...Object.entries(PROJECT_CATEGORY_LABELS).map(([key, label]) => ({
      href: `/projects?category=${key}`,
      label,
      active: params.category === key,
    })),
  ];

  return (
    <>
      <PageHero
        badge="Infrastructure & Development"
        title="Development Projects"
        subtitle={`Track infrastructure, healthcare, education, and flood resilience projects across ${COUNTIES.length} Unity State counties.`}
      />

      <PageSection band="white">
        <FilterChips chips={chips} className="mb-8" />
        {projects.length === 0 ? (
          <EmptyState
            message="No projects found in this category yet. New public investments will appear here as they are published."
            actionHref="/projects"
            actionLabel="View all projects"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id as string} project={project as Parameters<typeof ProjectCard>[0]['project']} />
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
