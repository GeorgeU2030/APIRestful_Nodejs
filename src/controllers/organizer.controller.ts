import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import BaseUserService from "../services/base_user.service";
import { organizer } from "../models/organizer.model";

class OrganizerController {

    public login_organizer = async(req:Request, res:Response) => {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const user = await BaseUserService.find_user_by_email(email);
            const user_organizer = user as organizer;
            if(user_organizer && user){
                const is_valid_password = bcryptjs.compareSync(password, user_organizer.password);
                if(is_valid_password){
                    const token = BaseUserService.generateToken(user);
                    res.status(200).json({token});
                }else{
                    res.status(400).json({message:'Password Invalid!'})
                }
            }else{
                res.status(400).json({message:'Organizer not found!'})
            }
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }    
}

export default new OrganizerController( )