/**
 * Connects to the MongoDB database using the provided connection URI.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// get the connection URI from the environment variables
const mongouri = process.env.MONGO_URI || "";

export const connect_db = async () => {
    try {
        // connect to the database
        await mongoose.connect(mongouri);
        console.log("The connection to MongoDB was successfull!");
    } catch (error) {
        console.error((error as Error).message);
    }
};


