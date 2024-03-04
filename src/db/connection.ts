import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("The connection to MongoDB was successfull!");
    } catch (error) {
        console.error((error as Error).message);
    }
};


