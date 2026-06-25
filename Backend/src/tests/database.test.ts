import { describe, expect, it } from 'vitest';
import { shouldSkipDatabaseConnection } from '../config/database';

describe('database startup guard', () => {
  it('skips database connection when production has no database credentials', () => {
    expect(
      shouldSkipDatabaseConnection({
        NODE_ENV: 'production',
      })
    ).toBe(true);
  });

  it('does not skip when a MongoDB connection string is configured', () => {
    expect(
      shouldSkipDatabaseConnection({
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://example.com:27017/test',
      })
    ).toBe(false);
  });
});
