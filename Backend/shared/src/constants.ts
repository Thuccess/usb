export const USER_ROLES = [
  'visitor',
  'journalist',
  'editor',
  'admin',
  'radio_operator',
] as const;

export const ARTICLE_STATUSES = ['draft', 'review', 'published'] as const;

export const NOTICE_TYPES = [
  'recruitment',
  'holiday',
  'security',
  'health',
  'directive',
  'flood',
  'tender',
  'general',
] as const;

export const PROJECT_STATUSES = ['planning', 'active', 'completed'] as const;

export const PROJECT_CATEGORIES = [
  'roads',
  'schools',
  'hospitals',
  'water',
  'agriculture',
  'youth',
  'women',
  'flood_resilience',
] as const;

export const NEWS_CATEGORIES = [
  'politics',
  'development',
  'education',
  'health',
  'agriculture',
  'economy',
  'security',
  'environment',
  'sports',
  'culture',
  'tech',
] as const;

export const COUNTIES = [
  'Rubkona',
  'Guit',
  'Mayom',
  'Leer',
  'Koch',
  'Panyijiar',
] as const;

export const FEEDBACK_TYPES = [
  'complaint',
  'question',
  'suggestion',
  'misinformation',
] as const;

export const DEFAULT_SETTINGS = {
  streamUrl: 'https://stream.example.com/bentiu990',
  governorMessage:
    'Building a Transparent, Resilient Unity State for all our citizens.',
  governorName: 'Governor of Unity State',
  governorTitle: 'The Office of Governor of Unity State',
  governorImage: '',
  emergencyBanner: {
    active: false,
    level: 2 as const,
    message: '',
  },
  socialLinks: {},
  contact: {
    address: 'Unity State Bentiu Website, Bentiu, Unity State, South Sudan',
    phone: '+211 XXX XXX XXX',
    email: 'info@mict.unitystate.gov.ss',
    officeHours: 'Monday - Friday, 8:00 AM - 5:00 PM',
  },
};
