import mongoose, { Schema, Document } from 'mongoose';
import type { FeedbackType, FeedbackStatus } from '@moictusb/shared';

export interface IFeedback extends Document {
  name: string;
  phone?: string;
  email?: string;
  type: FeedbackType;
  message: string;
  status: FeedbackStatus;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    name: { type: String, required: true },
    phone: String,
    email: String,
    type: {
      type: String,
      enum: ['complaint', 'question', 'suggestion', 'misinformation'],
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
