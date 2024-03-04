import { BaseUser, BaseUserModel } from "./base_user.schema";
import { Model, Schema } from "mongoose";

interface Attendee extends BaseUser {
    name: string;
    lastname: string;
    age: number;
    location: string;
}

const AttendeeSchema = new Schema<Attendee>({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true }
});

export const AttendeeModel: Model<Attendee> = BaseUserModel.discriminator("Attendee",AttendeeSchema);

