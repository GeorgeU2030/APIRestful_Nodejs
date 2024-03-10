import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Represents a base user.
 */
export interface base_user extends Document {
    /**
     * The email of the user.
     */
    email: string;
    
    /**
     * The password of the user.
     */
    password: string;
    
    /**
     * The type of the user.
     */
    __t: string;
    
    /**
     * The events that the user is registered for.
     */
    registeredEvents: Array<string>;
    
    /**
     * The date when the user was created.
     */
    createdAt: Date;
    
    /**
     * The date when the user was last updated.
     */
    updatedAt: Date;
}

/**
 * Represents the schema for the base user model.
 */
const base_user_schema = new Schema<base_user>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }],
},
    { timestamps: true }
);

/**
 * Represents the base user model.
 */
export const base_user_model: Model<base_user> = mongoose.model("User", base_user_schema);
