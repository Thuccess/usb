'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function AdminSettingsPage() {
  const { apiFetch } = useAuth();
  const [form, setForm] = useState({
    streamUrl: '',
    governorMessage: '',
    governorName: '',
    governorTitle: '',
    governorImage: '',
    emergencyBanner: { active: false, level: 2, message: '' },
    contact: { address: '', phone: '', email: '', officeHours: '' },
    socialLinks: { facebook: '', twitter: '', youtube: '' },
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch('/api/admin/settings').then((r) => r.json()).then((j) => {
      if (j.success) setForm(j.data);
    });
  }, [apiFetch]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await apiFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-primary-dark mb-6">Site Settings</h1>
      {saved && <div className="bg-primary/10 text-primary rounded-lg p-3 mb-4 text-sm">Settings saved successfully.</div>}

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-bold">Homepage Hero</h2>
          <input placeholder="Governor Name" value={form.governorName} onChange={(e) => setForm({ ...form, governorName: e.target.value })} className="form-input" />
          <input placeholder="Office title (e.g. The Office of Governor of Unity State)" value={form.governorTitle} onChange={(e) => setForm({ ...form, governorTitle: e.target.value })} className="form-input" />
          <textarea placeholder="Governor Message" value={form.governorMessage} onChange={(e) => setForm({ ...form, governorMessage: e.target.value })} className="form-input" rows={3} />
          <input placeholder="Governor Image URL" value={form.governorImage} onChange={(e) => setForm({ ...form, governorImage: e.target.value })} className="form-input" />
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-bold">Emergency Alert Banner</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.emergencyBanner.active} onChange={(e) => setForm({ ...form, emergencyBanner: { ...form.emergencyBanner, active: e.target.checked } })} />
            <span className="text-sm">Show emergency banner</span>
          </label>
          <select value={form.emergencyBanner.level} onChange={(e) => setForm({ ...form, emergencyBanner: { ...form.emergencyBanner, level: parseInt(e.target.value) } })} className="form-input">
            <option value={1}>Level 1 - Critical</option>
            <option value={2}>Level 2 - Flood/Important</option>
            <option value={3}>Level 3 - Advisory</option>
          </select>
          <input placeholder="Alert message" value={form.emergencyBanner.message} onChange={(e) => setForm({ ...form, emergencyBanner: { ...form.emergencyBanner, message: e.target.value } })} className="form-input" />
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-bold">Contact Information</h2>
          <textarea placeholder="Address" value={form.contact.address} onChange={(e) => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })} className="form-input" rows={2} />
          <input placeholder="Phone" value={form.contact.phone} onChange={(e) => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })} className="form-input" />
          <input placeholder="Email" value={form.contact.email} onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })} className="form-input" />
          <input placeholder="Office Hours" value={form.contact.officeHours} onChange={(e) => setForm({ ...form, contact: { ...form.contact, officeHours: e.target.value } })} className="form-input" />
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-bold">Social Links</h2>
          <input placeholder="Facebook URL" value={form.socialLinks.facebook} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, facebook: e.target.value } })} className="form-input" />
          <input placeholder="Twitter URL" value={form.socialLinks.twitter} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} className="form-input" />
          <input placeholder="YouTube URL" value={form.socialLinks.youtube} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, youtube: e.target.value } })} className="form-input" />
        </section>

        <button type="submit" disabled={saving} className="bg-primary text-white px-8 py-3 rounded-lg font-semibold">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
