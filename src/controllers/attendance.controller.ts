import { Request,Response } from "express";
import { attendance_model } from "../models/attendance.model";
import { base_user_model } from "../models/base_user.model";

class AttendanceController{

    public registerForEvent = async (req: Request, res: Response) => {
    const event_id = req.params.id;
    const user_id = req.body.loggedUser.user_id;
        try {
            // verify if the user is registered in the event
            const existingAttendance = await attendance_model.findOne({ event_id, user_id });

            if (existingAttendance) {
                return res.status(400).json({ message: 'You are registered in this event' });
            }

            // create the attendance
            const newAttendance = new attendance_model({ event_id, user_id });
            await newAttendance.save();

            // update the registered events of the user
            const user = await base_user_model.findById(user_id);
            if (user) {
                user.registeredEvents.push(newAttendance._id);
                await user.save();
            }

            return res.status(200).json({ message: 'Inscripción exitosa' });
        } catch (error) {
            return res.status(500).json({ message: `Error al inscribirse al evento: ${error}` });
        }
    }
}

export default new AttendanceController();