import mongoose, { Schema, Document } from 'mongoose';

export interface IRadioProgram extends Document {
  title: string;
  host: string;
  schedule: {
    day: string;
    time: string;
  };
  description?: string;
}

const radioProgramSchema = new Schema<IRadioProgram>(
  {
    title: { type: String, required: true },
    host: { type: String, required: true },
    schedule: {
      day: { type: String, required: true },
      time: { type: String, required: true },
    },
    description: String,
  },
  { timestamps: true }
);

export const RadioProgram = mongoose.model<IRadioProgram>('RadioProgram', radioProgramSchema);
