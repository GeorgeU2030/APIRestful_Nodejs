import { Express } from "express";
import AttendanceController from "../controllers/attendance.controller";
import { auth, authorize } from "../middlewares/authentication";

/**
 * Registers attendance-related routes to the Express app.
 * @param app - The Express app instance.
 */
export const attendance_routes = (app: Express) => {
    app.use(auth);

    /**
     * Registers a user for an event.
     * @route POST /register_for_event/:id
     * @param id - The ID of the event to register for.
     */
    app.post("/register_for_event/:id", AttendanceController.register_for_event);

    /**
     * Retrieves the list of events that the user has registered for.
     * @route GET /registered_events
     */
    app.get("/registered_events", AttendanceController.get_registered_events);

    /**
     * Retrieves the attendance details for a specific event.
     * Only accessible to organizers.
     * @route GET /attendees/:id
     * @param id - The ID of the event to retrieve attendance details for.
     */
    app.get("/attendees/:id", authorize('Organizer'), AttendanceController.get_attendance);
}
