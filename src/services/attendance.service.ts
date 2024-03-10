import { attendance, attendance_model } from "../models/attendance.model";
import { base_user_model } from "../models/base_user.model";
import { event_model } from "../models/events.model";

class AttendanceService {

    public async registerForEvent(event_id: string, user_id: string): Promise<attendance> {
        try {
            // verify if the user is registered in the event
            const existingAttendance = await attendance_model.findOne({ event_id, user_id });

            if (existingAttendance) {
                throw new Error('You are already registered in this event');
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
            return newAttendance;

        } catch (error) {
            throw new Error(`Error to registered in the event: ${error}`);
        }
    }

    public async get_registered_events(user_id: string): Promise<attendance[]> {

        try{
            const user = await base_user_model.findById(user_id).populate('registeredEvents');
    
            if (!user) {
                throw new Error('User not found');
            }
    
            const registered_events = await Promise.all(
                user.registeredEvents.map(async (attendanceId) => {
                    const attendance = await attendance_model.findById(attendanceId).populate('event_id');
                    if (!attendance) {
                        throw new Error('Attendance not found');
                    }
                    return attendance;
                })
            );

            return registered_events; 
        }catch(error){
            throw new Error(`Error to get registered events: ${error}`);
        }
    }

    public async get_attendees(event_id: string, user_id: string): Promise<attendance[]> {
        try{
            const event = await event_model.findById(event_id);
            if (!event || event.organizer_id !== user_id) {
                throw new Error('You do not have access to this event or the event do not exists');
            }
            const attendees = await attendance_model.find({ event_id }).populate('user_id');
            return attendees;
        }catch(error){
            throw new Error(`Error to get attendees: ${error}`);
        }
    }
}

export default new AttendanceService();
