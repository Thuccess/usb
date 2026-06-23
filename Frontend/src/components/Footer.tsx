import Link from 'next/link';
import SiteLogo from '@/components/SiteLogo';
import { GOVERNOR_OFFICE_TITLE } from '@/lib/constants';
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Bell,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  contact?: {
    address?: string;
    email?: string;
  };
}

const quickLinks = [
  { href: '/news', label: 'News Center' },
  { href: '/notices', label: 'Public Notices' },
  { href: '/events', label: 'Events Calendar' },
  { href: '/governor', label: GOVERNOR_OFFICE_TITLE },
];

const serviceLinks = [
  { href: '/services', label: 'Digital Services Hub' },
  { href: '/projects', label: 'Development Projects' },
  { href: '/ministries', label: 'State Ministries' },
  { href: '/media', label: 'Media Center' },
];

const resourceLinks = [
  { href: '/about', label: 'About Unity State' },
  { href: '/feedback', label: 'Citizen Feedback' },
  { href: '/contact', label: 'Contact Us' },
];

const legalLinks = [
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/accessibility', label: 'Accessibility' },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 py-2.5 min-h-[44px] text-sm text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded-md"
      >
        <span className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-white group-hover:scale-125 transition-all shrink-0" aria-hidden />
        <span>{label}</span>
        <ArrowUpRight
          size={14}
          className="opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all shrink-0"
          aria-hidden
        />
      </Link>
    </li>
  );
}

export default function Footer({ contact }: FooterProps) {
  const address =
    contact?.address ||
    'Unity State Bentiu Website, Bentiu, Unity State, South Sudan';
  const email = contact?.email || 'info@mict.unitystate.gov.ss';

  return (
    <footer className="mt-auto bg-primary-dark text-white relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary-dark" aria-hidden />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl page-container pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <SiteLogo variant="footer" linked onDark className="mb-5" />

            <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-sm">
              Official digital nerve center for verified government information and public services across Unity State.
            </p>

            <address className="space-y-3 not-italic text-sm">
              <p className="flex items-start gap-2.5 text-white/70">
                <MapPin size={16} className="text-white shrink-0 mt-0.5" aria-hidden />
                <span>{address}</span>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <Mail size={16} className="text-white shrink-0" aria-hidden />
                  {email}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Quick Links</h4>
              <ul className="space-y-0.5">
                {quickLinks.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Services</h4>
              <ul className="space-y-0.5">
                {serviceLinks.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Resources</h4>
              <ul className="space-y-0.5">
                {resourceLinks.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full flex flex-col">
              <h4 className="font-semibold text-sm mb-2">Stay Informed</h4>
              <p className="text-sm text-white/65 leading-relaxed mb-4 flex-1">
                Get flood and security alerts delivered by SMS and email when connectivity allows.
              </p>
              <span className="inline-flex self-start items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-5">
                Coming in Phase 2
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/notices"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Bell size={16} aria-hidden />
                  View Notices
                </Link>
                <Link
                  href="/feedback"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
                >
                  <MessageSquare size={16} aria-hidden />
                  Send Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Unity State Bentiu Website. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                {link.label}
                <ExternalLink size={12} className="opacity-50" aria-hidden />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
