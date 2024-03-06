import { object, string, number } from "zod";

export const attendee_schema = object({
    email: string({
        required_error: "Email is required",
    }).email('Invalid email adress'),
    password: string({
        required_error: "Password is required",
    }).min(6, 'Password must be at least 6 characters'),
    age: number({
        required_error: "Age is required",
    }),
    name: string({
        required_error: "Name is required",
    }),
    lastname: string({
        required_error: "LastName is required",
    }),
    location: string({
        required_error: "Location is required",
    }),
});