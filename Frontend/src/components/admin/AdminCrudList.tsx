'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface AdminCrudListProps {
  title: string;
  endpoint: string;
  columns: { key: string; label: string; render?: (item: Record<string, unknown>) => React.ReactNode }[];
  newHref?: string;
  editHref?: (id: string) => string;
  canCreate?: boolean;
  canDelete?: boolean;
}

export default function AdminCrudList({
  title,
  endpoint,
  columns,
  newHref,
  editHref,
  canCreate = true,
  canDelete = true,
}: AdminCrudListProps) {
  const { apiFetch } = useAuth();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    apiFetch(endpoint)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setItems(json.data.items || json.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [apiFetch, endpoint]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const res = await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) load();
  };

  return (
    <div>
      {(title || (canCreate && newHref)) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {title ? <h1 className="text-xl sm:text-2xl font-bold text-primary-dark">{title}</h1> : <span />}
          {canCreate && newHref && (
            <Link
              href={newHref}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark min-h-[44px] w-full sm:w-auto"
            >
              <Plus size={16} aria-hidden /> Add New
            </Link>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-muted py-8 bg-white border border-border rounded-xl">No items yet.</p>
      ) : (
        <>
          <div className="md:hidden space-y-3">
            {items.map((item) => (
              <div key={item._id as string} className="bg-white border border-border rounded-xl p-4 space-y-2">
                {columns.map((col) => (
                  <div key={col.key} className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-muted uppercase tracking-wide">{col.label}</span>
                    <span className="text-sm text-foreground break-words">
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {editHref && (
                    <Link
                      href={editHref(item._id as string)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-black/5 min-h-[44px]"
                    >
                      <Pencil size={16} aria-hidden /> Edit
                    </Link>
                  )}
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id as string)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 min-h-[44px]"
                    >
                      <Trash2 size={16} aria-hidden /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white border border-border rounded-xl overflow-hidden">
            <div className="admin-table-scroll">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-black/5 border-b border-border">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="text-left p-4 font-medium">{col.label}</th>
                    ))}
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id as string} className="border-t border-border hover:bg-black/5">
                      {columns.map((col) => (
                        <td key={col.key} className="p-4">
                          {col.render ? col.render(item) : String(item[col.key] ?? '')}
                        </td>
                      ))}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {editHref && (
                            <Link
                              href={editHref(item._id as string)}
                              className="p-2 hover:bg-black/5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                              aria-label="Edit"
                            >
                              <Pencil size={16} />
                            </Link>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id as string)}
                              className="p-2 hover:bg-primary/10 text-primary rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                              aria-label="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
