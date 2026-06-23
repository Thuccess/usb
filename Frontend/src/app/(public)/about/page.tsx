import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import { COUNTIES } from '@/lib/constants';
import { MapPin, Users, Droplets, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Unity State | Unity State Bentiu Website',
  description: 'Learn about Unity State, South Sudan — history, profile, leadership, and government structure.',
};

const structureItems = [
  'The Office of Governor of Unity State',
  'State Council',
  'County Commissioners',
  'State Ministries',
  'Traditional Authorities',
  'Unity State Bentiu Website',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="State Profile"
        title="About Unity State"
        subtitle="South Sudan's foremost oil-producing state — home to nearly one million residents across six counties, with Bentiu as its capital."
      />

      <PageSection band="white">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <article className="content-card p-6 sm:p-8">
              <SectionHeader title="Overview" />
              <p className="text-muted leading-relaxed mb-4">
                Unity State is one of South Sudan&apos;s ten states, with Bentiu as its capital. Home to nearly one million residents,
                Unity State is the foremost oil-producing state in South Sudan and plays a critical role in the nation&apos;s economy.
              </p>
              <p className="text-muted leading-relaxed">
                The state faces significant geographic challenges including recurring seasonal flooding that can submerge up to 70%
                of the territory, making resilient communication infrastructure essential for citizen safety and governance.
              </p>
            </article>

            <article className="content-card p-6 sm:p-8">
              <SectionHeader title="Mission & Vision" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="page-stat-card border-l-4 border-l-primary">
                  <h4 className="font-semibold text-primary mb-2">Mission</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    To leverage Information and Communications Technology to build a resilient, inclusive, and accountable
                    government communication ecosystem integrating web, mobile, and satellite infrastructure.
                  </p>
                </div>
                <div className="page-stat-card border-l-4 border-l-primary">
                  <h4 className="font-semibold text-primary mb-2">Vision</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    To establish Unity State as South Sudan&apos;s model for transparent digital governance, where every citizen
                    has access to verified government information and digital public services.
                  </p>
                </div>
              </div>
            </article>

            <article className="content-card p-6 sm:p-8">
              <SectionHeader title="Government Structure" />
              <p className="text-muted text-sm mb-6 leading-relaxed">
                Unity State is administered through the Office of the Governor of Unity State, state ministries, and county administrations
                across six counties plus coordination with the Ruweng Administrative Area.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {structureItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground bg-background rounded-lg px-4 py-3 border border-border">
                    <span className="w-2 h-2 bg-primary rounded-full shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Building2 size={20} aria-hidden />
                State Profile
              </h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-white/70">Capital</dt>
                  <dd className="font-semibold">Bentiu</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-white/70">Population</dt>
                  <dd className="font-semibold">~1 million</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-white/70">Economy</dt>
                  <dd className="font-semibold">Oil production</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/70">Counties</dt>
                  <dd className="font-semibold">{COUNTIES.length}</dd>
                </div>
              </dl>
            </div>

            <div className="content-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-primary" aria-hidden />
                Counties
              </h3>
              <ul className="space-y-2">
                {COUNTIES.map((county) => (
                  <li key={county} className="text-sm text-muted flex items-center gap-2 py-1">
                    <span className="w-2 h-2 bg-primary rounded-full shrink-0" aria-hidden />
                    {county}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="page-stat-card text-center">
                <Users size={20} className="text-primary mx-auto mb-2" aria-hidden />
                <p className="text-xs text-muted">Residents</p>
                <p className="font-bold text-primary-dark">~1M</p>
              </div>
              <div className="page-stat-card text-center">
                <Droplets size={20} className="text-primary mx-auto mb-2" aria-hidden />
                <p className="text-xs text-muted">Oil State</p>
                <p className="font-bold text-primary-dark">#1 SS</p>
              </div>
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
