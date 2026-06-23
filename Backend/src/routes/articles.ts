import { Router } from 'express';
import { articleSchema, articleUpdateSchema, paginationSchema } from '@moictusb/shared';
import { Article } from '../models';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { validateBody, validateQuery, asyncHandler, slugify } from '../utils/helpers';

const router = Router();

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Article.findOne(query);
    if (!existing) return slug;
    slug = `${baseSlug}-${counter++}`;
  }
}

router.get(
  '/',
  authenticate,
  validateQuery(paginationSchema),
  asyncHandler(async (req: AuthRequest, res) => {
    const { page, limit } = req.query as unknown as { page: number; limit: number };
    const filter: Record<string, unknown> = {};

    if (req.user!.role === 'journalist') {
      filter.authorId = req.user!.userId;
    }

    const status = req.query.status as string | undefined;
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      Article.find(filter)
        .populate('categoryId', 'name slug')
        .populate('authorId', 'name email')
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  })
);

router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const article = await Article.findById(req.params.id)
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name email');

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    if (
      req.user!.role === 'journalist' &&
      article.authorId._id.toString() !== req.user!.userId
    ) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    res.json({ success: true, data: article });
  })
);

router.post(
  '/',
  authenticate,
  requireRole('journalist', 'editor', 'admin'),
  validateBody(articleSchema),
  asyncHandler(async (req: AuthRequest, res) => {
    const slug = await ensureUniqueSlug(slugify(req.body.title));
    const article = await Article.create({
      ...req.body,
      slug,
      authorId: req.user!.userId,
      status: req.body.status || 'draft',
    });

    res.status(201).json({ success: true, data: article });
  })
);

router.put(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = articleUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      });
    }

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    const isOwner = article.authorId.toString() === req.user!.userId;
    const canEdit =
      req.user!.role === 'admin' ||
      req.user!.role === 'editor' ||
      (req.user!.role === 'journalist' && isOwner && article.status !== 'published');

    if (!canEdit) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    Object.assign(article, parsed.data);
    if (parsed.data.title && parsed.data.title !== article.title) {
      article.slug = await ensureUniqueSlug(slugify(parsed.data.title), article._id.toString());
    }

    await article.save();
    res.json({ success: true, data: article });
  })
);

router.post(
  '/:id/submit',
  authenticate,
  requireRole('journalist', 'editor', 'admin'),
  asyncHandler(async (req: AuthRequest, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    if (req.user!.role === 'journalist' && article.authorId.toString() !== req.user!.userId) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    article.status = 'review';
    await article.save();
    res.json({ success: true, data: article, message: 'Submitted for review' });
  })
);

router.post(
  '/:id/approve',
  authenticate,
  requireRole('editor', 'admin'),
  asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    article.status = 'published';
    article.publishedAt = new Date();
    await article.save();
    res.json({ success: true, data: article, message: 'Article published' });
  })
);

router.post(
  '/:id/reject',
  authenticate,
  requireRole('editor', 'admin'),
  asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    article.status = 'draft';
    await article.save();
    res.json({ success: true, data: article, message: 'Article returned to draft' });
  })
);

router.delete(
  '/:id',
  authenticate,
  requireRole('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted' });
  })
);

export default router;
