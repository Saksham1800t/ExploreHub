import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return; 
        }
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1);
    }
};