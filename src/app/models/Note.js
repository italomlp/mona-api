import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    removed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Note', NoteSchema);
