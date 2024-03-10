import { attendee_model, attendee } from "../models/attendee.model";
/**
 * Service class for managing attendees.
 */
class AttendeeService {

    /**
     * Creates a new attendee.
     * @param attendee_data - The data of the attendee to be created.
     * @returns A promise that resolves to the created attendee.
     * @throws An error if there is a problem creating the attendee.
     */
    public async create_attendee_service(attendee_data: attendee): Promise<attendee> {
        try {
            // create the attendee
            const new_organizer = new attendee_model(attendee_data);
            return await new_organizer.save();
        } catch (error) {
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}

export default new AttendeeService();