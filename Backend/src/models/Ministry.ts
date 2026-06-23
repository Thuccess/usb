import mongoose, { Schema, Document } from 'mongoose';

export interface IMinistry extends Document {
  name: string;
  slug: string;
  mandate: string;
  logo?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  order: number;
}

const ministrySchema = new Schema<IMinistry>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    mandate: { type: String, required: true },
    logo: String,
    contact: {
      email: String,
      phone: String,
      address: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Ministry = mongoose.model<IMinistry>('Ministry', ministrySchema);
