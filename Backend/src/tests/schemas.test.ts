import { describe, it, expect } from 'vitest';
import { loginSchema, articleSchema, feedbackSchema } from '@moictusb/shared';

describe('Shared schemas', () => {
  it('validates login input', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid login', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: '123' });
    expect(result.success).toBe(false);
  });

  it('validates article input', () => {
    const result = articleSchema.safeParse({
      title: 'Test Article Title Here',
      body: 'This is the article body with enough content.',
    });
    expect(result.success).toBe(true);
  });

  it('validates feedback input', () => {
    const result = feedbackSchema.safeParse({
      name: 'John Doe',
      type: 'question',
      message: 'I have a question about public services.',
    });
    expect(result.success).toBe(true);
  });
});
