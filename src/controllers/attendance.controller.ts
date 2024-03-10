import { Request,Response } from "express";
import AttendanceService from "../services/attendance.service";
/**
 * Controller class for managing attendance related operations.
 */
class AttendanceController {

    /**
     * Registers a user for an event.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response indicating the success or failure of the registration.
     */
    public register_for_event = async (req: Request, res: Response) => {
        const event_id = req.params.id;
        const user_id = req.body.loggedUser.user_id;
        try {
            // call the service to register the user for the event
            const register = await AttendanceService.registerForEvent(event_id, user_id);
            return res.status(200).json({ message: 'Registration Successful', register });
        } catch (error) {
            return res.status(500).json({ message: `Error in the registration: ${error}` });
        }
    }

    /**
     * Retrieves the events that a user is registered for.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response containing the registered events.
     */
    public get_registered_events = async (req: Request, res: Response) => {
        try {
            // get the user_id from the request body
            const user_id = req.body.loggedUser.user_id;
            // call the service to get the registered events
            const registeredEvents = await AttendanceService.get_registered_events(user_id);
            return res.status(200).json({ registeredEvents });
        } catch (error) {
            return res.status(500).json({ message: `Error retrieving registered events: ${error}` });
        }
    };

    /**
     * Retrieves the attendees of an event.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON response containing the attendees of the event.
     */
    public get_attendance = async (req: Request, res: Response) => {
        try {
            // get the event_id and user_id from the request parameters and body
            const event_id = req.params.id;
            const user_id = req.body.loggedUser.user_id;

            // call the service to get the attendees
            const attendees = await AttendanceService.get_attendees(event_id, user_id);
            return res.status(200).json({ attendees });
        } catch (error) {
            return res.status(500).json({ message: `Error retrieving attendees: ${error}` });
        }
    }
}

export default new AttendanceController();