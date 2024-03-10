import { Express } from "express";
import AttendanceController from "../controllers/attendance.controller";
import { auth, authorize } from "../middlewares/authentication";

export const attendance_routes = (app: Express) => {
    app.use(auth);
    app.post("/register_for_event/:id", AttendanceController.register_for_event);
    app.get("/registered_events", AttendanceController.get_registered_events);
    app.get("/attendees/:id",authorize('Organizer'), AttendanceController.get_attendance);
}
