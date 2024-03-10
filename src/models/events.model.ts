import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Represents an event.
 */
export interface event extends Document {
	/**
	 * The title of the event.
	 */
	title: string;
	/**
	 * The description of the event.
	 */
	description: string;
	/**
	 * The initial date of the event.
	 */
	init_date: Date;
	/**
	 * The initial time of the event.
	 */
	init_time: string;
	/**
	 * The end date of the event.
	 */
	end_date: Date;
	/**
	 * The end time of the event.
	 */
	end_time: string;
	/**
	 * The location of the event.
	 */
	location: string;
	/**
	 * The type of the event.
	 */
	type: string;
	/**
	 * The ID of the organizer of the event.
	 */
	organizer_id: string;
	/**
	 * The creation date of the event.
	 */
	createdAt: Date;
	/**
	 * The last update date of the event.
	 */
	updatedAt: Date;
}

/**
 * Represents the event schema.
 */
const event_schema = new Schema<event>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	init_date: { type: Date, required: true },
	init_time: { type: String, required: true },
	end_date: { type: Date, required: true },
	end_time: { type: String, required: true },
	type: { type: String, required: true },
	organizer_id: { type: String, required: true },
	location: { type: String, required: true },
}, { timestamps: true });

/**
 * Represents the event model.
 */
export const event_model: Model<event> = mongoose.model("Event", event_schema);
