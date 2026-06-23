import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import {
  loginSchema,
  registerSchema,
} from '@moictusb/shared';
import { User } from '../models';
import { generateTokens, verifyRefreshToken } from '../config/jwt';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { validateBody, asyncHandler } from '../utils/helpers';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many attempts, please try again later' },
});

router.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const tokens = generateTokens(user._id.toString(), user.email, user.role);
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        ...tokens,
      },
    });
  })
);

router.post(
  '/register',
  authenticate,
  requireRole('admin'),
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const { email, password, name, role, ministryId } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
      ministryId: ministryId || undefined,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  })
);

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, error: 'Refresh token required' });
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await User.findById(payload.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({ success: false, error: 'Invalid refresh token' });
      }

      const tokens = generateTokens(user._id.toString(), user.email, user.role);
      res.json({ success: true, data: tokens });
    } catch {
      return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
  })
);

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await User.findById(req.user!.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  })
);

export default router;
