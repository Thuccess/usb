'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function CategoryEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const [form, setForm] = useState({ name: '', slug: '', description: '', order: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/admin/categories/${id}`).then((r) => r.json()).then((j) => {
      if (j.success) setForm(j.data);
    });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(
      isNew ? '/api/admin/categories' : `/api/admin/categories/${id}`,
      { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form) }
    );
    router.push('/admin/categories');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Category' : 'Edit Category'}</h1>
      <form onSubmit={handleSave} className="bg-white border border-border rounded-xl p-6 space-y-4 max-w-lg">
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-4 py-2" />
        <input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full border rounded-lg px-4 py-2" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-4 py-2" rows={3} />
        <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
          className="w-full border rounded-lg px-4 py-2" />
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">{saving ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}
