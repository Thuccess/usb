'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function ArticleEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);

  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({
    title: '', body: '', excerpt: '', categoryId: '', featuredImage: '', tags: '', isBreaking: false,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch('/api/admin/categories').then((r) => r.json()).then((j) => {
      if (j.success) setCategories(j.data.items || j.data);
    });
  }, [apiFetch]);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/articles/${id}`).then((r) => r.json()).then((j) => {
      if (j.success) {
        const a = j.data;
        setForm({
          title: a.title,
          body: a.body,
          excerpt: a.excerpt || '',
          categoryId: a.categoryId?._id || a.categoryId || '',
          featuredImage: a.featuredImage || '',
          tags: (a.tags || []).join(', '),
          isBreaking: a.isBreaking || false,
        });
      }
      setLoading(false);
    });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    const res = await apiFetch(
      isNew ? '/api/articles' : `/api/articles/${id}`,
      { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(payload) }
    );
    const json = await res.json();
    setSaving(false);
    if (json.success) router.push('/admin/articles');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">
        {isNew ? 'New Article' : 'Edit Article'}
      </h1>
      <form onSubmit={handleSave} className="bg-white border border-border rounded-xl p-6 space-y-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-border rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
            className="w-full border border-border rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Body * (HTML supported)</label>
          <textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={12}
            className="w-full border border-border rounded-lg px-4 py-2 font-mono text-sm" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border border-border rounded-lg px-4 py-2">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id as string} value={c._id as string}>{c.name as string}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image URL</label>
            <input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              className="w-full border border-border rounded-lg px-4 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border border-border rounded-lg px-4 py-2" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isBreaking} onChange={(e) => setForm({ ...form, isBreaking: e.target.checked })} />
          <span className="text-sm font-medium">Breaking News</span>
        </label>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-border px-6 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
