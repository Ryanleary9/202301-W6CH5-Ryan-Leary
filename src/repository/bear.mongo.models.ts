import { Schema, model } from 'mongoose';
import { Bear } from '../entities/bear.model.js';

const bearSchema = new Schema<Bear>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const BearModel = model('Bear', bearSchema, 'bears');
