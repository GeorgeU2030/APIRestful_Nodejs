import { Request, Response } from "express";
import EventService from "../services/event.service";

class EventController {
	public find_all_events = async (req: Request, res: Response) => {
		try {
			const events = await EventService.find_all_events();
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
			const updated_event = await EventService.update_event(id, event);
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
			const deleted_event = await EventService.delete_event(id);
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
