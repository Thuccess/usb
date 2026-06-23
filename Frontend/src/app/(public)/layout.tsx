import SkipLink from '@/components/SkipLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyAlertBanner from '@/components/EmergencyAlertBanner';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import { getHomeData } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let emergencyBanner = { active: false, level: 2, message: '' };
  let breakingNews: { _id: string; title: string; slug: string; category?: { slug: string } }[] = [];
  let contact = { address: '', email: '' };

  try {
    const data = await getHomeData();
    const settings = data.settings as Record<string, unknown>;
    emergencyBanner = (settings?.emergencyBanner as typeof emergencyBanner) || emergencyBanner;
    breakingNews = (data.breakingNews as typeof breakingNews) || [];
    const settingsContact = settings?.contact as { address?: string; email?: string } | undefined;
    contact = {
      address: settingsContact?.address || '',
      email: settingsContact?.email || '',
    };
  } catch {
    // API may be unavailable during build
  }

  return (
    <>
      <SkipLink />
      <EmergencyAlertBanner {...emergencyBanner} />
      <Header />
      {breakingNews.length > 0 && <BreakingNewsTicker items={breakingNews} />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer contact={contact} />
    </>
  );
}
