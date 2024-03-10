import { base_user, base_user_model } from "./base_user.model";
import { Model, Schema } from "mongoose";

/**
 * Represents an organizer, which extends the base_user interface.
 */
export interface organizer extends base_user {
    /**
     * The organization the organizer belongs to.
     */
    organization: string;
    
    /**
     * The name of the organizer.
     */
    name: string;
    
    /**
     * The last name of the organizer.
     */
    lastname: string;
    
    /**
     * The rank or position of the organizer.
     */
    rank: string;
}

/**
 * Defines the schema for the organizer model.
 */
const organizer_schema = new Schema<organizer>({
    organization: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rank: { type: String, required: true }
});

/**
 * Represents the organizer model, which is a discriminator of the base_user_model.
 */
export const organizer_model: Model<organizer> = base_user_model.discriminator("Organizer", organizer_schema);
