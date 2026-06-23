import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  fileUrl: string;
  category?: string;
  ministryId?: mongoose.Types.ObjectId;
}

const documentSchema = new Schema<IDocument>(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    category: String,
    ministryId: { type: Schema.Types.ObjectId, ref: 'Ministry' },
  },
  { timestamps: true }
);

export const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);
