import Link from 'next/link';
import { Play } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import type { HomeGalleryItem } from '@/components/home/types';

interface MediaSectionProps {
  videos: HomeGalleryItem[];
  photos: HomeGalleryItem[];
}

export default function MediaSection({ videos, photos }: MediaSectionProps) {
  const totalPhotos = photos.reduce((sum, p) => sum + (p.itemCount || 1), 0);

  return (
    <section className="section-band-muted section-padding">
      <div className="max-w-7xl page-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <SectionHeader title="Latest Videos" href="/media" />
            {videos.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
                <p className="text-muted text-sm">No videos available yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <Link
                    key={video._id}
                    href="/media"
                    className="flex gap-3 bg-card border border-border rounded-lg p-3 shadow-sm hover:border-primary hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="relative w-28 aspect-video bg-black/10 rounded overflow-hidden shrink-0">
                      {video.coverImage ? (
                        <img
                          src={video.coverImage}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <Play size={24} className="text-white fill-white" aria-hidden />
                      </span>
                    </div>
                    <span className="font-medium text-sm group-hover:text-primary transition-colors self-center min-w-0 line-clamp-2">
                      {video.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <SectionHeader title="Photo Gallery" href="/media" linkText="View gallery" />
            {photos.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
                <p className="text-muted text-sm">No photos available yet.</p>
              </div>
            ) : (
              <div className="relative">
                <div className="grid grid-cols-2 gap-2">
                  {photos.map((photo) => (
                    <Link
                      key={photo._id}
                      href="/media#gallery"
                      className="aspect-video bg-black/10 rounded-lg overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {photo.coverImage ? (
                        <img
                          src={photo.coverImage}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : null}
                    </Link>
                  ))}
                </div>
                {totalPhotos > 4 && (
                  <span className="absolute bottom-2 right-2 bg-primary-dark/90 text-white text-xs font-medium px-2 py-1 rounded">
                    +{totalPhotos - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
