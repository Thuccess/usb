const DEFAULT_LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

function normalizeOrigin(origin: string): string {
  return origin.replace(/\/$/, '');
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
    return true;
  }

  const normalizedOrigin = normalizeOrigin(origin);
  const allowedOrigins = getAllowedOrigins(env).map(normalizeOrigin);

  if (allowedOrigins.includes(normalizedOrigin)) {
    return true;
  }

  return /(^https?:\/\/localhost(?::\d+)?$)|(^https?:\/\/127\.0\.0\.1(?::\d+)?$)|(\.vercel\.app$)|(\.onrender\.com$)/i.test(normalizedOrigin);
}
