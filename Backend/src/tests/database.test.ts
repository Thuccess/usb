import { describe, expect, it } from 'vitest';
import { validateAndGetMongoUri } from '../config/database';

describe('database configuration', () => {
  it('throws error when MONGODB_URI is missing', () => {
    const originalUri = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;

    expect(() => validateAndGetMongoUri()).toThrow('MONGODB_URI environment variable is required');

    if (originalUri) process.env.MONGODB_URI = originalUri;
  });

  it('validates mongodb+srv:// protocol', () => {
    process.env.MONGODB_URI = 'mongodb+srv://user:pass@cluster.mongodb.net/db';
    expect(() => validateAndGetMongoUri()).not.toThrow();
  });

  it('validates mongodb:// protocol', () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/db';
    expect(() => validateAndGetMongoUri()).not.toThrow();
  });

  it('rejects invalid protocol', () => {
    process.env.MONGODB_URI = 'postgres://user:pass@host/db';
    expect(() => validateAndGetMongoUri()).toThrow('Invalid MONGODB_URI format');
  });
});
