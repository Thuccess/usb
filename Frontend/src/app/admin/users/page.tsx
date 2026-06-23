'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function AdminUsersPage() {
  const { apiFetch, user } = useAuth();
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'journalist' });
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    apiFetch('/api/admin/users').then((r) => r.json()).then((j) => {
      if (j.success) setUsers(j.data);
    });
  };

  useEffect(() => { if (user?.role === 'admin') load(); }, [apiFetch, user]);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ email: '', password: '', name: '', role: 'journalist' });
    load();
  };

  if (user?.role !== 'admin') return <p className="text-primary">Admin access required.</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary-dark">User Management</h1>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm min-h-[44px] w-full sm:w-auto"
        >
          Add User
        </button>
      </div>

      {showForm && (
        <form onSubmit={createUser} className="bg-white border border-border rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-input" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="form-input">
            <option value="journalist">Journalist</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrator</option>
            <option value="radio_operator">Radio Operator</option>
          </select>
          <button type="submit" className="sm:col-span-2 bg-primary text-white py-2.5 rounded-lg min-h-[44px]">Create User</button>
        </form>
      )}

      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div key={u._id as string} className="bg-white border border-border rounded-xl p-4 space-y-1">
            <p className="font-medium">{u.name as string}</p>
            <p className="text-sm text-muted break-all">{u.email as string}</p>
            <p className="text-sm capitalize">Role: {u.role as string}</p>
            <p className="text-sm">Active: {u.isActive ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white border border-border rounded-xl overflow-hidden">
        <div className="admin-table-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id as string} className="border-t border-border">
                  <td className="p-4">{u.name as string}</td>
                  <td className="p-4 text-muted">{u.email as string}</td>
                  <td className="p-4 capitalize">{u.role as string}</td>
                  <td className="p-4">{u.isActive ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
