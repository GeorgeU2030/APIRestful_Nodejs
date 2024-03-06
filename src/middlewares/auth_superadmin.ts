import jwt, {TokenExpiredError} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export const auth_superadmin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header('Authorization');
        if(!token){
            return res.status(401).json({message: 'Access Denied'});
        }
        token = token.replace('Bearer ', '');
        const data = jwt.verify(token, process.env.TOKEN_SECRET || 'secret_key') as any;
        req.body.loggedUser = data;
        req.params.id = data.user_id;
        if (data.role !== 'SuperAdmin') {
            return res.status(403).json({message: 'Access Denied: Only SuperAdmin allowed'});
        }
        next();

    }catch(error){
        if (error instanceof TokenExpiredError){
            return res.status(401).json({message: 'Token expired'});
        }
        return res.status(401).json({message: 'Token invalid'});
    }
}