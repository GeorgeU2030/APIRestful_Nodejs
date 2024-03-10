import { object, string } from "zod";

/**
 * Represents the schema for an organizer.
 */
export const organizer_schema = object({
    /**
     * The email of the organizer.
     * @remarks Required field.
     * @remarks Must be a valid email address.
     */
    email: string({
        required_error: "Email is required",
    }).email('Invalid email address'),

    /**
     * The password of the organizer.
     * @remarks Required field.
     * @remarks Must be at least 6 characters long.
     */
    password: string({
        required_error: "Password is required",
    }).min(6, 'Password must be at least 6 characters'),

    /**
     * The organization of the organizer.
     * @remarks Required field.
     */
    organization: string({
        required_error: "Organization is required",
    }),

    /**
     * The name of the organizer.
     * @remarks Required field.
     */
    name: string({
        required_error: "Name is required",
    }),

    /**
     * The last name of the organizer.
     * @remarks Required field.
     */
    lastname: string({
        required_error: "LastName is required",
    }),

    /**
     * The rank of the organizer.
     * @remarks Required field.
     */
    rank: string({
        required_error: "Rank is required",
    }),
});