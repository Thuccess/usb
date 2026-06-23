import { Router } from 'express';
import {
  Article,
  Category,
  Ministry,
  Project,
  Event,
  Notice,
  Gallery,
  DocumentModel,
  getSettings,
} from '../models';
import { asyncHandler } from '../utils/helpers';

const router = Router();

router.get(
  '/home',
  asyncHandler(async (_req, res) => {
    const settings = await getSettings();

    const [
      breakingNews,
      topStories,
      featuredProjects,
      publicNotices,
      upcomingEvents,
      latestVideos,
      latestPhotos,
      latestGovernorSpeech,
    ] = await Promise.all([
      Article.find({ status: 'published', isBreaking: true })
        .populate('categoryId', 'name slug')
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title slug excerpt featuredImage publishedAt isBreaking categoryId'),
      Article.find({ status: 'published' })
        .populate('categoryId', 'name slug')
        .sort({ publishedAt: -1 })
        .limit(8)
        .select('title slug excerpt featuredImage publishedAt categoryId'),
      Project.find({ status: { $in: ['active', 'planning'] } })
        .sort({ updatedAt: -1 })
        .limit(6)
        .select('title slug category status county featuredImage budget spent'),
      Notice.find({
        $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gt: new Date() } }],
      })
        .sort({ priority: 1, createdAt: -1 })
        .limit(6)
        .select('title type priority createdAt'),
      Event.find({ date: { $gte: new Date() } })
        .sort({ date: 1 })
        .limit(6)
        .select('title date location category'),
      Gallery.find({ type: 'video' })
        .sort({ createdAt: -1 })
        .limit(4)
        .select('title type items'),
      Gallery.find({ type: 'photo' })
        .sort({ createdAt: -1 })
        .limit(4)
        .select('title type items'),
      Article.find({
        status: 'published',
        $or: [{ tags: 'speech' }, { tags: { $in: ['speech', 'press-release'] } }],
      })
        .populate('categoryId', 'name slug')
        .sort({ publishedAt: -1 })
        .limit(1)
        .select('title slug excerpt publishedAt categoryId'),
    ]);

    const mapGallery = (g: { _id: unknown; title: string; type: string; items: { url: string; thumbnail?: string }[] }) => ({
      _id: g._id,
      title: g.title,
      type: g.type,
      coverImage: g.items[0]?.thumbnail || g.items[0]?.url,
      itemCount: g.items.length,
    });

    res.json({
      success: true,
      data: {
        breakingNews,
        topStories,
        featuredProjects,
        publicNotices,
        upcomingEvents,
        latestVideos: latestVideos.map(mapGallery),
        latestPhotos: latestPhotos.map(mapGallery),
        latestGovernorSpeech: latestGovernorSpeech[0] || null,
        settings,
      },
    });
  })
);

router.get(
  '/articles',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string | undefined;
    const filter: Record<string, unknown> = { status: 'published' };

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) filter.categoryId = cat._id;
    }

    const [items, total] = await Promise.all([
      Article.find(filter)
        .populate('categoryId', 'name slug')
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('title slug excerpt featuredImage publishedAt categoryId isBreaking'),
      Article.countDocuments(filter),
    ]);

    res.json({ success: true, data: { items, total, page, limit, totalPages: Math.ceil(total / limit) } });
  })
);

router.get(
  '/articles/:slug',
  asyncHandler(async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug, status: 'published' })
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name');
    if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
    res.json({ success: true, data: article });
  })
);

router.get('/categories', asyncHandler(async (_req, res) => {
  const categories = await Category.find().sort({ order: 1 });
  res.json({ success: true, data: categories });
}));

router.get('/ministries', asyncHandler(async (_req, res) => {
  const ministries = await Ministry.find().sort({ order: 1 });
  res.json({ success: true, data: ministries });
}));

router.get('/ministries/:slug', asyncHandler(async (req, res) => {
  const ministry = await Ministry.findOne({ slug: req.params.slug });
  if (! ministry) return res.status(404).json({ success: false, error: 'Ministry not found' });

  const [articles, projects] = await Promise.all([
    Article.find({ status: 'published' }).populate('categoryId', 'name slug').sort({ publishedAt: -1 }).limit(10),
    Project.find({ ministryId: ministry._id }).sort({ updatedAt: -1 }).limit(10),
  ]);

  res.json({ success: true, data: { ministry, articles, projects } });
}));

router.get('/projects', asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.county) filter.county = req.query.county;
  if (req.query.status) filter.status = req.query.status;

  const projects = await Project.find(filter).populate('ministryId', 'name slug').sort({ updatedAt: -1 });
  res.json({ success: true, data: projects });
}));

router.get('/projects/:slug', asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).populate('ministryId', 'name slug');
  if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
  res.json({ success: true, data: project });
}));

router.get('/events', asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = {};
  if (req.query.upcoming === 'true') filter.date = { $gte: new Date() };
  const events = await Event.find(filter).sort({ date: 1 });
  res.json({ success: true, data: events });
}));

router.get('/notices', asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = {
    $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gt: new Date() } }],
  };
  if (req.query.type) filter.type = req.query.type;
  const notices = await Notice.find(filter).sort({ priority: 1, createdAt: -1 });
  res.json({ success: true, data: notices });
}));

router.get('/galleries', asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = {};
  if (req.query.type) filter.type = req.query.type;
  const galleries = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: galleries });
}));

router.get('/galleries/:id', asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) return res.status(404).json({ success: false, error: 'Gallery not found' });
  res.json({ success: true, data: gallery });
}));

router.get('/documents', asyncHandler(async (_req, res) => {
  const documents = await DocumentModel.find().populate('ministryId', 'name slug').sort({ createdAt: -1 });
  res.json({ success: true, data: documents });
}));

router.get('/settings', asyncHandler(async (_req, res) => {
  const settings = await getSettings();
  res.json({ success: true, data: settings });
}));

router.get('/search', asyncHandler(async (req, res) => {
  const q = (req.query.q as string) || '';
  if (!q || q.length < 2) {
    return res.json({ success: true, data: { articles: [], projects: [], notices: [] } });
  }

  const regex = new RegExp(q, 'i');
  const [articles, projects, notices] = await Promise.all([
    Article.find({ status: 'published', $or: [{ title: regex }, { excerpt: regex }] })
      .limit(10)
      .select('title slug excerpt publishedAt'),
    Project.find({ $or: [{ title: regex }, { description: regex }] }).limit(5).select('title slug county'),
    Notice.find({ $or: [{ title: regex }, { body: regex }] }).limit(5).select('title type'),
  ]);

  res.json({ success: true, data: { articles, projects, notices } });
}));

export default router;
