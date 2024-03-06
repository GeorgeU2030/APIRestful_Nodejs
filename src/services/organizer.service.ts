import { organizer_model, organizer } from "../models/organizer.model";
class OrganizerService {

    public async create_organizer_service(organizer_data: organizer): Promise<organizer> {
        try{
            const new_organizer = new organizer_model(organizer_data);
            return await new_organizer.save();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}

export default new OrganizerService();