import type { Metadata } from 'next';
import { getGalleries, getDocuments } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { FileText, Image, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Media Center | Unity State Bentiu Website',
};

export default async function MediaPage() {
  const [photos, videos, documents] = await Promise.all([
    getGalleries('photo'),
    getGalleries('video'),
    getDocuments(),
  ]);

  return (
    <>
      <PageHero
        badge="Photos & Documents"
        title="Media Center"
        subtitle="Official photo galleries, video archives, and downloadable government documents."
      />

      <PageSection band="white">
        <SectionHeader title="Photo Galleries" />
        {photos.length === 0 ? (
          <EmptyState message="Photo galleries will be published here." className="mb-12" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {photos.map((gallery) => {
              const items = gallery.items as { url: string; caption?: string }[];
              return (
                <article
                  key={gallery._id as string}
                  className="content-card-hover overflow-hidden group"
                >
                  {items[0] ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={items[0].url}
                        alt={gallery.title as string}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                      <Image size={32} className="text-primary" aria-hidden />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-primary-dark">{gallery.title as string}</h4>
                    <p className="text-sm text-muted mt-1">{items.length} photos</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <SectionHeader title="Video Gallery" />
        {videos.length === 0 ? (
          <EmptyState message="Video content will appear here." className="mb-12" />
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {videos.map((gallery) => {
              const items = gallery.items as { url: string; caption?: string; thumbnail?: string }[];
              return (
                <article
                  key={gallery._id as string}
                  className="content-card-hover overflow-hidden group"
                >
                  {items[0]?.thumbnail ? (
                    <div className="relative">
                      <img src={items[0].thumbnail} alt="" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Video size={20} className="text-primary ml-0.5" aria-hidden />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                      <Video size={32} className="text-primary" aria-hidden />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-primary-dark">{gallery.title as string}</h4>
                    {items[0]?.caption && <p className="text-sm text-muted mt-1">{items[0].caption}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </PageSection>

      <PageSection band="muted" narrow>
        <SectionHeader title="Downloads & Documents" />
        {documents.length === 0 ? (
          <EmptyState message="Official documents and reports will be available for download here." />
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <a
                key={doc._id as string}
                href={doc.fileUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="content-card-hover flex items-center gap-4 p-4 group"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <FileText size={20} className="text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-primary-dark group-hover:text-primary transition-colors">{doc.title as string}</h4>
                  {Boolean(doc.category) && <p className="text-sm text-muted">{String(doc.category)}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
