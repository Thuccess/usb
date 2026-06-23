'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

export default function AdminFeedbackPage() {
  const { apiFetch } = useAuth();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    apiFetch('/api/admin/feedback').then((r) => r.json()).then((j) => {
      if (j.success) setItems(j.data.items);
    });
  }, [apiFetch]);

  const updateStatus = async (id: string, status: string) => {
    await apiFetch(`/api/admin/feedback/${id}/status`, {
      method: 'PATCH', body: JSON.stringify({ status }),
    });
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Citizen Feedback</h1>
      <div className="space-y-4">
        {items.map((fb) => (
          <div key={fb._id as string} className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold">{fb.name as string}</p>
                <p className="text-xs text-muted capitalize">{fb.type as string} · {formatDate(fb.createdAt as string)}</p>
              </div>
              <select
                value={fb.status as string}
                onChange={(e) => updateStatus(fb._id as string, e.target.value)}
                className="text-sm border rounded-lg px-2 py-1"
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <p className="text-sm text-muted">{fb.message as string}</p>
            {(fb.email || fb.phone) ? (
              <p className="text-xs text-muted mt-2">{String(fb.email || '')} {String(fb.phone || '')}</p>
            ) : null}
          </div>
        ))}
        {items.length === 0 && <p className="text-muted">No feedback yet.</p>}
      </div>
    </div>
  );
}
