import { Express } from "express";
import AttendanceController from "../controllers/attendance.controller";
import { auth } from "../middlewares/authentication";

export const attendance_routes = (app: Express) => {
    app.use(auth);
    app.post("/register_for_event/:id", AttendanceController.registerForEvent);
}
