const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...(options?.cache === undefined && !options?.method ? { next: { revalidate: 60 } } : {}),
  });

  const json: ApiResult<T> = await res.json();
  if (!json.success) {
    throw new Error(json.error || 'API request failed');
  }
  return json.data as T;
}

export async function getHomeData() {
  return fetchApi<Record<string, unknown>>('/api/public/home');
}

export async function getArticles(params?: { page?: number; category?: string }) {
  const search = new URLSearchParams();
  if (params?.page) search.set('page', String(params.page));
  if (params?.category) search.set('category', params.category);
  const q = search.toString();
  return fetchApi<{ items: Record<string, unknown>[]; total: number }>(
    `/api/public/articles${q ? `?${q}` : ''}`
  );
}

export async function getArticle(slug: string) {
  return fetchApi<Record<string, unknown>>(`/api/public/articles/${slug}`);
}

export async function getCategories() {
  return fetchApi<Record<string, unknown>[]>('/api/public/categories');
}

export async function getMinistries() {
  return fetchApi<Record<string, unknown>[]>('/api/public/ministries');
}

export async function getMinistry(slug: string) {
  return fetchApi<Record<string, unknown>>(`/api/public/ministries/${slug}`);
}

export async function getProjects(params?: Record<string, string>) {
  const search = new URLSearchParams(params);
  const q = search.toString();
  return fetchApi<Record<string, unknown>[]>(`/api/public/projects${q ? `?${q}` : ''}`);
}

export async function getProject(slug: string) {
  return fetchApi<Record<string, unknown>>(`/api/public/projects/${slug}`);
}

export async function getEvents(upcoming = true) {
  return fetchApi<Record<string, unknown>[]>(
    `/api/public/events${upcoming ? '?upcoming=true' : ''}`
  );
}

export async function getNotices(type?: string) {
  return fetchApi<Record<string, unknown>[]>(
    `/api/public/notices${type ? `?type=${type}` : ''}`
  );
}

export async function getGalleries(type?: string) {
  return fetchApi<Record<string, unknown>[]>(
    `/api/public/galleries${type ? `?type=${type}` : ''}`
  );
}

export async function getGallery(id: string) {
  return fetchApi<Record<string, unknown>>(`/api/public/galleries/${id}`);
}

export async function getDocuments() {
  return fetchApi<Record<string, unknown>[]>('/api/public/documents');
}

export async function getSettings() {
  return fetchApi<Record<string, unknown>>('/api/public/settings');
}

export async function submitFeedback(data: Record<string, string>) {
  return fetchApi<unknown>('/api/admin/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
  });
}

export async function searchContent(q: string) {
  return fetchApi<Record<string, unknown[]>>(`/api/public/search?q=${encodeURIComponent(q)}`);
}

export { API_URL };
