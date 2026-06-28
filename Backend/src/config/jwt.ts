import jwt, { SignOptions } from 'jsonwebtoken';
import type { JwtPayload, UserRole } from '@moictusb/shared';

function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Ensure this is set in your .env file or Render dashboard.`
    );
  }
  return value;
}

const accessSecret = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-in-production';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';
const accessExpires = (process.env.JWT_ACCESS_EXPIRES || '15m') as SignOptions['expiresIn'];
const refreshExpires = (process.env.JWT_REFRESH_EXPIRES || '7d') as SignOptions['expiresIn'];

export function validateJwtSecrets(): void {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error('JWT_ACCESS_SECRET must be set in production');
    }
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error('JWT_REFRESH_SECRET must be set in production');
    }
  }
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExpires });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpires });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, refreshSecret) as JwtPayload;
}

export function generateTokens(userId: string, email: string, role: UserRole) {
  const payload: JwtPayload = { userId, email, role };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}
