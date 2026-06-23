import mongoose, { Schema, Document } from 'mongoose';
import { DEFAULT_SETTINGS } from '@moictusb/shared';
import type { EmergencyLevel } from '@moictusb/shared';

export interface ISettings extends Document {
  streamUrl: string;
  governorMessage: string;
  governorName: string;
  governorTitle: string;
  governorImage: string;
  emergencyBanner: {
    active: boolean;
    level: EmergencyLevel;
    message: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    officeHours: string;
  };
}

const settingsSchema = new Schema<ISettings>({
  streamUrl: { type: String, default: DEFAULT_SETTINGS.streamUrl },
  governorMessage: { type: String, default: DEFAULT_SETTINGS.governorMessage },
  governorName: { type: String, default: DEFAULT_SETTINGS.governorName },
  governorTitle: { type: String, default: DEFAULT_SETTINGS.governorTitle },
  governorImage: { type: String, default: DEFAULT_SETTINGS.governorImage },
  emergencyBanner: {
    active: { type: Boolean, default: false },
    level: { type: Number, default: 2 },
    message: { type: String, default: '' },
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    youtube: String,
  },
  contact: {
    address: { type: String, default: DEFAULT_SETTINGS.contact.address },
    phone: { type: String, default: DEFAULT_SETTINGS.contact.phone },
    email: { type: String, default: DEFAULT_SETTINGS.contact.email },
    officeHours: { type: String, default: DEFAULT_SETTINGS.contact.officeHours },
  },
});

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema);

export async function getSettings(): Promise<ISettings> {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
}
