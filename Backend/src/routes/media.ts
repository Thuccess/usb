import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { asyncHandler } from '../utils/helpers';

const router = Router();

router.post(
  '/cloudinary/sign',
  authenticate,
  requireRole('journalist', 'editor', 'admin', 'radio_operator'),
  asyncHandler(async (_req, res) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.json({
        success: true,
        data: {
          configured: false,
          message: 'Cloudinary not configured. Use direct URL upload in development.',
        },
      });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const crypto = await import('crypto');
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    res.json({
      success: true,
      data: {
        configured: true,
        cloudName,
        apiKey,
        timestamp,
        signature,
      },
    });
  })
);

router.post(
  '/upload/url',
  authenticate,
  requireRole('journalist', 'editor', 'admin', 'radio_operator'),
  asyncHandler(async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, error: 'URL required' });
    res.json({ success: true, data: { url } });
  })
);

export default router;
