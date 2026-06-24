import type { Metadata } from 'next';
import { getSettings } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { Mail, Phone, Clock, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';
import ContactMap from '@/components/ContactMap';
import SocialLinks from '@/components/SocialLinks';

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

  const socialPlatforms = [
    socialLinks.facebook ? { label: 'Facebook', href: socialLinks.facebook, icon: Facebook } : null,
    socialLinks.twitter ? { label: 'Twitter', href: socialLinks.twitter, icon: Twitter } : null,
    socialLinks.youtube ? { label: 'YouTube', href: socialLinks.youtube, icon: Youtube } : null,
  ].filter(Boolean) as Array<{ label: string; href: string; icon: typeof Facebook }>;

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

            {socialPlatforms.length > 0 && (
              <div className="content-card p-6">
                <h3 className="font-bold text-lg mb-4">Social Media</h3>
                <SocialLinks className="gap-3" showLabels tone="light" links={socialPlatforms} />
              </div>
            )}
          </div>

          <div className="w-full">
            <ContactMap contact={contact} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
