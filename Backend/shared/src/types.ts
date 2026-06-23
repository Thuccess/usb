export type UserRole =
  | 'visitor'
  | 'journalist'
  | 'editor'
  | 'admin'
  | 'radio_operator';

export type ArticleStatus = 'draft' | 'review' | 'published';

export type NoticeType =
  | 'recruitment'
  | 'holiday'
  | 'security'
  | 'health'
  | 'directive'
  | 'flood'
  | 'tender'
  | 'general';

export type ProjectStatus = 'planning' | 'active' | 'completed';

export type ProjectCategory =
  | 'roads'
  | 'schools'
  | 'hospitals'
  | 'water'
  | 'agriculture'
  | 'youth'
  | 'women'
  | 'flood_resilience';

export type FeedbackType = 'complaint' | 'question' | 'suggestion' | 'misinformation';

export type FeedbackStatus = 'new' | 'in_progress' | 'resolved';

export type GalleryType = 'photo' | 'video';

export type EmergencyLevel = 1 | 2 | 3;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface SiteSettings {
  streamUrl: string;
  governorMessage: string;
  governorName: string;
  governorTitle: string;
  governorImage: string;
  emergencyBanner: {
    active: boolean;
    level: EmergencyLevel;
    message: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    officeHours: string;
  };
}

export interface HomePageData {
  breakingNews: ArticleSummary[];
  topStories: ArticleSummary[];
  featuredProjects: ProjectSummary[];
  publicNotices: NoticeSummary[];
  upcomingEvents: EventSummary[];
  latestVideos: GallerySummary[];
  latestPhotos: GallerySummary[];
  settings: SiteSettings;
}

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category?: { name: string; slug: string };
  publishedAt?: string;
  isBreaking?: boolean;
}

export interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  county: string;
  featuredImage?: string;
}

export interface NoticeSummary {
  _id: string;
  title: string;
  type: NoticeType;
  priority: number;
  createdAt: string;
}

export interface EventSummary {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
}

export interface GallerySummary {
  _id: string;
  title: string;
  type: GalleryType;
  coverImage?: string;
  itemCount: number;
}

export interface MinistrySummary {
  _id: string;
  name: string;
  slug: string;
  mandate: string;
  logo?: string;
}

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}
