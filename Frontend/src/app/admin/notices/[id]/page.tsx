'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { NOTICE_TYPES } from '@/lib/constants';

export default function NoticeEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const [form, setForm] = useState({ title: '', type: 'general', body: '', priority: 2 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/admin/notices/${id}`).then((r) => r.json()).then((j) => { if (j.success) setForm(j.data); });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(isNew ? '/api/admin/notices' : `/api/admin/notices/${id}`, {
      method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form),
    });
    router.push('/admin/notices');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Notice' : 'Edit Notice'}</h1>
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4 max-w-lg">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border rounded-lg px-4 py-2">
          {NOTICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <textarea required placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full border rounded-lg px-4 py-2" rows={5} />
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) })} className="w-full border rounded-lg px-4 py-2">
          <option value={1}>Priority 1 - Critical</option>
          <option value={2}>Priority 2 - Important</option>
          <option value={3}>Priority 3 - General</option>
        </select>
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
