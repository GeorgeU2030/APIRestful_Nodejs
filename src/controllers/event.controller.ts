import { Request, Response } from "express";
import EventService from "../services/event.service";

/**
 * Controller class for handling events.
 */
class EventController {

	/**
	 * Get all events or filter by (init_date, type, or location) based on the query parameters.
	 * If the query parameter doesn't match any of these, return a 400 status code.
	 * If the query parameter is empty, return all events.
	 * 
	 * @param req - The request object.
	 * @param res - The response object.
	 */
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
			res.status(400).json({ message: 'An error occurred! :(' + error });
		}
	}

	/**
	 * Find an event by its ID.
	 * 
	 * @param req - The request object.
	 * @param res - The response object.
	 */
	public find_event_by_id = async (req: Request, res: Response) => {
		try {
			// get the event id from the request parameters
			const id = req.params.id;
			const event = await EventService.find_event_by_id(id);
			if (event) {
				res.status(200).json(event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error occurred! :(' + error });
		}
	}

	/**
	 * Create a new event. Only the organizer can create an event.
	 * 
	 * @param req - The request object.
	 * @param res - The response object.
	 */
	public create_event = async (req: Request, res: Response) => {
		try {
			// get the event from the request body
			const event = req.body;
			// call the service to create the event
			const new_event = await EventService.create_event(event);
			res.status(201).json(new_event);
		} catch (error) {
			res.status(400).json({ message: 'An error occurred! :(' + error });
		}
	}

	/**
	 * Update an existing event.
	 * 
	 * @param req - The request object.
	 * @param res - The response object.
	 */
	public update_event = async (req: Request, res: Response) => {
		try {
			// get the event id and event from the request parameters and body
			const id = req.params.id;
			// get the event from the request body
			const event = req.body;
			// get the user_id from the request body 
			const user_id = req.body.loggedUser.user_id;

			// call the service to update the event

			const updated_event = await EventService.update_event(id, event, user_id);
			if (updated_event) {
				res.status(200).json(updated_event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error occurred! :(' + error });
		}
	}

	/**
	 * Delete an event.
	 * 
	 * @param req - The request object.
	 * @param res - The response object.
	 */
	public delete_event = async (req: Request, res: Response) => {
		try {
			// get the event id from the request parameters
			const id = req.params.id;
			// get the user_id from the request body
			const user_id = req.body.loggedUser.user_id;
			// call the service to delete the event
			const deleted_event = await EventService.delete_event(id, user_id);
			if (deleted_event) {
				res.status(200).json(deleted_event);
			} else {
				res.status(404).json({ message: 'Event not found!' });
			}
		} catch (error) {
			res.status(400).json({ message: 'An error occurred! :(' + error });
		}
	}
}

export default new EventController();
