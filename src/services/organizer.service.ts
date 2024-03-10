import { organizer_model, organizer } from "../models/organizer.model";
/**
 * Service class for handling organizer-related operations.
 */
class OrganizerService {

    /**
     * Creates a new organizer.
     * @param organizer_data - The data of the organizer to be created.
     * @returns A promise that resolves to the created organizer.
     * @throws An error if there is a problem creating the organizer.
     */
    public async create_organizer_service(organizer_data: organizer): Promise<organizer> {
        try {
            const new_organizer = new organizer_model(organizer_data);
            return await new_organizer.save();
        } catch (error) {
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}

export default new OrganizerService();