'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function EditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const endpoint = '/api/admin/ministries';
  const [form, setForm] = useState({ name: '', mandate: '', logo: '', order: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`${endpoint}/${id}`).then((r) => r.json()).then((j) => { if (j.success) setForm(j.data); });
  }, [apiFetch, id, endpoint]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(isNew ? endpoint : `${endpoint}/${id}`, { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form) });
    router.push('/admin/ministries');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Ministry' : 'Edit Ministry'}</h1>
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4 max-w-lg">
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <textarea required placeholder="Mandate" value={form.mandate} onChange={(e) => setForm({ ...form, mandate: e.target.value })} className="w-full border rounded-lg px-4 py-2" rows={4} />
        <input placeholder="Logo URL" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
