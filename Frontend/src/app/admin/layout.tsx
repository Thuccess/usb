'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import SiteLogo from '@/components/SiteLogo';
import { useCallback, useEffect, useState } from 'react';
import {
  LayoutDashboard, FileText, FolderOpen, Building2, Hammer,
  Calendar, Bell, Image, File, Radio, Users, Settings, LogOut, Menu, X,
} from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/ministries', label: 'Ministries', icon: Building2 },
  { href: '/admin/projects', label: 'Projects', icon: Hammer },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/notices', label: 'Notices', icon: Bell },
  { href: '/admin/galleries', label: 'Galleries', icon: Image },
  { href: '/admin/documents', label: 'Documents', icon: File },
  { href: '/admin/radio', label: 'Radio', icon: Radio },
  { href: '/admin/feedback', label: 'Feedback', icon: Bell },
  { href: '/admin/users', label: 'Users', icon: Users, adminOnly: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, adminOnly: true },
];

function SidebarNav({
  user,
  pathname,
  onNavigate,
  className,
}: {
  user: { name: string; role: string };
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className={className}>
      <div className="p-4 border-b border-white/10">
        <SiteLogo variant="compact" linked onDark className="mb-3" />
        <Link href="/admin" onClick={onNavigate} className="font-bold text-sm text-white/90 hover:text-white">
          MICT Admin CMS
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          if (item.adminOnly && user.role !== 'admin') return null;
          if (item.href === '/admin/radio' && !['admin', 'radio_operator'].includes(user.role)) return null;
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm min-h-[44px] ${
                active ? 'bg-white/20 font-medium' : 'hover:bg-white/10'
              }`}
            >
              <Icon size={16} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/60 mb-1">{user.name}</p>
        <p className="text-xs text-white/40 mb-3 capitalize">{user.role}</p>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push('/admin/login');
          }}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white min-h-[44px]"
        >
          <LogOut size={14} aria-hidden /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (pathname === '/admin/login') return <>{children}</>;

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  const allowedRoles = ['admin', 'editor', 'journalist', 'radio_operator'];
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-primary text-center">Access denied. Staff credentials required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <aside className="hidden lg:flex w-64 bg-primary-dark text-white shrink-0 flex-col">
        <SidebarNav user={user} pathname={pathname} className="flex flex-col h-full" />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-primary-dark text-white border-b border-white/10">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/admin" className="font-bold text-sm truncate">
              MICT Admin
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-white/10"
              aria-label="Open admin menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </header>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="lg:hidden fixed inset-0 z-50 bg-black/40"
              onClick={closeMobile}
              aria-label="Close admin menu"
            />
            <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-primary-dark text-white flex flex-col shadow-xl">
              <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
                <span className="font-bold text-sm">Menu</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-white/10"
                  aria-label="Close admin menu"
                >
                  <X size={22} />
                </button>
              </div>
              <SidebarNav
                user={user}
                pathname={pathname}
                onNavigate={closeMobile}
                className="flex flex-col flex-1 min-h-0"
              />
            </aside>
          </>
        )}

        <main className="flex-1 overflow-auto section-band-muted">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
