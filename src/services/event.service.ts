import { event_model, event } from "../models/events.model";

/**
 * Checks if the given user is the organizer of the event.
 * @param userId - The ID of the user.
 * @param event - The event object.
 * @returns True if the user is the organizer of the event, false otherwise.
 */
const isMyEvent = (userId: string, event: event): boolean => {
    return event.organizer_id === userId; // Make sure you have the 'organizerId' field in your event model
};

class EventService {
    /**
     * Retrieves all events.
     * @returns A promise that resolves to an array of events.
     * @throws If there is an error while retrieving the events.
     */
    public async find_all_events(): Promise<event[]> {
        try {
            return await event_model.find();
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Retrieves an event by its ID.
     * @param id - The ID of the event.
     * @returns A promise that resolves to the event object, or null if not found.
     * @throws If there is an error while retrieving the event.
     */
    public async find_event_by_id(id: string): Promise<event | null> {
        try {
            return await event_model.findById(id);
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Creates a new event.
     * @param event - The event object to create.
     * @returns A promise that resolves to the created event object.
     * @throws If there is an error while creating the event.
     */
    public async create_event(event: event): Promise<event> {
        try {
            const new_event = new event_model(event);
            return await new_event.save();
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Updates an event by its ID.
     * @param id - The ID of the event to update.
     * @param event - The updated event object.
     * @param user_id - The ID of the user performing the update.
     * @returns A promise that resolves to the updated event object, or null if not found.
     * @throws If the user is not the organizer of the event or there is an error while updating the event.
     */
    public async update_event(id: string, event: event, user_id: string): Promise<event | null> {
        try {
            if (!isMyEvent(user_id, event)) {
                throw new Error('You are not the organizer of this event!');
            }
            return await event_model.findByIdAndUpdate(id, event, { new: true });
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Deletes an event by its ID.
     * @param id - The ID of the event to delete.
     * @param user_id - The ID of the user performing the delete.
     * @returns A promise that resolves to the deleted event object, or null if not found.
     * @throws If the user is not the organizer of the event or there is an error while deleting the event.
     */
    public async delete_event(id: string, user_id: string): Promise<event | null> {
        try {
            const event_found = await event_model.findById(id);
            if (event_found && !isMyEvent(user_id, event_found)) {
                throw new Error('You are not the organizer of this event!');
            }
            return await event_model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    // filters of events

    /**
     * Retrieves events by type.
     * @param type - The type of events to retrieve.
     * @returns A promise that resolves to an array of events matching the type.
     * @throws If there is an error while retrieving the events.
     */
    public async find_events_by_type(type: string): Promise<event[]> {
        try {
            return await event_model.find({ type });
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Retrieves events by location.
     * @param location - The location of events to retrieve.
     * @returns A promise that resolves to an array of events matching the location.
     * @throws If there is an error while retrieving the events.
     */
    public async find_events_by_location(location: string): Promise<event[]> {
        try {
            return await event_model.find({ location });
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }

    /**
     * Retrieves events by initial date.
     * @param date - The initial date of events to retrieve.
     * @returns A promise that resolves to an array of events matching the initial date.
     * @throws If there is an error while retrieving the events.
     */
    public async find_events_by_init_date(date: Date): Promise<event[]> {
        try {
            return await event_model.find({ init_date: date });
        } catch (error) {
            throw new Error(`A problem occurred :( ${error}`);
        }
    }
}

export default new EventService();