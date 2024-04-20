import mongoose from 'mongoose';
import config from '../config.js'; 

export async function connect() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err; 
    }
}