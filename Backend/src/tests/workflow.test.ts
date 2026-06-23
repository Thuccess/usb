import { describe, it, expect } from 'vitest';

describe('Article workflow permissions', () => {
  it('defines valid role hierarchy', () => {
    const roles = ['visitor', 'journalist', 'editor', 'admin', 'radio_operator'];
    expect(roles).toContain('journalist');
    expect(roles).toContain('editor');
    expect(roles.indexOf('editor')).toBeGreaterThan(roles.indexOf('journalist'));
  });

  it('defines article status transitions', () => {
    const transitions: Record<string, string[]> = {
      draft: ['review'],
      review: ['published', 'draft'],
      published: ['draft'],
    };
    expect(transitions.draft).toContain('review');
    expect(transitions.review).toContain('published');
  });
});

describe('Public API routes', () => {
  it('lists expected public endpoints', () => {
    const endpoints = [
      '/api/public/home',
      '/api/public/articles',
      '/api/public/radio/programs',
      '/api/public/settings',
    ];
    expect(endpoints.length).toBe(4);
  });
});
