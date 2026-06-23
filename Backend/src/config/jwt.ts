import jwt, { SignOptions } from 'jsonwebtoken';
import type { JwtPayload, UserRole } from '@moictusb/shared';

const accessSecret = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-in-production';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';
const accessExpires = (process.env.JWT_ACCESS_EXPIRES || '15m') as SignOptions['expiresIn'];
const refreshExpires = (process.env.JWT_REFRESH_EXPIRES || '7d') as SignOptions['expiresIn'];

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
