import type { Metadata } from 'next';
import { Globe, MapPin, FileText, GraduationCap, Bell } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

export const metadata: Metadata = {
  title: 'Digital Services Hub | Unity State Bentiu Website',
};

const services = [
  { id: 'eservices', icon: Globe, title: 'e-Services Gateway', desc: 'Online forms for birth/death registrations, business licenses, and service requests.', phase: 'Phase 3' },
  { id: 'connectivity', icon: MapPin, title: 'Connectivity Map', desc: 'Interactive map showing mobile network coverage, VSAT hubs, and public Wi-Fi hotspots.', phase: 'Phase 3' },
  { id: 'policies', icon: FileText, title: 'ICT Policy Repository', desc: 'Downloadable PDFs of state-level IT regulations and data privacy guidelines.', phase: 'Phase 3' },
  { id: 'literacy', icon: GraduationCap, title: 'Digital Literacy Library', desc: 'Training modules in Nuer, Dinka, and Arabic for community digital inclusion.', phase: 'Phase 3' },
  { id: 'alerts', icon: Bell, title: 'Emergency Alerts', desc: 'SMS, web push, and USSD emergency notification system.', phase: 'Phase 2' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Digital Services"
        title="Digital Services Hub"
        subtitle="ICT-enabled public services driving digital transformation across Unity State. Managed by Unity State Bentiu Website."
      />

      <PageSection band="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="content-card-hover p-6 h-full flex flex-col scroll-mt-24"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" aria-hidden />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-dark">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{service.desc}</p>
                <span
                  className={`inline-flex self-start text-xs font-semibold px-2.5 py-1 rounded-full ${
                    service.phase === 'Phase 2'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-black/5 text-muted'
                  }`}
                >
                  {service.phase}
                </span>
              </div>
            );
          })}
        </div>
      </PageSection>
    </>
  );
}
