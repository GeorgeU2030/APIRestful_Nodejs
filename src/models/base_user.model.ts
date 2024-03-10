import mongoose,{ Document, Schema, Model } from "mongoose";

export interface base_user extends Document {
    email: string;
    password: string;
    __t:string;
    registeredEvents: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}

const base_user_schema = new Schema<base_user>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }],
},
    { timestamps: true }
);

export const base_user_model: Model<base_user> = mongoose.model("User", base_user_schema);
