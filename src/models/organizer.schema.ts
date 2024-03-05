import {base_user, base_user_model} from "./base_user.schema";
import {Model, Schema} from "mongoose";

export interface organizer extends base_user {
    organization: string;
    name: string;
    lastname: string;
    rank: string;
}

const organizer_schema = new Schema<organizer>({
    organization: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rank: { type: String, required: true }
});

export const organizer_model: Model<organizer> = base_user_model.discriminator("Organizer",organizer_schema);
