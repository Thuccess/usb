import { z } from 'zod';
import {
  ARTICLE_STATUSES,
  FEEDBACK_TYPES,
  NOTICE_TYPES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  USER_ROLES,
} from './constants';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(USER_ROLES).default('journalist'),
  ministryId: z.string().optional(),
});

export const articleSchema = z.object({
  title: z.string().min(5).max(300),
  body: z.string().min(10),
  excerpt: z.string().max(500).optional(),
  categoryId: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  isBreaking: z.boolean().optional(),
  status: z.enum(ARTICLE_STATUSES).optional(),
});

export const articleUpdateSchema = articleSchema.partial();

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0).optional(),
});

export const ministrySchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(100).optional(),
  mandate: z.string().min(10),
  logo: z.string().url().optional().or(z.literal('')),
  contact: z
    .object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  order: z.number().int().min(0).optional(),
});

export const projectSchema = z.object({
  title: z.string().min(5).max(300),
  slug: z.string().min(2).max(100).optional(),
  category: z.enum(PROJECT_CATEGORIES),
  description: z.string().min(10),
  budget: z.number().min(0).optional(),
  spent: z.number().min(0).optional(),
  timeline: z.string().optional(),
  status: z.enum(PROJECT_STATUSES).default('planning'),
  photos: z.array(z.string()).optional(),
  county: z.string().min(2),
  ministryId: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
});

export const eventSchema = z.object({
  title: z.string().min(5).max(300),
  date: z.string().datetime().or(z.string()),
  location: z.string().min(2),
  description: z.string().min(10),
  category: z.string().optional(),
});

export const noticeSchema = z.object({
  title: z.string().min(5).max(300),
  type: z.enum(NOTICE_TYPES),
  body: z.string().min(10),
  priority: z.number().int().min(1).max(3).default(2),
  expiresAt: z.string().datetime().optional().or(z.literal('')),
});

export const gallerySchema = z.object({
  title: z.string().min(2).max(200),
  type: z.enum(['photo', 'video']),
  items: z
    .array(
      z.object({
        url: z.string().url(),
        caption: z.string().optional(),
        thumbnail: z.string().url().optional(),
      })
    )
    .optional(),
});

export const documentSchema = z.object({
  title: z.string().min(2).max(200),
  fileUrl: z.string().url(),
  category: z.string().optional(),
  ministryId: z.string().optional(),
});

export const feedbackSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  type: z.enum(FEEDBACK_TYPES),
  message: z.string().min(10).max(2000),
});

export const radioProgramSchema = z.object({
  title: z.string().min(2).max(200),
  host: z.string().min(2).max(100),
  schedule: z.object({
    day: z.string(),
    time: z.string(),
  }),
  description: z.string().optional(),
});

export const settingsSchema = z.object({
  streamUrl: z.string().url().optional(),
  governorMessage: z.string().optional(),
  governorName: z.string().optional(),
  governorTitle: z.string().optional(),
  governorImage: z.string().optional(),
  emergencyBanner: z
    .object({
      active: z.boolean(),
      level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      message: z.string(),
    })
    .optional(),
  socialLinks: z
    .object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
    })
    .optional(),
  contact: z
    .object({
      address: z.string(),
      phone: z.string(),
      email: z.string(),
      officeHours: z.string(),
    })
    .optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type MinistryInput = z.infer<typeof ministrySchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type GalleryInput = z.infer<typeof gallerySchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type RadioProgramInput = z.infer<typeof radioProgramSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
