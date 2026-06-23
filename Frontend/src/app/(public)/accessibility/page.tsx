import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { Eye, Keyboard, MonitorSmartphone, Volume2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Unity State Bentiu Website',
  description:
    'Accessibility commitment, features, and support options for the Unity State Bentiu Website official government portal.',
};

const LAST_UPDATED = '2026-06-22';

const sections = [
  {
    id: 'commitment',
    title: 'Our Commitment',
    content: (
      <>
        <p>
          The Unity State Bentiu Website is committed to ensuring that all citizens — including people with disabilities
          — can access verified government information and public services. Accessibility is essential for inclusive
          governance, especially in a state where connectivity and devices vary widely across six counties.
        </p>
        <p>
          We design and maintain this Portal so that people using assistive technologies, low-bandwidth connections, or
          mobile devices can navigate news, notices, projects, and contact channels effectively.
        </p>
      </>
    ),
  },
  {
    id: 'standards',
    title: 'Accessibility Standards',
    content: (
      <>
        <p>
          We aim to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These international
          standards guide how we structure content, color contrast, keyboard access, and semantic markup across the site.
        </p>
        <p>Our ongoing work includes:</p>
        <ul>
          <li>Semantic HTML headings, landmarks, and labels for screen readers</li>
          <li>Sufficient color contrast using our white, blue, and black palette</li>
          <li>Visible focus indicators for keyboard navigation</li>
          <li>Responsive layouts from 320px mobile widths to large desktop screens</li>
          <li>Text alternatives for meaningful images and icons where required</li>
        </ul>
      </>
    ),
  },
  {
    id: 'features',
    title: 'Accessibility Features',
    content: (
      <>
        <p>The Portal includes the following accessibility-oriented features:</p>
        <ul>
          <li>
            <strong>Keyboard navigation</strong> — main navigation, search, filters, and forms can be operated without a
            mouse. Focus states are visible on interactive elements.
          </li>
          <li>
            <strong>Responsive design</strong> — content reflows for small screens; touch targets meet minimum size
            guidelines for mobile users.
          </li>
          <li>
            <strong>Reduced motion</strong> — animations such as news tickers and hero transitions respect the
            user&apos;s <code>prefers-reduced-motion</code> system setting.
          </li>
          <li>
            <strong>Clear structure</strong> — page heroes, section headers, and cards use consistent hierarchy so content
            is easy to scan.
          </li>
          <li>
            <strong>Form accessibility</strong> — labels, error messages, and input fields are associated for assistive
            technology on feedback and search forms.
          </li>
          <li>
            <strong>Skip-friendly layout</strong> — logical heading order and landmark regions help users move efficiently
            through each page.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'assistive-technology',
    title: 'Assistive Technology Support',
    content: (
      <>
        <p>
          We test the Portal with modern browsers and commonly used assistive technologies, including screen readers and
          browser zoom up to 200%. Supported browsers include recent versions of Chrome, Firefox, Safari, and Edge.
        </p>
        <p>
          If you use specialized assistive software and encounter difficulty, please tell us which browser, device, and
          tool you are using so we can investigate and improve support.
        </p>
      </>
    ),
  },
  {
    id: 'known-limitations',
    title: 'Known Limitations',
    content: (
      <>
        <p>
          We are continuously improving accessibility. Some areas may not yet fully meet WCAG 2.1 Level AA, including:
        </p>
        <ul>
          <li>Embedded third-party media or documents that may not include full captions or accessible PDF tagging</li>
          <li>Legacy uploaded content in the media center pending review and remediation</li>
          <li>Interactive maps and advanced e-services planned for future phases</li>
          <li>Some PDF downloads that may not yet be optimized for screen readers</li>
        </ul>
        <p>
          When we publish new features — such as emergency alerts, e-services, or digital literacy modules — accessibility
          review is part of our release process.
        </p>
      </>
    ),
  },
  {
    id: 'feedback',
    title: 'Feedback & Accommodation Requests',
    content: (
      <>
        <p>
          We welcome feedback from citizens, civil society, and disability advocates. If you experience a barrier on this
          website, or need information in an alternative format, please contact us with:
        </p>
        <ul>
          <li>The page URL where you encountered the issue</li>
          <li>A description of the problem</li>
          <li>Your browser, device, and assistive technology (if applicable)</li>
        </ul>
        <p>
          Submit feedback through the{' '}
          <Link href="/feedback" className="text-primary hover:underline">
            Citizen Feedback Center
          </Link>{' '}
          or email{' '}
          <a href="mailto:info@mict.unitystate.gov.ss" className="text-primary hover:underline">
            info@mict.unitystate.gov.ss
          </a>
          . We aim to acknowledge accessibility reports within five working days.
        </p>
      </>
    ),
  },
  {
    id: 'enforcement',
    title: 'Compliance & Review',
    content: (
      <>
        <p>
          Accessibility is reviewed as part of regular website updates, responsive design improvements, and new service
          launches. The Unity State Bentiu Website team coordinates with ministry content owners to remediate reported
          issues.
        </p>
        <p>
          This statement is reviewed periodically and updated when significant changes are made to the Portal or its
          accessibility posture.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <>
        <p>For accessibility questions or accommodation requests:</p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:info@mict.unitystate.gov.ss" className="text-primary hover:underline">
              info@mict.unitystate.gov.ss
            </a>
          </li>
          <li>
            Web:{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>
          </li>
          <li>
            Address: Unity State Bentiu Website, Bentiu, Unity State, South Sudan
          </li>
        </ul>
      </>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      badge="Inclusive Access"
      title="Accessibility Statement"
      subtitle="Our commitment to making verified government information and digital services usable by all citizens across Unity State."
      lastUpdated={LAST_UPDATED}
      highlights={[
        {
          icon: Eye,
          title: 'WCAG 2.1 AA target',
          description: 'We follow international guidelines for contrast, structure, and perceivable content.',
        },
        {
          icon: Keyboard,
          title: 'Keyboard friendly',
          description: 'Navigate menus, filters, and forms using keyboard focus with visible indicators.',
        },
        {
          icon: MonitorSmartphone,
          title: 'Mobile first',
          description: 'Responsive layouts and touch targets support citizens on phones and low-bandwidth connections.',
        },
        {
          icon: Volume2,
          title: 'Assistive tech',
          description: 'Semantic markup and labels support screen readers and browser zoom up to 200%.',
        },
      ]}
      sections={sections}
      relatedLinks={[
        {
          href: '/privacy',
          label: 'Privacy Policy',
          description: 'How we handle personal information submitted through the Portal.',
        },
        {
          href: '/feedback',
          label: 'Report an Issue',
          description: 'Tell us about accessibility barriers or request information in another format.',
        },
        {
          href: '/contact',
          label: 'Contact Us',
          description: 'Reach the Unity State Bentiu Website team directly.',
        },
        {
          href: '/services',
          label: 'Digital Services Hub',
          description: 'Explore ICT-enabled public services and upcoming e-government features.',
        },
      ]}
    />
  );
}
