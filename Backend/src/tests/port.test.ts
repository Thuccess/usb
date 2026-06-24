import { describe, it, expect } from 'vitest';
import { resolvePort } from '../utils/port';

describe('resolvePort', () => {
  it('uses the configured port when provided', () => {
    expect(resolvePort('5000')).toBe(5000);
  });

  it('falls back to the default port when no value is provided', () => {
    expect(resolvePort()).toBe(4000);
  });

  it('falls back to the default port when the provided value is invalid', () => {
    expect(resolvePort('abc')).toBe(4000);
  });
});
