import { Express } from "express";
import SuperAdminController from "../controllers/superadmin.controller";
import { schema_validation } from "../middlewares/schema_validation";
import { superadmin_schema } from "../schemas/superadmin.schema";

export const superadmin_routes = (app: Express) => {
    app.post("/create_super_admin",schema_validation(superadmin_schema),SuperAdminController.create_super_admin)
}

