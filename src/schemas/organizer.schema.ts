import { object, string } from "zod";

export const organizer_schema = object({
    email: string({
        required_error: "Email is required",
    }).email('Invalid email adress'),
    password: string({
        required_error: "Password is required",
    }).min(6, 'Password must be at least 6 characters'),
    organization: string({
        required_error: "Organization is required",
    }),
    name: string({
        required_error: "Name is required",
    }),
    lastname: string({
        required_error: "LastName is required",
    }),
    rank: string({
        required_error: "Rank is required",
    }),
});