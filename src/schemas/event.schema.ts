import { object, string } from "zod";

export const event_schema = object({
    title: string({
        required_error: "Title is required",
    }),
    description: string({
        required_error: "Description is required",
    }),
    init_date: string({
        required_error: "Init date is required",
    }),
    init_time: string({
        required_error: "Init time is required",
    }),
    end_date: string({
        required_error: "End date is required",
    }),
    end_time: string({
        required_error: "End time is required",
    }),
    location: string({
        required_error: "Location is required",
    }),
});