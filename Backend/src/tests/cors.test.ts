import { describe, expect, it } from 'vitest';
import { isAllowedOrigin } from '../utils/cors';

describe('CORS origin validation', () => {
  it('allows localhost origins by default', () => {
    expect(isAllowedOrigin('http://localhost:3000')).toBe(true);
  });

  it('allows Vercel and Render hosts from production deployments', () => {
    expect(isAllowedOrigin('https://unity-state.vercel.app')).toBe(true);
    expect(isAllowedOrigin('https://unity-state-api.onrender.com')).toBe(true);
  });

  it('accepts configured origins from environment variables', () => {
    expect(isAllowedOrigin('https://my-frontend.vercel.app', { CORS_ORIGIN: 'https://my-frontend.vercel.app' })).toBe(true);
  });
});
