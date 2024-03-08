import { Express } from 'express';
import EventController from '../controllers/event.controller'
import { schema_validation } from "../middlewares/schema_validation";
import { event_schema } from '../schemas/event.schema';
import { auth } from '../middlewares/authentication';

export const event_routes = (app: Express) => {
    app.use(auth);
    app.get("/events", EventController.find_all_events);
    app.get("/event/:id", EventController.find_event_by_id);
    app.post("/create_event", schema_validation(event_schema), EventController.create_event);
    app.put("/update_event/:id", schema_validation(event_schema), EventController.update_event);
    app.delete("/delete_event/:id", EventController.delete_event);
}