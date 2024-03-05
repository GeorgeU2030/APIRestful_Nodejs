import { object, string } from "zod";

export const superadmin_schema = object({
    email: string({
        required_error: "Email is required",
    }).email('Invalid email adress'),
    password: string({
        required_error: "Password is required",
    }).min(6, 'Password must be at least 6 characters'),
    key_access: string({
        required_error: "Key access is required",
    }).min(10, 'Key access must be at least 10 characters'),
});