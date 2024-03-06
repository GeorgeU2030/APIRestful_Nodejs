import { Express } from "express";
import AttendeeController from "../controllers/attendee.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { attendee_schema } from "../schemas/attendee.schema";


export const attendee_routes = (app: Express) => {
    app.post("/create_attendee",schema_validation(attendee_schema), AttendeeController.create_attendee)
    app.post("/login_attendee", AttendeeController.login_attendee)
}

