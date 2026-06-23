'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function EventEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '', category: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/admin/events/${id}`).then((r) => r.json()).then((j) => {
      if (j.success) setForm({ ...j.data, date: new Date(j.data.date).toISOString().slice(0, 16) });
    });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(isNew ? '/api/admin/events' : `/api/admin/events/${id}`, {
      method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form),
    });
    router.push('/admin/events');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Event' : 'Edit Event'}</h1>
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4 max-w-lg">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <input required type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-4 py-2" rows={4} />
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
