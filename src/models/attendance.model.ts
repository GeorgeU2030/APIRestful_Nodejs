import mongoose,{ Document,Schema,Model,Types } from "mongoose";

export interface attendance extends Document {
    event_id: Types.ObjectId;
    user_id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const attendanceSchema = new Schema<attendance>({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const attendance_model: Model<attendance> = mongoose.model<attendance>('Attendance', attendanceSchema);