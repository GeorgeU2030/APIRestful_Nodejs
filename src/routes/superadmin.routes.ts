import { Express } from "express";
import SuperAdminController from "../controllers/superadmin.controller";

export const superadmin_routes = (app: Express) => {
    app.post("/create_super_admin",SuperAdminController.create_super_admin)
}

