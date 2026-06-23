'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { PROJECT_CATEGORY_LABELS } from '@/lib/utils';
import { COUNTIES } from '@/lib/constants';
import type { HomeProject } from '@/components/home/types';

interface ProjectsSectionProps {
  projects: HomeProject[];
}

const FILTER_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'roads', label: 'Infrastructure' },
  { key: 'hospitals', label: 'Health' },
  { key: 'schools', label: 'Education' },
];

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="section-band-white section-padding">
      <div className="max-w-7xl page-container">
        <SectionHeader
          title="Development Projects"
          subtitle={`Tracked public investments across ${COUNTIES.length} counties`}
          href="/projects"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                filter === chip.key
                  ? 'bg-primary text-white'
                  : 'bg-black/5 text-foreground hover:bg-primary/10'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
            <p className="text-muted">No projects in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory sm:snap-none">
              {filtered.map((project) => (
                <div key={project._id} className="min-w-[280px] sm:min-w-0 snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            {filter !== 'all' && filtered.length > 0 && (
              <p className="text-xs text-muted mt-4 sm:hidden">
                Showing {PROJECT_CATEGORY_LABELS[filter] || filter} projects
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
