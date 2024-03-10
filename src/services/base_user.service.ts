import jwt from "jsonwebtoken";
import { base_user_model, base_user } from "../models/base_user.model";
/**
 * Service class for handling base user operations.
 */
class BaseUserService {
    /**
     * Finds a user by email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the found user or null if not found.
     * @throws An error if there was a problem during the operation.
     */
    public async find_user_by_email(email: string): Promise<base_user | null> {
        try {
            const user = await base_user_model.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`A problem occurred: ${error}`);
        }
    }

    /**
     * Generates a token for the given user.
     * @param user - The user object for which to generate the token.
     * @returns The generated token.
     * @throws An error if there was a problem during the operation.
     */
    public generateToken(user: base_user): string {
        try {
            return jwt.sign(
                // generate the token with the user id, email and role
                { user_id: user.id, email: user.email, role: user.__t },
                process.env.TOKEN_SECRET as string,
                { expiresIn: '60m' }
            );
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
export default new BaseUserService();
