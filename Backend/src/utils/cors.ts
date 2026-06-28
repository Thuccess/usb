const DEFAULT_LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

function normalizeOrigin(origin: string): string {
  return origin.replace(/\/$/, '');
}

function isDomainMatch(origin: string, pattern: string): boolean {
  // Pattern: *.vercel.app or *.onrender.com
  if (pattern.includes('*')) {
    const regex = new RegExp(`^https?://${pattern.replace('*.', '.*\\.')}`);
    return regex.test(origin);
  }
  return origin === pattern;
}

export function getAllowedOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  const configuredOrigins = [env.CORS_ORIGIN, env.CORS_ORIGINS]
    .flatMap((value) =>
      value
        ? value
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
        : []
    )
    .map((origin) => normalizeOrigin(origin));

  return Array.from(new Set([...DEFAULT_LOCAL_ORIGINS, ...configuredOrigins]));
}

export function isAllowedOrigin(origin: string | undefined, env: NodeJS.ProcessEnv = process.env): boolean {
  if (!origin) {
    return true; // Allow requests with no origin (same-origin or mobile)
  }

  const normalizedOrigin = normalizeOrigin(origin);
  const allowedOrigins = getAllowedOrigins(env);

  // Check exact matches
  if (allowedOrigins.some((allowed) => normalizedOrigin === normalizeOrigin(allowed))) {
    return true;
  }

  // Check domain patterns (vercel.app, onrender.com)
  const patterns = ['*.vercel.app', '*.onrender.com', 'localhost:*', '127.0.0.1:*'];
  return patterns.some((pattern) => isDomainMatch(normalizedOrigin, pattern));
}
