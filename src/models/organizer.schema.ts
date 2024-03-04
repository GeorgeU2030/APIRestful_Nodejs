import {BaseUser, BaseUserModel} from "./base_user.schema";
import {Model, Schema} from "mongoose";

interface Organizer extends BaseUser {
    organization: string;
    name: string;
    lastname: string;
    rank: string;
}

const OrganizerSchema = new Schema<Organizer>({
    organization: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rank: { type: String, required: true }
});

export const OrganizerModel: Model<Organizer> = BaseUserModel.discriminator("Organizer",OrganizerSchema);
