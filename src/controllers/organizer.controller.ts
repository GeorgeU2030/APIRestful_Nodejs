import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import BaseUserService from "../services/base_user.service";
import OrganizerService from "../services/organizer.service";

/**
 * Controller class for handling organizer-related operations.
 */
class OrganizerController {

    /**
     * Creates a new organizer.
     * 
     * @param req - The request object.
     * @param res - The response object.
     */
    public create_organizer = async (req: Request, res: Response) => {
        try {
            // get the email from the request body
            const email = req.body.email;
            // check if the organizer already exists
            const user = await BaseUserService.find_user_by_email(email);
            if (user) {
                // organizer already exists
                res.status(400).json({ message: 'Organizer already exists!' });
            } else {
                // hash the password
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
                // create the user
                const user = req.body;
                // call the service to create the organizer
                const newUser = await OrganizerService.create_organizer_service(user);
                res.status(201).json(newUser);
            }
        } catch (error) {
            res.status(400).json({ message: 'An error occurred! :(' + error });
        }
    }

    /**
     * Logs in an organizer.
     * 
     * @param req - The request object.
     * @param res - The response object.
     */
    public login_organizer = async (req: Request, res: Response) => {
        try {
            // get the email and password from the request body
            const email = req.body.email;
            // get the password from the request body
            const password = req.body.password;
            // call the service to find the organizer by email
            const user = await BaseUserService.find_user_by_email(email);
            if (user) {
                // check if the password is valid
                const is_valid_password = bcryptjs.compareSync(password, user.password);
                if (is_valid_password) {
                    // generate a token using the baseuser service
                    const token = BaseUserService.generateToken(user);
                    res.status(200).json({ token });
                } else {
                    // invalid password
                    res.status(400).json({ message: 'Invalid password!' });
                }
            } else {
                // organizer not found
                res.status(400).json({ message: 'Organizer not found!' });
            }
        } catch (error) {
            res.status(400).json({ message: 'An error occurred! :(' + error });
        }
    }
}

export default new OrganizerController( )