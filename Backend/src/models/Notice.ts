import mongoose, { Schema, Document } from 'mongoose';
import type { NoticeType } from '@moictusb/shared';

export interface INotice extends Document {
  title: string;
  type: NoticeType;
  body: string;
  priority: number;
  expiresAt?: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['recruitment', 'holiday', 'security', 'health', 'directive', 'flood', 'tender', 'general'],
      required: true,
    },
    body: { type: String, required: true },
    priority: { type: Number, default: 2, min: 1, max: 3 },
    expiresAt: Date,
  },
  { timestamps: true }
);

noticeSchema.index({ priority: 1, createdAt: -1 });

export const Notice = mongoose.model<INotice>('Notice', noticeSchema);
