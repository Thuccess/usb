'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { formatDate, getInitials } from '@/lib/utils';
import DashboardStatCard from '@/components/admin/DashboardStatCard';
import DashboardQuickAction from '@/components/admin/DashboardQuickAction';
import DashboardModuleLink from '@/components/admin/DashboardModuleLink';
import {
  Bell,
  Calendar,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Hammer,
  Image,
  MessageSquare,
  Newspaper,
  Radio,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const FEEDBACK_TYPE_LABELS: Record<string, string> = {
  complaint: 'Complaint',
  question: 'Question',
  suggestion: 'Suggestion',
  misinformation: 'Misinformation',
};

export default function AdminDashboard() {
  const { apiFetch, user } = useAuth();
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsAvailable, setStatsAvailable] = useState(false);

  const canViewStats = user?.role === 'admin' || user?.role === 'editor';

  useEffect(() => {
    if (!canViewStats) {
      setLoading(false);
      return;
    }

    apiFetch('/api/admin/dashboard/stats')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setStats(json.data);
          setStatsAvailable(true);
        }
      })
      .finally(() => setLoading(false));
  }, [apiFetch, canViewStats]);

  const greeting = useMemo(() => getGreeting(), []);
  interface FeedbackItem {
    _id: string;
    name: string;
    message: string;
    type: string;
    createdAt?: string;
  }
  
  const recentFeedback: FeedbackItem[] =
    (stats?.recentFeedback as FeedbackItem[] | undefined) ?? [];


  const statCards = [
    {
      label: 'Pending review',
      value: (stats?.pendingReview as number | undefined) ?? '—',
      icon: ClipboardCheck,
      href: '/admin/articles',
      accent: 'primary' as const,
    },
    {
      label: 'Published articles',
      value: (stats?.totalArticles as number | undefined) ?? '—',
      icon: FileText,
      href: '/admin/articles',
      accent: 'muted' as const,
    },
    {
      label: 'New feedback',
      value: (stats?.newFeedback as number | undefined) ?? '—',
      icon: MessageSquare,
      href: '/admin/feedback',
      accent: 'dark' as const,
    },
  ];

  const quickActions = [
    {
      href: '/admin/articles/new',
      label: 'New article',
      description: 'Draft and publish verified government news',
      icon: Newspaper,
      variant: 'primary' as const,
    },
    {
      href: '/admin/notices',
      label: 'Post notice',
      description: 'Publish alerts, directives, and announcements',
      icon: Bell,
    },
    {
      href: '/admin/settings',
      label: 'Site settings',
      description: 'Update portal branding and contact details',
      icon: Settings,
    },
    {
      href: '/',
      label: 'View public portal',
      description: 'Open the live website in a new tab',
      icon: ExternalLink,
      external: true,
    },
  ];

  const contentModules = [
    { href: '/admin/articles', label: 'Articles', description: 'News and official updates', icon: FileText },
    { href: '/admin/notices', label: 'Notices', description: 'Public alerts and directives', icon: Bell },
    { href: '/admin/projects', label: 'Projects', description: 'Development and infrastructure', icon: Hammer },
    { href: '/admin/events', label: 'Events', description: 'Government calendar entries', icon: Calendar },
    { href: '/admin/galleries', label: 'Galleries', description: 'Photos and video archives', icon: Image },
    { href: '/admin/feedback', label: 'Feedback', description: 'Citizen messages and requests', icon: MessageSquare },
  ];

  const roleModules =
    user?.role === 'radio_operator'
      ? [{ href: '/admin/radio', label: 'Radio streams', description: 'Manage live broadcast channels', icon: Radio }]
      : user?.role === 'journalist'
        ? [
            { href: '/admin/articles', label: 'Articles', description: 'Create and submit news drafts', icon: FileText },
            { href: '/admin/categories', label: 'Categories', description: 'Browse content categories', icon: Newspaper },
          ]
        : contentModules;

  return (
    <div className="max-w-6xl">
      <section className="admin-dashboard-hero relative overflow-hidden rounded-2xl border border-border mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary/90" aria-hidden />
        <div className="hero-pattern absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative p-6 sm:p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <ShieldCheck size={14} aria-hidden />
                MICT Admin CMS
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {greeting}, {user?.name?.split(' ')[0] || 'Staff member'}
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed">
                Manage verified government content and public services for the Unity State Bentiu Website.
              </p>
              <p className="text-white/50 text-xs mt-3 capitalize">
                Signed in as {user?.role?.replace('_', ' ')}
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 self-start lg:self-center bg-white text-primary-dark hover:bg-white/90 font-semibold text-sm px-5 py-3 rounded-xl min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <ExternalLink size={16} aria-hidden />
              View live portal
            </Link>
          </div>
        </div>
      </section>

      {canViewStats && (
        <section className="mb-8" aria-label="Dashboard statistics">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-bold text-primary-dark border-l-4 border-primary pl-3">Overview</h2>
            {!loading && statsAvailable && (
              <span className="text-xs text-muted hidden sm:inline">Updated on page load</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {statCards.map((card) => (
              <DashboardStatCard key={card.label} {...card} loading={loading} />
            ))}
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <section className="lg:col-span-2 content-card p-5 sm:p-6">
          <h2 className="font-bold text-primary-dark mb-1">Quick actions</h2>
          <p className="text-sm text-muted mb-5">Common tasks to keep the portal up to date.</p>
          <div className="grid grid-cols-1 gap-3">
            {(user?.role === 'radio_operator'
              ? [
                  {
                    href: '/admin/radio',
                    label: 'Manage radio',
                    description: 'Configure live broadcast streams',
                    icon: Radio,
                    variant: 'primary' as const,
                  },
                  ...quickActions.filter((a) => a.external),
                ]
              : user?.role === 'journalist'
                ? quickActions.filter((a) => a.href.includes('articles') || a.external)
                : quickActions
            ).map((action) => (
              <DashboardQuickAction key={action.href + action.label} {...action} />
            ))}
          </div>
        </section>

        <section className="lg:col-span-3 content-card p-5 sm:p-6 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <h2 className="font-bold text-primary-dark mb-1">Recent feedback</h2>
              <p className="text-sm text-muted">Latest citizen messages from the public portal.</p>
            </div>
            {canViewStats && (
              <Link
                href="/admin/feedback"
                className="text-sm font-medium text-primary hover:underline shrink-0 min-h-[44px] inline-flex items-center"
              >
                View all →
              </Link>
            )}
          </div>

          {!canViewStats ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 bg-background rounded-xl border border-dashed border-border">
              <MessageSquare size={28} className="text-primary/40 mb-3" aria-hidden />
              <p className="text-sm text-muted max-w-xs">
                Feedback review is available to editors and administrators.
              </p>
            </div>
          ) : loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-3 p-3 rounded-xl bg-background">
                  <div className="w-10 h-10 rounded-full bg-black/10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-black/10 rounded" />
                    <div className="h-3 w-full bg-black/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentFeedback.length > 0 ? (
            <ul className="space-y-3 flex-1">
              {recentFeedback.map((fb: FeedbackItem) => {
  const initials = getInitials(fb.name);
  const type = fb.type;

  return (
    <li
      key={fb._id}
      className="flex gap-3 p-3 sm:p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors"
    >
      <div
        className="w-10 h-10 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0"
        aria-hidden
      >
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="font-semibold text-sm text-primary-dark">
            {fb.name}
          </p>

          <span className="text-[11px] font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {FEEDBACK_TYPE_LABELS[type] || type}
          </span>
        </div>

        <p className="text-sm text-muted line-clamp-2 leading-relaxed">
          {fb.message}
        </p>

        {fb.createdAt ? (
          <p className="text-xs text-muted mt-1.5">
            {formatDate(fb.createdAt)}
          </p>
        ) : null}
      </div>
    </li>
  );
})}
            </ul>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4 bg-background rounded-xl border border-dashed border-border">
              <MessageSquare size={28} className="text-primary/40 mb-3" aria-hidden />
              <p className="text-sm font-medium text-primary-dark mb-1">No recent feedback</p>
              <p className="text-sm text-muted max-w-xs">
                Citizen messages will appear here when submitted through the public portal.
              </p>
            </div>
          )}
        </section>
      </div>

      <section aria-label="Content modules">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-primary-dark border-l-4 border-primary pl-3">
            {user?.role === 'admin' ? 'Manage content' : 'Your workspace'}
          </h2>
          {user?.role === 'admin' && (
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline min-h-[44px]"
            >
              <Users size={16} aria-hidden />
              Users
            </Link>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleModules.map((module) => (
            <DashboardModuleLink key={module.href + module.label} {...module} />
          ))}
        </div>
      </section>
    </div>
  );
}
