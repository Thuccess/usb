'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { PROJECT_CATEGORIES, COUNTIES } from '@/lib/constants';

export default function ProjectEditorPage() {
  const { apiFetch } = useAuth();
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  const id = isNew ? null : (params.id as string);
  const [form, setForm] = useState({
    title: '', category: 'roads', description: '', budget: 0, spent: 0,
    timeline: '', status: 'planning', county: 'Bentiu', featuredImage: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/admin/projects/${id}`).then((r) => r.json()).then((j) => { if (j.success) setForm(j.data); });
  }, [apiFetch, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch(isNew ? '/api/admin/projects' : `/api/admin/projects/${id}`, {
      method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form),
    });
    router.push('/admin/projects');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Project' : 'Edit Project'}</h1>
      <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4 max-w-2xl">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-4 py-2" rows={4} />
        <div className="grid sm:grid-cols-2 gap-4">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded-lg px-4 py-2">
            {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className="border rounded-lg px-4 py-2">
            {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="border rounded-lg px-4 py-2">
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <input placeholder="Timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="border rounded-lg px-4 py-2" />
          <input type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) })} className="border rounded-lg px-4 py-2" />
          <input type="number" placeholder="Spent" value={form.spent} onChange={(e) => setForm({ ...form, spent: parseFloat(e.target.value) })} className="border rounded-lg px-4 py-2" />
        </div>
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
