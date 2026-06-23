import type { Metadata } from 'next';
import { getEvents } from '@/lib/api';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/EmptyState';
import { formatDateTime } from '@/lib/utils';
import { MapPin, CalendarDays } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events Calendar | Unity State Bentiu Website',
};

export default async function EventsPage() {
  const events = await getEvents(false);

  return (
    <>
      <PageHero
        badge="Official Calendar"
        title="Events Calendar"
        subtitle="Official government meetings, public forums, and state ceremonies across Unity State."
      />

      <PageSection band="white" narrow>
        {events.length === 0 ? (
          <EmptyState
            message="No upcoming events scheduled. Check back for official government calendar updates."
            actionHref="/notices"
            actionLabel="View public notices"
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const date = new Date(event.date as string);
              return (
                <article
                  key={event._id as string}
                  className="content-card-hover p-6 flex flex-col sm:flex-row gap-6"
                >
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 text-center shrink-0 min-w-[88px] self-start shadow-md">
                    <p className="text-3xl font-bold leading-none">{date.getDate()}</p>
                    <p className="text-xs uppercase tracking-wide mt-1 opacity-90">
                      {date.toLocaleString('en', { month: 'short' })}
                    </p>
                    <p className="text-[10px] opacity-70 mt-0.5">{date.getFullYear()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-primary-dark mb-2">{event.title as string}</h3>
                    <p className="text-sm text-primary font-medium mb-2 flex items-center gap-1.5">
                      <CalendarDays size={14} aria-hidden />
                      {formatDateTime(event.date as string)}
                    </p>
                    <p className="text-sm text-muted mb-2 flex items-center gap-1.5">
                      <MapPin size={14} className="shrink-0 text-primary" aria-hidden />
                      {event.location as string}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">{event.description as string}</p>
                    {Boolean(event.category) && (
                      <span className="inline-block mt-3 text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        {String(event.category)}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </PageSection>
    </>
  );
}
