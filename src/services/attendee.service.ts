import { attendee_model, attendee } from "../models/attendee.model";
class AttendeeService {

    public async create_attendee_service(attendee_data: attendee): Promise<attendee> {
        try{
            const new_organizer = new attendee_model(attendee_data);
            return await new_organizer.save();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}

export default new AttendeeService();