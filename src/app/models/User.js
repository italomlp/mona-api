import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

async function generateHash(password) {
  return bcrypt.hash(password, 8);
}

UserSchema.pre('save', async function(next) { // eslint-disable-line
  if (this.password) {
    this.password = await generateHash(this.password);
  }
});

UserSchema.methods.generateHashPassword = generateHash;

UserSchema.methods.checkPassword = function(password) { // eslint-disable-line
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
