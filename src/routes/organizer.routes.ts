import { Express } from "express";
import OrganizerController from "../controllers/organizer.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { organizer_schema } from "../schemas/organizer.schema";

export const organizer_routes = (app: Express) => {
    app.post("/create_organizer",schema_validation(organizer_schema), OrganizerController.create_organizer)
    app.post("/login_organizer", OrganizerController.login_organizer)
}