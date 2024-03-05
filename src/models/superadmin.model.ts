import { base_user, base_user_model } from "./base_user.model";
import { Model, Schema } from "mongoose";

export interface super_admin extends base_user {
    key_access: string;
}

const super_admin_schema = new Schema<super_admin>({
    key_access: { type: String, required: true, unique: true }
});

export const super_admin_model: Model<super_admin> = base_user_model.discriminator("SuperAdmin",super_admin_schema);

