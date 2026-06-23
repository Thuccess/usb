import mongoose, { Schema, Document } from 'mongoose';
import type { GalleryType } from '@moictusb/shared';

export interface IGalleryItem {
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface IGallery extends Document {
  title: string;
  type: GalleryType;
  items: IGalleryItem[];
}

const gallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['photo', 'video'], required: true },
    items: [
      {
        url: { type: String, required: true },
        caption: String,
        thumbnail: String,
      },
    ],
  },
  { timestamps: true }
);

export const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);
