import mongoose, { Schema, Document } from 'mongoose';
import type { UserRole } from '@moictusb/shared';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  ministryId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['visitor', 'journalist', 'editor', 'admin', 'radio_operator'],
      default: 'journalist',
    },
    ministryId: { type: Schema.Types.ObjectId, ref: 'Ministry' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
