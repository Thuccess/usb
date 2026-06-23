export type HomeArticle = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  isBreaking?: boolean;
  category?: { name: string; slug: string };
};

export type HomeSettings = {
  governorMessage?: string;
  governorName?: string;
  governorTitle?: string;
  governorImage?: string;
  contact?: { address?: string; email?: string };
};

export type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  county: string;
  featuredImage?: string;
  budget?: number;
  spent?: number;
};

export type HomeNotice = {
  _id: string;
  title: string;
  type: string;
  priority?: number;
  createdAt?: string;
};

export type HomeEvent = {
  _id: string;
  title: string;
  date: string;
  location?: string;
  category?: string;
};

export type HomeGalleryItem = {
  _id: string;
  title: string;
  coverImage?: string;
  itemCount?: number;
};

export function mapArticle(raw: Record<string, unknown>): HomeArticle {
  const cat = (raw.categoryId || raw.category) as { name?: string; slug?: string } | undefined;
  return {
    _id: String(raw._id),
    title: String(raw.title),
    slug: String(raw.slug),
    excerpt: raw.excerpt as string | undefined,
    featuredImage: raw.featuredImage as string | undefined,
    publishedAt: raw.publishedAt as string | undefined,
    isBreaking: raw.isBreaking as boolean | undefined,
    category: cat?.slug ? { name: cat.name || '', slug: cat.slug } : undefined,
  };
}
