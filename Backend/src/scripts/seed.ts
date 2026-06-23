import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/database';
import {
  User,
  Category,
  Ministry,
  Project,
  Event,
  Notice,
  Gallery,
  Article,
  RadioProgram,
  Settings,
} from '../models';
import { NEWS_CATEGORIES, DEFAULT_SETTINGS } from '@moictusb/shared';

dotenv.config({ override: true });

async function seed() {
  await connectDatabase();
  console.log('Seeding database...');

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@unitystate.gov.ss';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      name: 'System Administrator',
      role: 'admin',
    });
    console.log(`Created admin: ${adminEmail}`);
  }

  const editorEmail = 'editor@unitystate.gov.ss';
  if (!(await User.findOne({ email: editorEmail }))) {
    await User.create({
      email: editorEmail,
      passwordHash: await bcrypt.hash('Editor123!', 12),
      name: 'Chief Editor',
      role: 'editor',
    });
  }

  const journalistEmail = 'journalist@unitystate.gov.ss';
  if (!(await User.findOne({ email: journalistEmail }))) {
    await User.create({
      email: journalistEmail,
      passwordHash: await bcrypt.hash('Journalist123!', 12),
      name: 'Staff Journalist',
      role: 'journalist',
    });
  }

  if ((await Category.countDocuments()) === 0) {
    const categories = NEWS_CATEGORIES.map((name, i) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      slug: name,
      description: `${name.charAt(0).toUpperCase() + name.slice(1)} news and updates`,
      order: i,
    }));
    await Category.insertMany(categories);
    console.log('Created categories');
  }

  if ((await Ministry.countDocuments()) === 0) {
    const ministries = [
      { name: 'Ministry of Education', slug: 'education', mandate: 'Overseeing education policy and school development across Unity State.', order: 1 },
      { name: 'Ministry of Health', slug: 'health', mandate: 'Delivering healthcare services and public health initiatives.', order: 2 },
      { name: 'Ministry of Agriculture', slug: 'agriculture', mandate: 'Supporting farming, livestock, and food security programs.', order: 3 },
      { name: 'Ministry of Finance', slug: 'finance', mandate: 'Managing state finances, budgeting, and economic planning.', order: 4 },
      { name: 'Ministry of Information & Communications Technology', slug: 'mict', mandate: 'Driving digital transformation, media, and ICT infrastructure development.', order: 5 },
      { name: 'Ministry of Infrastructure', slug: 'infrastructure', mandate: 'Building and maintaining roads, bridges, and public infrastructure.', order: 6 },
      { name: 'Ministry of Local Government', slug: 'local-government', mandate: 'Supporting county administration and local governance.', order: 7 },
    ];
    await Ministry.insertMany(ministries);
    console.log('Created ministries');
  }

  const mict = await Ministry.findOne({ slug: 'mict' });
  const politicsCat = await Category.findOne({ slug: 'politics' });
  const developmentCat = await Category.findOne({ slug: 'development' });
  const environmentCat = await Category.findOne({ slug: 'environment' });

  if ((await Article.countDocuments()) === 0 && admin && politicsCat) {
    await Article.insertMany([
      {
        title: 'Unity State Digital Gateway Officially Launches',
        slug: 'unity-state-digital-gateway-launches',
        body: '<p>The Ministry of Information & Communications Technology is proud to announce the launch of the Unity State Digital Gateway — the official digital nerve center for verified government information, Bentiu 99.0 FM live streaming, and public services.</p><p>This portal represents a major step forward in transparent digital governance for nearly one million residents across all seven counties.</p>',
        excerpt: 'MICT launches the official Unity State Digital Gateway for verified news and public services.',
        categoryId: politicsCat._id,
        authorId: admin._id,
        status: 'published',
        isBreaking: true,
        publishedAt: new Date(),
        tags: ['launch', 'digital', 'mict'],
      },
      {
        title: 'Bentiu 99.0 FM Now Streaming Live on Digital Portal',
        slug: 'bentiu-fm-live-streaming',
        body: '<p>Citizens can now listen to Bentiu 99.0 FM 24/7 through the Unity State Digital Gateway. The radio station reaches an estimated 600,000 potential listeners across Unity State and beyond.</p>',
        excerpt: 'Listen to Bentiu 99.0 FM live on the new digital portal.',
        categoryId: developmentCat?._id,
        authorId: admin._id,
        status: 'published',
        publishedAt: new Date(),
        tags: ['radio', 'bentiu-fm'],
      },
      {
        title: 'Flood Preparedness Advisory for Rubkona and Guit Counties',
        slug: 'flood-preparedness-advisory-rubkona-guit',
        body: '<p>The State Government urges residents in flood-prone areas to remain vigilant as seasonal rains intensify. Emergency coordination centers are active in Bentiu.</p>',
        excerpt: 'State government issues flood preparedness advisory for Rubkona and Guit counties.',
        categoryId: environmentCat?._id,
        authorId: admin._id,
        status: 'published',
        isBreaking: true,
        publishedAt: new Date(),
        tags: ['flood', 'emergency'],
      },
    ]);
    console.log('Created sample articles');
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: 'Rubkona-Bentiu Road Rehabilitation',
        slug: 'rubkona-bentiu-road',
        category: 'roads',
        description: 'Major road rehabilitation connecting Rubkona to Bentiu to improve trade and humanitarian access.',
        budget: 2500000,
        spent: 875000,
        timeline: '2024-2026',
        status: 'active',
        county: 'Rubkona',
        ministryId: mict?._id,
      },
      {
        title: 'Bentiu Primary Healthcare Center Expansion',
        slug: 'bentiu-health-center',
        category: 'hospitals',
        description: 'Expansion of healthcare facilities to serve IDP camps and surrounding communities.',
        budget: 1800000,
        spent: 450000,
        timeline: '2025-2027',
        status: 'planning',
        county: 'Bentiu',
      },
      {
        title: 'Flood Resilience Dike System - Koch County',
        slug: 'koch-flood-dike',
        category: 'flood_resilience',
        description: 'Construction of protective dikes and early warning systems for flood-prone areas in Koch County.',
        budget: 3200000,
        spent: 1200000,
        timeline: '2024-2026',
        status: 'active',
        county: 'Koch',
      },
    ]);
    console.log('Created sample projects');
  }

  if ((await Event.countDocuments()) === 0) {
    await Event.insertMany([
      {
        title: 'State Council Meeting',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'State Secretariat, Bentiu',
        description: 'Monthly session of the Unity State Council.',
        category: 'Government',
      },
      {
        title: 'Digital Literacy Workshop',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        location: 'MICT Office, Bentiu',
        description: 'Community leaders training on accessing the Digital Gateway.',
        category: 'ICT',
      },
    ]);
  }

  if ((await Notice.countDocuments()) === 0) {
    await Notice.insertMany([
      {
        title: 'Public Service Recruitment - Information Officers',
        type: 'recruitment',
        body: 'The Ministry of Information & Communications Technology invites qualified candidates to apply for County Information Officer positions.',
        priority: 2,
      },
      {
        title: 'Flood Alert Level 2 - Rubkona County',
        type: 'flood',
        body: 'Residents near the Nile are advised to move to higher ground. Emergency shelters are open in Bentiu.',
        priority: 1,
      },
    ]);
  }

  if ((await Gallery.countDocuments()) === 0) {
    await Gallery.insertMany([
      {
        title: 'Governor Official Visit to Bentiu POC',
        type: 'photo',
        items: [
          { url: 'https://images.unsplash.com/photo-1529107386315-e1a2cae7204a?w=800', caption: 'Community engagement' },
          { url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800', caption: 'Official ceremony' },
        ],
      },
      {
        title: 'Unity State Development Documentary',
        type: 'video',
        items: [
          { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Development highlights', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
        ],
      },
    ]);
  }

  if ((await RadioProgram.countDocuments()) === 0) {
    await RadioProgram.insertMany([
      { title: 'Morning News Bulletin', host: 'MICT News Team', schedule: { day: 'Monday-Friday', time: '07:00 AM' }, description: 'Daily news and government updates' },
      { title: 'Governor\'s Weekly Address', host: 'Office of the Governor', schedule: { day: 'Friday', time: '06:00 PM' }, description: 'Weekly message from the Governor' },
      { title: 'Community Voices', host: 'Bentiu 99.0 FM', schedule: { day: 'Saturday', time: '04:00 PM' }, description: 'Call-in show for citizen feedback' },
      { title: 'Emergency Alerts', host: 'MICT Emergency Desk', schedule: { day: 'Daily', time: 'As Needed' }, description: 'Flood and security emergency broadcasts' },
    ]);
  }

  if (!(await Settings.findOne())) {
    await Settings.create({
      ...DEFAULT_SETTINGS,
      streamUrl: process.env.DEFAULT_STREAM_URL || DEFAULT_SETTINGS.streamUrl,
      emergencyBanner: {
        active: true,
        level: 2,
        message: 'FLOOD ALERT Level 2 - Rubkona County: Residents advised to move to higher ground.',
      },
    });
  }

  console.log('Seed completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
