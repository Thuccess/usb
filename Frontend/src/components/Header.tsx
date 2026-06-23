'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Search, MessageSquare, Bell } from 'lucide-react';
import SiteLogo from '@/components/SiteLogo';
import { GOVERNOR_NAV_LABEL, GOVERNOR_OFFICE_TITLE } from '@/lib/constants';

const navItems: { href: string; label: string; title?: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/governor', label: GOVERNOR_NAV_LABEL, title: GOVERNOR_OFFICE_TITLE },
  { href: '/ministries', label: 'Ministries' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeMobile();
    setSearchOpen(false);
  }, [pathname, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const searchForm = (className: string, id = 'header-search') => (
    <form onSubmit={handleSearch} className={className} role="search">
      <label htmlFor={id} className="sr-only">
        Search the portal
      </label>
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-3 text-muted pointer-events-none"
          aria-hidden
        />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, projects, notices..."
          className="w-full border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[44px]"
        />
      </div>
    </form>
  );

  return (
    <header
      className={`relative sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md border-b border-border' : 'shadow-sm'
      }`}
    >
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary-dark" aria-hidden />

      <div
        className={`bg-primary text-white text-xs transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="max-w-7xl page-container h-10 flex items-center">
          <span className="truncate font-medium tracking-wide">Unity State Bentiu Website</span>
        </div>
      </div>

      <div className="max-w-7xl page-container">
        <div className="flex items-center gap-4 py-3">
          <SiteLogo variant="header" linked className="shrink-0" />

          <div className="hidden md:flex flex-1 max-w-md mx-4">{searchForm('w-full')}</div>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <Link
              href="/notices"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Bell size={16} aria-hidden />
              Notices
            </Link>
            <Link
              href="/feedback"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors min-h-[44px] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <MessageSquare size={16} aria-hidden />
              Feedback
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2.5 hover:bg-primary/10 text-foreground hover:text-primary rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2.5 hover:bg-primary/10 text-foreground hover:text-primary rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {searchOpen && <div className="md:hidden pb-3">{searchForm('w-full', 'header-search-mobile')}</div>}
      </div>

      <nav className="hidden xl:block bg-primary-dark" aria-label="Main navigation">
        <div className="max-w-7xl page-container">
          <ul className="flex items-center flex-wrap">
            {navItems.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.title ?? link.label}
                    className={`relative block px-3 xl:px-4 py-3 text-xs xl:text-sm font-medium transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                      active
                        ? 'text-white bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 inset-x-4 h-0.5 bg-primary rounded-full" aria-hidden />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="xl:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={closeMobile}
            aria-label="Close menu"
          />
          <nav
            id="mobile-nav"
            className="xl:hidden absolute left-0 right-0 top-full z-50 bg-white border-t border-border shadow-xl max-h-[min(70vh,520px)] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="max-w-7xl page-container py-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  href="/notices"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-border rounded-xl hover:border-primary hover:bg-primary/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Bell size={16} aria-hidden />
                  Notices
                </Link>
                <Link
                  href="/feedback"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <MessageSquare size={16} aria-hidden />
                  Feedback
                </Link>
              </div>
              <ul className="space-y-1">
                {navItems.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        title={link.title}
                        className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          active
                            ? 'text-primary bg-primary/10 border-l-4 border-l-primary'
                            : 'text-foreground hover:bg-black/5 hover:text-primary'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
