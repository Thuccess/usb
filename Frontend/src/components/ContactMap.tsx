'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Building2, Clock, Loader2, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type ContactMapProps = {
  contact: {
    address?: string;
    phone?: string;
    email?: string;
    officeHours?: string;
  };
};

type LeafletModule = typeof import('leaflet');

const position: LatLngExpression = [9.2333, 29.8333];

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function ContactMap({ contact }: ContactMapProps) {
  const [leaflet, setLeaflet] = useState<LeafletModule | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    import('leaflet').then((mod) => {
      if (!mounted) return;
      setLeaflet(mod);
      setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const officeIcon = useMemo(() => {
    if (!leaflet) return undefined;

    return leaflet.divIcon({
      html: `<div class="map-office-pin"></div>`,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
  }, [leaflet]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address || 'Bentiu, Unity State, South Sudan')}`;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-background shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-primary/15 dark:via-slate-950/80 dark:to-primary/10" />

      <div className="relative h-[350px] sm:h-[450px] xl:h-[550px]">
        {ready && leaflet ? (
          <>
            <div className="absolute left-3 top-3 right-3 z-[1000] flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 p-3 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <MapPin size={16} aria-hidden />
                  <span>Bentiu, Unity State</span>
                </div>
                <p className="mt-1 text-sm text-muted">South Sudan</p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Building2 size={14} aria-hidden />
                Office location
              </div>
            </div>

            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom
              zoomControl
              attributionControl={false}
              className="h-full w-full"
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={officeIcon}>
                <Popup>
                  <div className="space-y-2 text-sm text-foreground">
                    <p className="font-semibold text-primary-dark">Unity State Government</p>
                    <p>{contact.address || 'Bentiu, Unity State, South Sudan'}</p>
                    {contact.phone && (
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Phone size={14} aria-hidden />
                        {contact.phone}
                      </a>
                    )}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Mail size={14} aria-hidden />
                        {contact.email}
                      </a>
                    )}
                    {contact.officeHours && (
                      <p className="flex items-center gap-2 text-muted">
                        <Clock size={14} aria-hidden />
                        {contact.officeHours}
                      </p>
                    )}
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                      <Navigation size={14} aria-hidden />
                      Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,93,91,0.12),_transparent_45%),linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(244,248,250,0.95))] p-6 dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,93,91,0.25),_transparent_45%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(30,41,59,0.95))]">
            <div className="rounded-2xl border border-border bg-white/85 p-6 text-center shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <Loader2 size={24} className="mx-auto animate-spin text-primary" aria-hidden />
              <p className="mt-3 text-sm font-medium text-foreground">Loading map…</p>
              <p className="mt-1 text-sm text-muted">Preparing Bentiu location details</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background: #f8fafc;
          font-family: inherit;
        }

        .leaflet-control-zoom {
          border: 1px solid rgba(15, 23, 42, 0.1) !important;
          border-radius: 999px !important;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
        }

        .leaflet-control-zoom a {
          color: #0f766e !important;
          background: white !important;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.14);
        }

        .leaflet-popup-content {
          margin: 14px 16px;
          min-width: 220px;
        }

        .map-office-pin {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f766e, #0b5e65);
          border: 3px solid white;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.25);
          position: relative;
        }

        .map-office-pin::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -8px;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #0b5e65;
        }
      `}</style>
    </div>
  );
}
