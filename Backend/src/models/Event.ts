import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  location: string;
  description: string;
  category?: string;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
  },
  { timestamps: true }
);

eventSchema.index({ date: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema);
