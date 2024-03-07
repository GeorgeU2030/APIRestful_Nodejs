import { event_model, event } from "../models/events.model";

export class EventService {
    public async get_events(): Promise<event[]> {
        try{
            return await event_model.find();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public async get_event(id: string): Promise<event | null> {
        try{
            return await event_model.findById(id);
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public async create_event(event: event): Promise<event> {
        try{
            const new_event = new event_model(event);
            return await new_event.save();
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public async update_event(id: string, event: event): Promise<event | null> {
        try{
            return await event_model.findByIdAndUpdate(id, event, {new:true});
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }

    public async delete_event(id: string): Promise<event | null> {
        try{
            return await event_model.findByIdAndDelete(id);
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}