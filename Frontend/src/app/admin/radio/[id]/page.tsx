'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function RadioProgramEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const [form, setForm] = useState({ title: '', host: '', schedule: { day: 'Monday', time: '08:00 AM' }, description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/admin/radio-programs/${id}`).then((r) => r.json()).then((j) => { if (j.success) setForm(j.data); });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(isNew ? '/api/admin/radio-programs' : `/api/admin/radio-programs/${id}`, {
      method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form),
    });
    router.push('/admin/radio');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Program' : 'Edit Program'}</h1>
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4 max-w-lg">
        <input required placeholder="Program Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <input required placeholder="Host" value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <input required placeholder="Day" value={form.schedule.day} onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, day: e.target.value } })} className="w-full border rounded-lg px-4 py-2" />
        <input required placeholder="Time" value={form.schedule.time} onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, time: e.target.value } })} className="w-full border rounded-lg px-4 py-2" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-4 py-2" rows={3} />
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
