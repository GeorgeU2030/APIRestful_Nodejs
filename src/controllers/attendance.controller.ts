import { Request,Response } from "express";
import AttendanceService from "../services/attendance.service";
class AttendanceController{

    public register_for_event = async (req: Request, res: Response) => {
        const event_id = req.params.id;
        const user_id = req.body.loggedUser.user_id;
        try {
            // verify if the user is registered in the event
            const register = await AttendanceService.registerForEvent(event_id, user_id);
            return res.status(200).json({ message: 'Registration Succesfull', register});
        } catch (error) {
            return res.status(500).json({ message: `Error in the register: ${error}` });
        }
    }

    public get_registered_events = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.loggedUser.user_id;
            const registeredEvents = await AttendanceService.get_registered_events(user_id);
            return res.status(200).json({ registeredEvents });
        } catch (error) {
            return res.status(500).json({ message: `Error al obtener eventos inscritos: ${error}` });
        }
    };

    public get_attendance = async (req: Request, res: Response) => {
        try{
            const event_id = req.params.id;
            const user_id = req.body.loggedUser.user_id;

            const attendees = await AttendanceService.get_attendees(event_id, user_id);
            return res.status(200).json({attendees});
        }catch(error){
            return res.status(500).json({message: `Error to get attendees: ${error}`});
        }
    }
    
    
}

export default new AttendanceController();