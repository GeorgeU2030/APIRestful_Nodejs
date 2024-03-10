import mongoose, { Document, Schema, Model, Types } from "mongoose";

/**
 * Represents an attendance document.
 */
export interface attendance extends Document {
    /**
     * The ID of the event associated with the attendance.
     */
    event_id: Types.ObjectId;
    /**
     * The ID of the user associated with the attendance.
     */
    user_id: Types.ObjectId;
    /**
     * The date and time when the attendance was created.
     */
    createdAt: Date;
    /**
     * The date and time when the attendance was last updated.
     */
    updatedAt: Date;
}

/**
 * Mongoose schema for the Attendance model.
 */
const attendanceSchema = new Schema<attendance>({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

/**
 * Mongoose model for the Attendance schema.
 */
export const attendance_model: Model<attendance> = mongoose.model<attendance>('Attendance', attendanceSchema);
