import mongoose, { Schema, Document } from 'mongoose';
import type { ProjectCategory, ProjectStatus } from '@moictusb/shared';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  budget?: number;
  spent?: number;
  timeline?: string;
  status: ProjectStatus;
  photos: string[];
  county: string;
  ministryId?: mongoose.Types.ObjectId;
  featuredImage?: string;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['roads', 'schools', 'hospitals', 'water', 'agriculture', 'youth', 'women', 'flood_resilience'],
      required: true,
    },
    description: { type: String, required: true },
    budget: Number,
    spent: { type: Number, default: 0 },
    timeline: String,
    status: {
      type: String,
      enum: ['planning', 'active', 'completed'],
      default: 'planning',
    },
    photos: [String],
    county: { type: String, required: true },
    ministryId: { type: Schema.Types.ObjectId, ref: 'Ministry' },
    featuredImage: String,
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
