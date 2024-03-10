import { Request, Response } from "express";
import EventService from "../services/event.service";

class EventController {

	// get all events or filter by (init_date, type or location) if a query parameter dont match with any of these,
	// return a 400 status code, 
	// if the query parameter is empty, return all events 
	public find_events = async (req: Request, res: Response) => {
		try {
			let events;
			if (req.query.init_date) {
				const init_date = new Date(req.query.init_date as string);
				events = await EventService.find_events_by_init_date(init_date);
			} else if (req.query.type) {
				const type = req.query.type as string;
				events = await EventService.find_events_by_type(type);
			} else if (req.query.location) {
				const location = req.query.location as string;
				events = await EventService.find_events_by_location(location);
			} else if (Object.keys(req.query).length > 0) {
				return res.status(400).json({ message: 'Invalid query parameter!' });
			} else {
				events = await EventService.find_all_events();
			}
			res.status(200).json(events);
		} catch (error) {
			res.status(400).json({ message: 'An error ocurred! :(' + error });
		}
	}

	public find_event_by_id = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const event = await EventService.find_event_by_id(id);
			if (event) {
				res.status(200).json(event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error ocurred! :(' + error });
		}
	}

	// create an event - only the organizer can create an event
	public create_event = async (req: Request, res: Response) => {
		try {
			const event = req.body;
			const new_event = await EventService.create_event(event);
			res.status(201).json(new_event);
		} catch (error) {
			res.status(400).json({ message: 'An error ocurred! :(' + error });
		}
	}

	public update_event = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const event = req.body;
			const user_id = req.body.loggedUser.user_id;

			const updated_event = await EventService.update_event(id, event,user_id);
			if (updated_event) {
				res.status(200).json(updated_event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error ocurred! :(' + error });
		}
	}

	public delete_event = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const user_id = req.body.loggedUser.user_id;
			const deleted_event = await EventService.delete_event(id,user_id);
			if (deleted_event) {
				res.status(200).json(deleted_event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error ocurred! :(' + error });
		}
	}


}

export default new EventController();
