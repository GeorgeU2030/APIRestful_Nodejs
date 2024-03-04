import { base_user, base_user_model } from "./base_user.schema";
import { Model, Schema } from "mongoose";

interface attendee extends base_user {
    name: string;
    lastname: string;
    age: number;
    location: string;
}

const attendee_schema = new Schema<attendee>({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true }
});

export const attendee_model: Model<attendee> = base_user_model.discriminator("Attendee",attendee_schema);

