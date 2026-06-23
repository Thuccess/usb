import mongoose, { Schema, Document } from 'mongoose';
import type { ArticleStatus } from '@moictusb/shared';

export interface IArticle extends Document {
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  categoryId?: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  status: ArticleStatus;
  featuredImage?: string;
  tags: string[];
  isBreaking: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    excerpt: String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['draft', 'review', 'published'],
      default: 'draft',
    },
    featuredImage: String,
    tags: [String],
    isBreaking: { type: Boolean, default: false },
    publishedAt: Date,
  },
  { timestamps: true }
);

articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ isBreaking: 1, publishedAt: -1 });

export const Article = mongoose.model<IArticle>('Article', articleSchema);
