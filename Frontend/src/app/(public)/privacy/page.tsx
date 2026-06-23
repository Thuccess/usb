import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { Database, Lock, ShieldCheck, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Unity State Bentiu Website',
  description:
    'How the Unity State Bentiu Website collects, uses, and protects personal information submitted through official government digital services.',
};

const LAST_UPDATED = '2026-06-22';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: (
      <>
        <p>
          The Unity State Bentiu Website (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Portal&rdquo;) is the official digital
          platform of the Unity State government. This Privacy Policy explains how we handle information when you visit
          the website, use public services, or submit feedback through official channels.
        </p>
        <p>
          We are committed to transparency and responsible data stewardship. We collect only what is necessary to deliver
          government information, respond to citizen inquiries, and improve public digital services across Unity State.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: (
      <>
        <p>Depending on how you use the Portal, we may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Contact details</strong> — name, email address, phone number, and message content when you submit
            feedback or contact forms.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, browser type, device type, and general location (country/region)
            to understand how citizens access government information.
          </li>
          <li>
            <strong>Technical logs</strong> — IP address, timestamps, and error logs used for security monitoring and
            service reliability.
          </li>
          <li>
            <strong>Service submissions</strong> — information you provide when applying for or requesting digital
            government services as those features become available.
          </li>
        </ul>
        <p>
          We do not knowingly collect sensitive personal data beyond what is required for the service you request. Do not
          submit confidential information through general feedback forms unless specifically requested.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Information',
    content: (
      <>
        <p>We use collected information solely for legitimate government purposes, including:</p>
        <ul>
          <li>Delivering verified news, notices, and public information</li>
          <li>Responding to citizen feedback, complaints, and inquiries</li>
          <li>Operating and improving website performance and accessibility</li>
          <li>Protecting the Portal against fraud, abuse, and security threats</li>
          <li>Meeting legal obligations under Unity State and South Sudan law</li>
        </ul>
        <p>
          We do not sell personal information. We do not use citizen data for commercial advertising or unrelated
          marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: 'cookies-and-analytics',
    title: 'Cookies & Analytics',
    content: (
      <>
        <p>
          The Portal may use essential cookies required for basic functionality, such as maintaining session state for
          administrators and remembering accessibility preferences where supported.
        </p>
        <p>
          We may use privacy-conscious analytics to understand aggregate traffic patterns — for example, which pages are
          most visited during flood alert periods. Analytics data is used in summary form and is not linked to individual
          citizens unless you voluntarily identify yourself through a form submission.
        </p>
        <p>
          You can control cookie behavior through your browser settings. Disabling essential cookies may limit certain
          features of the website.
        </p>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing & Disclosure',
    content: (
      <>
        <p>We may share information only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Within government</strong> — with authorized Unity State ministries or departments when needed to
            respond to your request or deliver a public service.
          </li>
          <li>
            <strong>Service providers</strong> — with trusted technical partners who host or maintain the Portal under
            strict confidentiality and data protection agreements.
          </li>
          <li>
            <strong>Legal requirements</strong> — when required by law, court order, or to protect public safety and
            security.
          </li>
        </ul>
        <p>
          Any third-party links on this website (social media, external documents) are governed by their own privacy
          policies. Review those policies before submitting personal information elsewhere.
        </p>
      </>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: (
      <>
        <p>
          We apply administrative, technical, and organizational safeguards to protect information against unauthorized
          access, alteration, disclosure, or destruction. These include encrypted connections (HTTPS), access controls for
          administrative systems, and regular security reviews.
        </p>
        <p>
          No online system is completely secure. While we work to protect your information, we cannot guarantee absolute
          security of data transmitted over the internet. Submit sensitive information only through designated secure
          channels when they become available.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: (
      <>
        <p>As a citizen or visitor, you may have the right to:</p>
        <ul>
          <li>Request access to personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Ask questions about how your data is used in connection with Portal services</li>
          <li>Withdraw consent where processing is based on consent, subject to legal exceptions</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details in the Contact section below. We will respond within a
          reasonable timeframe in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: (
      <>
        <p>
          We retain personal information only as long as necessary to fulfill the purpose for which it was collected,
          comply with legal obligations, resolve disputes, and maintain accurate government records.
        </p>
        <p>
          Feedback submissions and contact inquiries are typically retained for administrative follow-up and audit
          purposes. Aggregated analytics data may be kept in anonymized form for service improvement.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy to reflect changes in technology, legal requirements, or government services.
          The &ldquo;Last updated&rdquo; date at the top of this page indicates when the policy was last revised.
        </p>
        <p>
          Material changes will be communicated through a notice on the Portal or via our public notices section where
          appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <>
        <p>
          For privacy-related questions, data access requests, or concerns about how your information is handled, contact
          the Unity State Bentiu Website team:
        </p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:info@mict.unitystate.gov.ss" className="text-primary hover:underline">
              info@mict.unitystate.gov.ss
            </a>
          </li>
          <li>
            Online:{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>
          </li>
          <li>
            Feedback:{' '}
            <Link href="/feedback" className="text-primary hover:underline">
              Citizen Feedback Center
            </Link>
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal & Compliance"
      title="Privacy Policy"
      subtitle="How the Unity State Bentiu Website collects, uses, and protects information submitted through official government digital channels."
      lastUpdated={LAST_UPDATED}
      highlights={[
        {
          icon: ShieldCheck,
          title: 'Official portal only',
          description: 'Data is handled for government public-service purposes — not sold or used for commercial advertising.',
        },
        {
          icon: Database,
          title: 'Minimal collection',
          description: 'We collect only what is needed to respond to inquiries, deliver services, and keep the site secure.',
        },
        {
          icon: Lock,
          title: 'Protected transmission',
          description: 'Connections to the Portal use encrypted HTTPS and administrative access is restricted.',
        },
        {
          icon: UserCheck,
          title: 'Your rights',
          description: 'You may request access to or correction of personal information we hold about you.',
        },
      ]}
      sections={sections}
      relatedLinks={[
        {
          href: '/accessibility',
          label: 'Accessibility Statement',
          description: 'Learn about our commitment to inclusive design and WCAG-aligned digital access.',
        },
        {
          href: '/feedback',
          label: 'Citizen Feedback',
          description: 'Report concerns or ask questions about government digital services.',
        },
        {
          href: '/contact',
          label: 'Contact Us',
          description: 'Reach the Unity State Bentiu Website team in Bentiu.',
        },
        {
          href: '/notices',
          label: 'Public Notices',
          description: 'Official government announcements and policy updates.',
        },
      ]}
    />
  );
}
