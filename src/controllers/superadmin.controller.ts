import { super_admin_model, super_admin } from "../models/superadmin.schema";
import { Request, Response } from "express";
import BaseUserService from "../services/base_user.service";
import SuperAdminService from "../services/superadmin.service";
import bcryptjs from "bcryptjs";


class SuperAdminController {
    private base_user_service = new BaseUserService<super_admin>(super_admin_model);

    public create_super_admin = async(req:Request, res:Response) => {
        try{
            const email = req.body.email;
            const exist_super_admin = await this.base_user_service.findUserByEmail(email);
            if(exist_super_admin){
                res.status(400).json({message:'Super Admin already exists!'})
            }else{
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
                const super_admin = req.body;
                const new_super_admin = await SuperAdminService.create_super_admin_service(super_admin);
                res.status(201).json(new_super_admin);
            }
            
        }catch(error){
            res.status(400).json({message:'An error ocurred! :('+error})
        }
    }

}

export default new SuperAdminController();