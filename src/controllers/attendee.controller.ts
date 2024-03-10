import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import BaseUserService from '../services/base_user.service';
import AttendeeService from '../services/attendee.service';

/**
 * Controller class for managing attendees.
 */
class AttendeeController {
    
    /**
     * Creates a new attendee.
     * 
     * @param req - The request object.
     * @param res - The response object.
     */
    public create_attendee = async(req: Request, res: Response) => {
        try {
            // check if the attendee already exists
            const email = req.body.email;
            // call the service to create the attendee
            const user = await BaseUserService.find_user_by_email(email);
            if (user) {
                // if the user exists, return an http 400 response
                res.status(400).json({ message: 'Attendee already exists!' });
            } else {
                // if the user does not exist, hash the password and create the user
                // encrypt the password
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
                // create the user with the body request
                const user = req.body;
                const newUser = await AttendeeService.create_attendee_service(user);
                res.status(201).json(newUser);
            }
        } catch (error) {
            res.status(400).json({ message: 'An error occurred! :(' + error });
        }
    }

    /**
     * Logs in an attendee.
     * 
     * @param req - The request object.
     * @param res - The response object.
     */
    public login_attendee = async(req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await BaseUserService.find_user_by_email(email);
            if (user) {
                const is_valid_password = bcryptjs.compareSync(password, user.password);
                if (is_valid_password) {
                    const token = BaseUserService.generateToken(user);
                    res.status(200).json({ token });
                } else {
                    res.status(400).json({ message: 'Invalid password!' });
                }
            } else {
                res.status(400).json({ message: 'Attendee not found!' });
            }
        } catch (error) {
            res.status(400).json({ message: 'An error occurred! :(' + error });
        }
    }    
}

export default new AttendeeController();