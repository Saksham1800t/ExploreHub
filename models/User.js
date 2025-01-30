import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:
        { type: String, required: true, unique: true },
    email:
        { type: String, required: true, unique: true },
    password:
        { type: String, required: true },
    favorites:
        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorites' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);