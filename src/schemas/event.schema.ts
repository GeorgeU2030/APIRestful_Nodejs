import { object, string, z } from "zod";

/**
 * Represents the schema for an event.
 */
export const event_schema = object({
    /**
     * The title of the event.
     */
    title: string({
        required_error: "Title is required",
    }),
    /**
     * The description of the event.
     */
    description: string({
        required_error: "Description is required",
    }),
    /**
     * The initial date of the event.
     */
    init_date: string({
        required_error: "Init date is required",
    }),
    /**
     * The initial time of the event.
     */
    init_time: string({
        required_error: "Init time is required",
    }),
    /**
     * The end date of the event.
     */
    end_date: string({
        required_error: "End date is required",
    }),
    /**
     * The end time of the event.
     */
    end_time: string({
        required_error: "End time is required",
    }),
    /**
     * The type of the event.
     * Possible values: "Conference", "Concert", "Sports", "Exhibition", "Networking", "Party".
     */
    type: z.enum(["Conference", "Concert","Sports","Exhibition","Networking","Party"], {
        required_error: "Type is required",
    }),
    /**
     * The ID of the event organizer.
     */
    organizer_id: string({
        required_error: "Organizer is required",
    }),
    /**
     * The location of the event.
     */
    location: string({
        required_error: "Location is required",
    }),
});

