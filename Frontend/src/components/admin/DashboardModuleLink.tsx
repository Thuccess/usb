import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface DashboardModuleLinkProps {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export default function DashboardModuleLink({ href, label, description, icon: Icon }: DashboardModuleLinkProps) {
  return (
    <Link
      href={href}
      className="content-card-hover group flex items-center gap-4 p-4 sm:p-5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon size={18} className="text-primary group-hover:text-white" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-primary-dark group-hover:text-primary transition-colors">{label}</p>
        <p className="text-xs text-muted truncate">{description}</p>
      </div>
      <ArrowUpRight size={16} className="text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" aria-hidden />
    </Link>
  );
}
