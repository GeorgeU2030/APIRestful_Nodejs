import mongoose, { Document, Schema, Model } from "mongoose";

export interface event extends Document {
	title: string;
	description: string;
	init_date: Date;
	init_time: string;
	end_date: Date;
	end_time: string;
	location: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
}


const event_schema = new Schema<event>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	init_date: { type: Date, required: true },
	init_time: { type: String, required: true },
	end_date: { type: Date, required: true },
	end_time: { type: String, required: true },
	type: { type: String, required: true },
	location: { type: String, required: true },
},
	{ timestamps: true }
);

export const event_model: Model<event> = mongoose.model("Event", event_schema);