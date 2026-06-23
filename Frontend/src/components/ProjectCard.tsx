import Link from 'next/link';
import { PROJECT_CATEGORY_LABELS, STATUS_COLORS } from '@/lib/utils';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    status: string;
    county: string;
    featuredImage?: string;
    budget?: number;
    spent?: number;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = project.budget && project.spent
    ? Math.min(100, Math.round((project.spent / project.budget) * 100))
    : 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {project.featuredImage ? (
        <img src={project.featuredImage} alt={project.title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <span className="text-4xl">🏗️</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${STATUS_COLORS[project.status]}`}>
            {project.status}
          </span>
          <span className="text-xs text-muted">{project.county}</span>
        </div>
        <h3 className="font-semibold mb-1 line-clamp-2">{project.title}</h3>
        <p className="text-xs text-muted mb-3">{PROJECT_CATEGORY_LABELS[project.category] || project.category}</p>
        {project.budget ? (
          <div>
            <div className="flex justify-between text-xs text-muted mb-1">
              <span>Budget progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-black/10 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
