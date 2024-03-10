import { base_user, base_user_model } from "./base_user.model";
import { Model, Schema } from "mongoose";

/**
 * Represents an attendee.
 */
export interface attendee extends base_user {
    name: string;
    lastname: string;
    age: number;
    location: string;
}

/**
 * Schema definition for the attendee model.
 */
const attendee_schema = new Schema<attendee>({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true }
});

/**
 * Mongoose model for the attendee.
 */
export const attendee_model: Model<attendee> = base_user_model.discriminator("Attendee", attendee_schema);

