import { Express } from "express";
import OrganizerController from "../controllers/organizer.controller";

export const organizer_routes = (app: Express) => {
    app.post("/login_organizer", OrganizerController.login_organizer)
}