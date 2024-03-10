import jwt, {TokenExpiredError} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

/**
 * Middleware function to authenticate the user using JWT token.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // get the token from the request header
        let token = req.header('Authorization');
        if(!token){
            // if the token is not present, return an http 401 response
            return res.status(401).json({message: 'Access Denied'});
        }
        // verify the token
        token = token.replace('Bearer ', '');
        // get the data from the token
        const data = jwt.verify(token, process.env.TOKEN_SECRET || 'secret_key');
        // set the logged user in the request body
        req.body.loggedUser = data;
        // set the user id in the request parameters
        req.params.id = (data as any).user_id;
        next();

    }catch(error){
        if (error instanceof TokenExpiredError){
            return res.status(401).json({message: 'Token expired'});
        }
        return res.status(401).json({message: 'Token invalid'});
    }
}

/**
 * Middleware function to authorize access based on user role.
 * @param requiredRole - The required role for accessing the resource.
 * @returns A middleware function.
 */
export const authorize = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // get the role from the request body, it was registered in the generate token
        const role = req.body.loggedUser.role;
        if (role !== requiredRole) {
            // if the role is not the required role, return an http 403 response
            return res.status(403).json({message: 'Forbidden access'});
        }
        next();
    };
};