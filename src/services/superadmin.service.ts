import { super_admin_model, super_admin } from "../models/superadmin.model";
import { organizer_model, organizer } from "../models/organizer.model";
class SuperAdminService {

    public async create_super_admin_service(super_admin_data: super_admin): Promise<super_admin> {
        try{
            const new_super_admin = new super_admin_model(super_admin_data);
            return await new_super_admin.save();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public async create_organizer_service(organizer_data: super_admin): Promise<organizer> {
        try{
            const new_organizer = new organizer_model(organizer_data);
            return await new_organizer.save();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

}

export default new SuperAdminService();