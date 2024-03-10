import { Express } from "express";
import AttendeeController from "../controllers/attendee.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { attendee_schema } from "../schemas/attendee.schema";

/**
 * Defines the routes related to attendees.
 * @param app - The Express application.
 */
export const attendee_routes = (app: Express) => {
    /**
     * Route for creating a new attendee.
     * @route POST /create_attendee
     * @param attendee_schema - The schema for validating the attendee data.
     * @handler AttendeeController.create_attendee - The controller method for creating an attendee.
     */
    app.post("/create_attendee", schema_validation(attendee_schema), AttendeeController.create_attendee);

    /**
     * Route for attendee login.
     * @route POST /login_attendee
     * @handler AttendeeController.login_attendee - The controller method for attendee login.
     */
    app.post("/login_attendee", AttendeeController.login_attendee);
}

