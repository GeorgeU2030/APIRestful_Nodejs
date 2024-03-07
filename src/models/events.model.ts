import mongoose, { Document, Schema, Model } from "mongoose";

export interface event extends Document {
	title: string;
	description: string;
	init_date: Date;
	init_time: Date;
	end_date: Date;
	end_time: Date;
	location: string;
	createdAt: Date;
	updatedAt: Date;
}

const event_schema = new Schema<event>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	init_date: { type: Date, required: true },
	init_time: { type: Date, required: true },
	end_date: { type: Date, required: true },
	end_time: { type: Date, required: true },
	location: { type: String, required: true },
},
	{ timestamps: true }
);

export const event_model: Model<event> = mongoose.model("Event", event_schema);