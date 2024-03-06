import { Express } from "express";
import SuperAdminController from "../controllers/superadmin.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { superadmin_schema } from "../schemas/superadmin.schema";
import { organizer_schema } from "../schemas/organizer.schema";
import { auth_superadmin } from "../middlewares/auth_superadmin";

export const superadmin_routes = (app: Express) => {
    app.post("/create_super_admin",schema_validation(superadmin_schema),SuperAdminController.create_super_admin)
    app.post("/login_super_admin",SuperAdminController.login_super_admin),
    app.post("/create_organizer",auth_superadmin,schema_validation(organizer_schema), SuperAdminController.create_organizer)
}

