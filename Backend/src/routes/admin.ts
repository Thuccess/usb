import { Router } from 'express';
import {
  categorySchema,
  ministrySchema,
  projectSchema,
  eventSchema,
  noticeSchema,
  gallerySchema,
  documentSchema,
  radioProgramSchema,
  settingsSchema,
  feedbackSchema,
  paginationSchema,
} from '@moictusb/shared';
import {
  Category,
  Ministry,
  Project,
  Event,
  Notice,
  Gallery,
  DocumentModel,
  RadioProgram,
  Feedback,
  User,
  Article,
  getSettings,
  Settings,
} from '../models';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { validateBody, validateQuery, asyncHandler, slugify } from '../utils/helpers';
import type { UserRole } from '@moictusb/shared';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeSlugRoutes(
  path: string,
  Model: any,
  schema: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  slugFrom: 'name' | 'title' = 'name',
  roles: { create: UserRole[]; update: UserRole[]; delete: UserRole[] } = {
    create: ['admin', 'editor'],
    update: ['admin', 'editor'],
    delete: ['admin'],
  }
) {
  const r = Router();

  r.get('/', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const [items, total] = await Promise.all([
      Model.find().sort({ order: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Model.countDocuments(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
  }));

  r.get('/:id', asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  }));

  r.post('/', authenticate, requireRole(...roles.create), validateBody(schema), asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (!data.slug) data.slug = slugify(data[slugFrom]);
    const item = await Model.create(data);
    res.status(201).json({ success: true, data: item });
  }));

  r.put('/:id', authenticate, requireRole(...roles.update), asyncHandler(async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ success: false, error: 'Invalid data' });
    const item = await Model.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  }));

  r.delete('/:id', authenticate, requireRole(...roles.delete), asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  }));

  router.use(path, r);
}

makeSlugRoutes('/categories', Category, categorySchema);
makeSlugRoutes('/ministries', Ministry, ministrySchema);
makeSlugRoutes('/projects', Project, projectSchema, 'title');
makeSlugRoutes('/events', Event, eventSchema, 'title');
makeSlugRoutes('/notices', Notice, noticeSchema, 'title');
makeSlugRoutes('/galleries', Gallery, gallerySchema, 'title');
makeSlugRoutes('/documents', DocumentModel, documentSchema, 'title');
makeSlugRoutes('/radio-programs', RadioProgram, radioProgramSchema, 'title', {
  create: ['admin', 'radio_operator'],
  update: ['admin', 'radio_operator'],
  delete: ['admin'],
});

router.post('/feedback', validateBody(feedbackSchema), asyncHandler(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json({ success: true, data: feedback, message: 'Feedback submitted' });
}));

router.get('/feedback', authenticate, requireRole('admin', 'editor'), validateQuery(paginationSchema), asyncHandler(async (req, res) => {
  const { page, limit } = req.query as unknown as { page: number; limit: number };
  const [items, total] = await Promise.all([
    Feedback.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Feedback.countDocuments(),
  ]);
  res.json({ success: true, data: { items, total, page, limit } });
}));

router.patch('/feedback/:id/status', authenticate, requireRole('admin', 'editor'), asyncHandler(async (req, res) => {
  const { status } = req.body;
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!feedback) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: feedback });
}));

router.get('/settings', asyncHandler(async (_req, res) => {
  const settings = await getSettings();
  res.json({ success: true, data: settings });
}));

router.put('/settings', authenticate, requireRole('admin'), validateBody(settingsSchema), asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  Object.assign(settings, req.body);
  await settings.save();
  res.json({ success: true, data: settings });
}));

router.get('/users', authenticate, requireRole('admin'), asyncHandler(async (_req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
}));

router.patch('/users/:id', authenticate, requireRole('admin'), asyncHandler(async (req, res) => {
  const { role, isActive, name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { ...(role && { role }), ...(typeof isActive === 'boolean' && { isActive }), ...(name && { name }) },
    { new: true }
  ).select('-passwordHash');
  if (!user) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: user });
}));

router.get('/dashboard/stats', authenticate, requireRole('admin', 'editor'), asyncHandler(async (_req: AuthRequest, res) => {
  const [pendingReview, totalArticles, totalFeedback, recentFeedback] = await Promise.all([
    Article.countDocuments({ status: 'review' }),
    Article.countDocuments({ status: 'published' }),
    Feedback.countDocuments({ status: 'new' }),
    Feedback.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({
    success: true,
    data: {
      pendingReview,
      totalArticles,
      newFeedback: totalFeedback,
      recentFeedback,
    },
  });
}));

export default router;
