import { Express } from 'express';
import EventController from '../controllers/event.controller'
import { schema_validation } from "../middlewares/schema_validation";
import { event_schema } from '../schemas/event.schema';
import { auth, authorize } from '../middlewares/authentication';

/**
 * Sets up the event routes.
 * @param app - The Express application.
 */
export const event_routes = (app: Express) => {
    /**
     * Middleware for authenticating requests.
     */
    app.use(auth);

    /**
     * Route for finding all events.
     */
    app.get("/events", EventController.find_events);

    /**
     * Route for finding an event by ID.
     * @param id - The ID of the event.
     */
    app.get("/event/:id", EventController.find_event_by_id);

    /**
     * Route for creating a new event.
     * @param body - The request body containing the event data.
     * @returns The created event.
     */
    app.post("/create_event", authorize('Organizer'), schema_validation(event_schema), EventController.create_event);

    /**
     * Route for updating an existing event.
     * @param id - The ID of the event to update.
     * @param body - The request body containing the updated event data.
     * @returns The updated event.
     */
    app.put("/update_event/:id", authorize('Organizer'), schema_validation(event_schema), EventController.update_event);

    /**
     * Route for deleting an event.
     * @param id - The ID of the event to delete.
     * @returns A message indicating the success of the deletion.
     */
    app.delete("/delete_event/:id", authorize('Organizer'), EventController.delete_event);
}