import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import BaseUserService from '../services/base_user.service';
import AttendeeService from '../services/attendee.service';

class AttendeeController {
    
    public create_attendee = async(req:Request, res:Response) => {
        try{
            const email = req.body.email
            const user = await BaseUserService.find_user_by_email(email);
            if(user){
                res.status(400).json({message:'Attendee already exists!'})
            }else{
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
                const user = req.body;
                const newUser = await AttendeeService.create_attendee_service(user);
                res.status(201).json(newUser);
            }
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }

    public login_attendee = async(req:Request, res:Response) => {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const user = await BaseUserService.find_user_by_email(email);
            if(user){
                const is_valid_password = bcryptjs.compareSync(password, user.password);
                if(is_valid_password){
                    const token = BaseUserService.generateToken(user);
                    res.status(200).json({token});
                }else{
                    res.status(400).json({message:'Password Invalid!'})
                }
            }else{
                res.status(400).json({message:'Attendee not found!'})
            }
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }    
}

export default new AttendeeController();