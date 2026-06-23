import { getHomeData } from '@/lib/api';
import HeroSection from '@/components/home/HeroSection';
import TopStoriesSection from '@/components/home/TopStoriesSection';
import GovernorsDeskCard from '@/components/home/GovernorsDeskCard';
import ProjectsSection from '@/components/home/ProjectsSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import NoticesList from '@/components/home/NoticesList';
import MediaSection from '@/components/home/MediaSection';
import EventsSection from '@/components/home/EventsSection';
import EmergencySmsCallout from '@/components/home/EmergencySmsCallout';
import HomeErrorFallback from '@/components/home/HomeErrorFallback';
import PageSection from '@/components/layout/PageSection';
import {
  mapArticle,
  type HomeSettings,
  type HomeProject,
  type HomeNotice,
  type HomeEvent,
  type HomeGalleryItem,
} from '@/components/home/types';

export default async function HomePage() {
  let data: Record<string, unknown> = {};
  try {
    data = await getHomeData();
  } catch {
    return <HomeErrorFallback />;
  }

  const settings = (data.settings || {}) as HomeSettings;
  const topStories = ((data.topStories as Record<string, unknown>[]) || []).map(mapArticle);
  const featuredProjects = ((data.featuredProjects as Record<string, unknown>[]) || []) as HomeProject[];
  const publicNotices = ((data.publicNotices as Record<string, unknown>[]) || []) as HomeNotice[];
  const upcomingEvents = ((data.upcomingEvents as Record<string, unknown>[]) || []) as HomeEvent[];
  const latestPhotos = ((data.latestPhotos as Record<string, unknown>[]) || []) as HomeGalleryItem[];
  const latestVideos = ((data.latestVideos as Record<string, unknown>[]) || []) as HomeGalleryItem[];
  const latestGovernorSpeech = data.latestGovernorSpeech
    ? mapArticle(data.latestGovernorSpeech as Record<string, unknown>)
    : null;

  return (
    <div>
      <HeroSection />

      <PageSection band="muted">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TopStoriesSection articles={topStories} />
          <GovernorsDeskCard settings={settings} latestSpeech={latestGovernorSpeech} />
        </div>
      </PageSection>

      <ProjectsSection projects={featuredProjects} />

      <PageSection band="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServicesGrid />
          <NoticesList notices={publicNotices} />
        </div>
      </PageSection>

      <MediaSection videos={latestVideos} photos={latestPhotos} />
      <EventsSection events={upcomingEvents} />
      <EmergencySmsCallout />
    </div>
  );
}
