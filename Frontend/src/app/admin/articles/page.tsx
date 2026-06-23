'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { Plus, Check, X, Send } from 'lucide-react';
import { STATUS_COLORS } from '@/lib/utils';

export default function AdminArticlesPage() {
  const { apiFetch, user } = useAuth();
  const [articles, setArticles] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    apiFetch('/api/articles?limit=50')
      .then((r) => r.json())
      .then((json) => { if (json.success) setArticles(json.data.items); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [apiFetch]);

  const action = async (id: string, act: string) => {
    await apiFetch(`/api/articles/${id}/${act}`, { method: 'POST' });
    load();
  };

  const canReview = user?.role === 'admin' || user?.role === 'editor';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary-dark">Articles</h1>
        <Link href="/admin/articles/new" className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] w-full sm:w-auto">
          <Plus size={16} aria-hidden /> New Article
        </Link>
      </div>

      {loading ? <p className="text-muted">Loading...</p> : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="admin-table-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Author</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => {
                const author = a.authorId as { name: string } | undefined;
                return (
                  <tr key={a._id as string} className="border-t border-border">
                    <td className="p-4">
                      <Link href={`/admin/articles/${a._id}`} className="font-medium hover:text-primary">
                        {a.title as string}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[a.status as string]}`}>
                        {a.status as string}
                      </span>
                    </td>
                    <td className="p-4 text-muted">{author?.name}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {a.status === 'draft' && (
                          <button onClick={() => action(a._id as string, 'submit')} title="Submit for review" className="p-1.5 hover:bg-primary/10 text-primary rounded">
                            <Send size={16} />
                          </button>
                        )}
                        {a.status === 'review' && canReview && (
                          <>
                            <button onClick={() => action(a._id as string, 'approve')} title="Approve" className="p-1.5 hover:bg-primary/10 text-primary rounded">
                              <Check size={16} />
                            </button>
                            <button onClick={() => action(a._id as string, 'reject')} title="Reject" className="p-1.5 hover:bg-primary/10 text-primary rounded">
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
