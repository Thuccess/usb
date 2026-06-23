'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import AdminCrudList from '@/components/admin/AdminCrudList';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function AdminRadioPage() {
  const { apiFetch } = useAuth();
  const [streamUrl, setStreamUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch('/api/admin/settings').then((r) => r.json()).then((j) => {
      if (j.success) setStreamUrl(j.data.streamUrl || '');
    });
  }, [apiFetch]);

  const saveStreamUrl = async () => {
    setSaving(true);
    await apiFetch('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ streamUrl }),
    });
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Bentiu 99.0 FM</h1>

      <div className="bg-white border border-border rounded-xl p-6 mb-8 max-w-2xl">
        <h2 className="font-bold mb-4">Live Stream Configuration</h2>
        <label className="block text-sm font-medium mb-1">Stream URL (Icecast/Shoutcast)</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="https://stream.example.com/bentiu990"
            className="form-input flex-1"
          />
          <button onClick={saveStreamUrl} disabled={saving} className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] w-full sm:w-auto">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        <p className="text-xs text-muted mt-2">This URL powers the live radio player on the public portal.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-bold text-lg">Program Schedule</h2>
        <Link href="/admin/radio/new" className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm min-h-[44px] w-full sm:w-auto">
          <Plus size={16} /> Add Program
        </Link>
      </div>

      <AdminCrudList
        title=""
        endpoint="/api/admin/radio-programs"
        editHref={(id) => `/admin/radio/${id}`}
        canCreate={false}
        columns={[
          { key: 'title', label: 'Program' },
          { key: 'host', label: 'Host' },
          { key: 'schedule', label: 'Schedule', render: (i) => {
            const s = i.schedule as { day: string; time: string };
            return `${s.day} at ${s.time}`;
          }},
        ]}
      />
    </div>
  );
}
