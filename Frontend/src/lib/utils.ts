export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  roads: 'Road Projects',
  schools: 'Schools',
  hospitals: 'Hospitals',
  water: 'Water Projects',
  agriculture: 'Agriculture',
  youth: 'Youth Projects',
  women: 'Women Empowerment',
  flood_resilience: 'Flood Resilience',
};

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** Badge on light backgrounds: blue tint + blue text */
const badgeLight = 'bg-primary/10 text-primary';
/** Badge on light backgrounds: black tint + black text */
const badgeNeutral = 'bg-black/5 text-foreground';
/** Badge on blue background: white text */
const badgeSolid = 'bg-primary text-white';

export const NOTICE_TYPE_COLORS: Record<string, string> = {
  recruitment: badgeLight,
  holiday: badgeNeutral,
  security: badgeSolid,
  health: badgeLight,
  directive: badgeNeutral,
  flood: badgeSolid,
  tender: badgeLight,
  general: badgeNeutral,
};

export const NOTICE_TYPE_LABELS: Record<string, string> = {
  recruitment: 'Recruitment',
  holiday: 'Public Holiday',
  security: 'Security Advisory',
  health: 'Health Alert',
  directive: 'Government Directive',
  flood: 'Flood Warning',
  tender: 'Tender',
  general: 'General Notice',
};

export const STATUS_COLORS: Record<string, string> = {
  planning: badgeNeutral,
  active: badgeLight,
  completed: badgeSolid,
  draft: badgeNeutral,
  review: badgeLight,
  published: badgeSolid,
};
