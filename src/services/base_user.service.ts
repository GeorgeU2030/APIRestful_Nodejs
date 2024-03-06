import jwt from "jsonwebtoken";
import { super_admin } from "../models/superadmin.model";
import { organizer } from "../models/organizer.model";
import { attendee } from "../models/attendee.model";
import { base_user_model, base_user } from "../models/base_user.model";
class BaseUserService  {
   
    public async find_user_by_email(email: string): Promise<base_user | null> {
        try {
            const user = await  base_user_model.findOne({email});
            return user;
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public generateToken (user: base_user):string {
        try{
            return jwt.sign({user_id:user.id,email:user.email,role:user.__t}, process.env.TOKEN_SECRET as string, {expiresIn: '10m'});
        }catch(error){
            throw new Error((error as Error).message);
        }
    }
}

export default new BaseUserService();