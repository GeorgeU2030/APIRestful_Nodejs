import { object, string, number } from "zod";

/**
 * Schema for the attendee object.
 */
export const attendee_schema = object({
    /**
     * Email of the attendee.
     * @remarks
     * This field is required and must be a valid email address.
     */
    email: string({
        required_error: "Email is required",
    }).email('Invalid email address'),

    /**
     * Password of the attendee.
     * @remarks
     * This field is required and must be at least 6 characters long.
     */
    password: string({
        required_error: "Password is required",
    }).min(6, 'Password must be at least 6 characters'),

    /**
     * Age of the attendee.
     * @remarks
     * This field is required.
     */
    age: number({
        required_error: "Age is required",
    }),

    /**
     * Name of the attendee.
     * @remarks
     * This field is required.
     */
    name: string({
        required_error: "Name is required",
    }),

    /**
     * Last name of the attendee.
     * @remarks
     * This field is required.
     */
    lastname: string({
        required_error: "LastName is required",
    }),

    /**
     * Location of the attendee.
     * @remarks
     * This field is required.
     */
    location: string({
        required_error: "Location is required",
    }),
});