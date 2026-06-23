'use client';

import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { submitFeedback } from '@/lib/api';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'question', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await submitFeedback(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', type: 'question', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  return (
    <>
      <PageHero
        badge="Citizen Feedback"
        title="Citizen Feedback Center"
        subtitle="Submit complaints, ask questions, suggest improvements, or report misinformation."
      />

      <PageSection band="white" narrow>
        {status === 'success' && (
          <div className="content-card border-l-4 border-l-primary bg-primary/10 p-5 mb-6 flex items-start gap-3">
            <CheckCircle2 size={22} className="text-primary shrink-0 mt-0.5" aria-hidden />
            <p className="text-primary font-medium">Thank you! Your feedback has been submitted successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="content-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-primary" aria-hidden />
            </div>
            <div>
              <h2 className="font-bold text-lg text-primary-dark">Send us your feedback</h2>
              <p className="text-sm text-muted">All fields marked * are required</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Feedback Type *</label>
            <select
              required
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="form-input"
            >
              <option value="question">Question</option>
              <option value="complaint">Complaint</option>
              <option value="suggestion">Suggestion</option>
              <option value="misinformation">Report Misinformation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Message *</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-textarea"
            />
          </div>
          {error && <p className="text-primary text-sm bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">{error}</p>}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark disabled:opacity-50 transition-colors shadow-sm"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </PageSection>
    </>
  );
}
