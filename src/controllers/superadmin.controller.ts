import { super_admin_model, super_admin } from "../models/superadmin.model";
import { Request, Response } from "express";
import BaseUserService from "../services/base_user.service";
import SuperAdminService from "../services/superadmin.service";
import bcryptjs from "bcryptjs";

class SuperAdminController {

    public create_super_admin = async(req:Request, res:Response) => {
        try{
            const email = req.body.email;
            const exist_super_admin = await BaseUserService.find_user_by_email(email);
            if(exist_super_admin){
                res.status(400).json({message:'Super Admin already exists!'})
            }else{
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
                req.body.key_access = bcryptjs.hashSync(req.body.key_access, 15);
                const super_admin = req.body;
                const new_super_admin = await SuperAdminService.create_super_admin_service(super_admin);
                res.status(201).json(new_super_admin);
            }
            
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }

    public login_super_admin = async(req:Request, res:Response) => {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const key_access = req.body.key_access;
            const user = await BaseUserService.find_user_by_email(email);
            const user_super_admin = user as super_admin;
            if(user_super_admin && user){
                const is_valid_password = bcryptjs.compareSync(password, user_super_admin.password);
                const is_valid_key = bcryptjs.compareSync(key_access, user_super_admin.key_access);
                if(is_valid_password && is_valid_key){
                    const token = BaseUserService.generateToken(user);
                    res.status(200).json({token});
                }else{
                    res.status(400).json({message:'Password or Key Access Invalid!'})
                }
            }else{
                res.status(400).json({message:'Super Admin not found!'})
            }
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }    

}

export default new SuperAdminController();