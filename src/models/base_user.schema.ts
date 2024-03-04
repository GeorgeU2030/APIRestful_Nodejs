import mongoose,{ Document, Schema, Model } from "mongoose";

export interface BaseUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const BaseUserSchema = new Schema<BaseUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

export const BaseUserModel: Model<BaseUser> = mongoose.model("BaseUser", BaseUserSchema);
