import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { formatDate } from '@/lib/utils';
import type { HomeEvent } from '@/components/home/types';

interface EventsSectionProps {
  events: HomeEvent[];
}

function EventDatePill({ date }: { date: string }) {
  const d = new Date(date);
  const day = d.toLocaleDateString('en-GB', { day: 'numeric' });
  const month = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();

  return (
    <div className="w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center shrink-0">
      <span className="text-lg font-bold text-primary leading-none">{day}</span>
      <span className="text-[10px] font-medium text-primary">{month}</span>
    </div>
  );
}

export default function EventsSection({ events }: EventsSectionProps) {
  return (
    <section className="section-band-white section-padding">
      <div className="max-w-7xl page-container">
        <SectionHeader title="Upcoming Events" href="/events" />
        {events.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
            <p className="text-muted mb-2">No upcoming events scheduled.</p>
            <Link
              href="/events"
              className="text-primary text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              View events calendar →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="flex flex-col sm:flex-row gap-4 bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary transition-colors"
              >
                <EventDatePill date={event.date} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{event.title}</h4>
                  {event.location && <p className="text-sm text-muted">{event.location}</p>}
                  <time className="text-xs text-primary font-medium">{formatDate(event.date)}</time>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
