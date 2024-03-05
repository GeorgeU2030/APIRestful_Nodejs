import jwt, {TokenExpiredError} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header('Authorization');
        if(!token){
            return res.status(401).json({message: 'Access Denied'});
        }
        token = token.replace('Bearer ', '');
        const data = jwt.verify(token, process.env.TOKEN_SECRET || 'secret_key');
        req.body.loggedUser = data;
        req.params.id = (data as any).user_id;
        next();

    }catch(error){
        if (error instanceof TokenExpiredError){
            return res.status(401).json({message: 'Token expired'});
        }
        return res.status(401).json({message: 'Token invalid'});
    }
}
