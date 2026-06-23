import Link from 'next/link';
import { Globe, MapPin, FileText, GraduationCap, type LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const services: { title: string; href: string; description: string; icon: LucideIcon }[] = [
  { title: 'e-Services Gateway', href: '/services', description: 'Apply for permits and certificates online', icon: Globe },
  { title: 'Connectivity Map', href: '/services#connectivity', description: 'Mobile network coverage by county', icon: MapPin },
  { title: 'ICT Policy Library', href: '/services#policies', description: 'Official government ICT policies and directives', icon: FileText },
  { title: 'Digital Literacy', href: '/services#literacy', description: 'Training resources for citizens and schools', icon: GraduationCap },
];

export default function ServicesGrid() {
  return (
    <div>
      <SectionHeader title="Digital Services" href="/services" />
      <div className="card-grid">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary hover:shadow-md transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary" aria-hidden />
              </div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted mt-1 line-clamp-2">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
