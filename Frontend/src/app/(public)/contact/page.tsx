import type { Metadata } from 'next';
import { getSettings } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { Mail, Phone, Clock, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Unity State Bentiu Website',
};

export default async function ContactPage() {
  let contact = {
    address: 'Unity State Bentiu Website, Bentiu, Unity State, South Sudan',
    phone: '+211 XXX XXX XXX',
    email: 'info@mict.unitystate.gov.ss',
    officeHours: 'Monday - Friday, 8:00 AM - 5:00 PM',
  };
  let socialLinks: Record<string, string> = {};

  try {
    const settings = await getSettings();
    contact = settings.contact as typeof contact;
    socialLinks = (settings.socialLinks as Record<string, string>) || {};
  } catch {
    // use defaults
  }

  const contactRows = [
    { icon: MapPin, label: 'Address', value: contact.address },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: 'Office Hours', value: contact.officeHours },
  ];

  return (
    <>
      <PageHero
        badge="Contact & Support"
        title="Contact Us"
        subtitle="Reach the Unity State Bentiu Website team and government headquarters in Bentiu."
      />

      <PageSection band="white">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="content-card p-6 sm:p-8">
              <h3 className="font-bold text-xl text-primary-dark mb-6">Government Headquarters</h3>
              <dl className="space-y-5">
                {contactRows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" aria-hidden />
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-muted uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="font-medium text-foreground">
                        {href ? (
                          <a href={href} className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {(socialLinks.facebook || socialLinks.twitter || socialLinks.youtube) && (
              <div className="content-card p-6">
                <h3 className="font-bold text-lg mb-4">Social Media</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary text-sm font-medium transition-colors">
                      <Facebook size={16} aria-hidden /> Facebook
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary text-sm font-medium transition-colors">
                      <Twitter size={16} aria-hidden /> Twitter
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary text-sm font-medium transition-colors">
                      <Youtube size={16} aria-hidden /> YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="content-card p-6 sm:p-8 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[360px] bg-gradient-to-br from-white to-primary/10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <MapPin size={32} className="text-primary" aria-hidden />
            </div>
            <p className="font-bold text-xl text-primary-dark">Bentiu, Unity State</p>
            <p className="text-muted mt-1">South Sudan</p>
            <span className="mt-6 inline-flex text-xs font-medium bg-white border border-border text-muted px-3 py-1.5 rounded-full">
              Interactive map — Phase 3
            </span>
          </div>
        </div>
      </PageSection>
    </>
  );
}
