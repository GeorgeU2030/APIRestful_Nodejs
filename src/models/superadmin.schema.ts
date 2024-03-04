import { BaseUser, BaseUserModel } from "./base_user.schema";
import { Model, Schema } from "mongoose";

interface SuperAdmin extends BaseUser {
    keyaccess: string;
}

const SuperAdminSchema = new Schema<SuperAdmin>({
    keyaccess: { type: String, required: true, unique: true }
});

export const SuperAdminModel: Model<SuperAdmin> = BaseUserModel.discriminator("SuperAdmin",SuperAdminSchema);

