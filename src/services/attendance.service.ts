import { attendance, attendance_model } from "../models/attendance.model";
import { base_user_model } from "../models/base_user.model";
import { event_model } from "../models/events.model";

/**
 * Service class for managing attendance related operations.
 */
class AttendanceService {

    /**
     * Registers a user for an event.
     * @param event_id - The ID of the event.
     * @param user_id - The ID of the user.
     * @returns A promise that resolves to the created attendance object.
     * @throws If the user is already registered in the event or if there is an error during registration.
     */
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

    /**
     * Retrieves the registered events for a user.
     * @param user_id - The ID of the user.
     * @returns A promise that resolves to an array of attendance objects representing the registered events.
     * @throws If the user is not found or if there is an error during retrieval.
     */
    public async get_registered_events(user_id: string): Promise<attendance[]> {

        try {
            // get the user and populate the registered events
            const user = await base_user_model.findById(user_id).populate('registeredEvents');

            if (!user) {
                throw new Error('User not found');
            }

            const registered_events = await Promise.all(
                // get the events from the attendance IDs
                user.registeredEvents.map(async (attendanceId) => {
                    // get the attendance and populate the event
                    const attendance = await attendance_model.findById(attendanceId).populate('event_id');
                    if (!attendance) {
                        throw new Error('Attendance not found');
                    }
                    return attendance;
                })
            );

            return registered_events;
        } catch (error) {
            throw new Error(`Error to get registered events: ${error}`);
        }
    }

    /**
     * Retrieves the attendees of an event.
     * @param event_id - The ID of the event.
     * @param user_id - The ID of the user making the request.
     * @returns A promise that resolves to an array of attendance objects representing the attendees.
     * @throws If the user does not have access to the event, if the event does not exist, or if there is an error during retrieval.
     */
    public async get_attendees(event_id: string, user_id: string): Promise<attendance[]> {
        try {
            // verify if the user has access to the event
            const event = await event_model.findById(event_id);
            // if the event does not exist or the user is not the organizer, throw an error
            if (!event || event.organizer_id !== user_id) {
                throw new Error('You do not have access to this event or the event does not exist');
            }
            const attendees = await attendance_model.find({ event_id }).populate('user_id');
            return attendees;
        } catch (error) {
            throw new Error(`Error to get attendees: ${error}`);
        }
    }
}

export default new AttendanceService();
