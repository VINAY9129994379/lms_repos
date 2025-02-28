import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, unique: true, required: true }, // Unique Clerk ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique emails
    imageUrl: { type: String, default: "" }, // Default empty string if not provided
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true });

// Indexing for faster lookups
userSchema.index({ clerkId: 1 });

const User = mongoose.model('User', userSchema);

export default User;
