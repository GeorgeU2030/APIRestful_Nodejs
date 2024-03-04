import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongouri = process.env.MONGO_URI || "";

export const connect_db = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log("The connection to MongoDB was successfull!");
    } catch (error) {
        console.error((error as Error).message);
    }
};


