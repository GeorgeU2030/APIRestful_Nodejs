import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const schema_validation = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: `Validation error: ${err.message}`});
        }
    };
}
