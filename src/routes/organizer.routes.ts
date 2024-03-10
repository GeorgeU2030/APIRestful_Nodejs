import { Express } from "express";
import OrganizerController from "../controllers/organizer.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { organizer_schema } from "../schemas/organizer.schema";

/**
 * Defines the routes related to organizers.
 * @param app The Express application instance.
 */
export const organizer_routes = (app: Express) => {
    /**
     * Route to create a new organizer.
     * @route POST /create_organizer
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @param {function} next - The next middleware function.
     */
    app.post("/create_organizer", schema_validation(organizer_schema), OrganizerController.create_organizer);

    /**
     * Route to login an organizer.
     * @route POST /login_organizer
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @param {function} next - The next middleware function.
     */
    app.post("/login_organizer", OrganizerController.login_organizer);
}