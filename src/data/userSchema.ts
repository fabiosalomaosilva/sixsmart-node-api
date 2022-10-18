import mongoose, { Schema } from 'mongoose';

import { User } from '../models/user';

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
  role: {
    type: String,
    default: 'Cliente',
    required: true,
  },
});

userSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  },
);

export const UserModel = mongoose.model('User', userSchema);
