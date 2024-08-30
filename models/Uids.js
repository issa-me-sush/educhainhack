import mongoose from 'mongoose';

const UidSchema = new mongoose.Schema({
  uids: {
    type: [String], // Array of strings
    required: true, 
  },
}, { timestamps: true });

export default mongoose.models.Uid || mongoose.model('Uid', UidSchema);
