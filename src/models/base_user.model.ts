import mongoose,{ Document, Schema, Model } from "mongoose";

export interface base_user extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const base_user_schema = new Schema<base_user>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

export const base_user_model: Model<base_user> = mongoose.model("BaseUser", base_user_schema);
