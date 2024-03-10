
import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware function for validating request body against a schema.
 * @param schema - The schema to validate against.
 * @returns The middleware function.
 */
export const schema_validation = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // validate the request body against the schema
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: `Validation error: ${err.message}`});
        }
    };
}
