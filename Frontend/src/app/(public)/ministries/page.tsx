import type { Metadata } from 'next';
import Link from 'next/link';
import { getMinistries } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { Building2, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'State Ministries | Unity State Bentiu Website',
};

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <PageHero
        badge="State Ministries"
        title="State Ministries"
        subtitle="Unity State government ministries delivering public services across all six counties."
      />

      <PageSection band="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry) => (
            <Link
              key={ministry._id as string}
              href={`/ministries/${ministry.slug}`}
              className="content-card-hover p-6 group flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 size={26} className="text-primary" aria-hidden />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0"
                  aria-hidden
                />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-dark group-hover:text-primary transition-colors">
                {ministry.name as string}
              </h3>
              <p className="text-sm text-muted line-clamp-3 leading-relaxed flex-1">{ministry.mandate as string}</p>
            </Link>
          ))}
        </div>
      </PageSection>
    </>
  );
}
