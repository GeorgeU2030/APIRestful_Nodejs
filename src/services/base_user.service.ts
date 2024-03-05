import {Document, Model} from "mongoose";

class BaseUserService<T extends Document>  {
    private user_model: Model<T>;

    constructor(user_model: Model<T>) {
        this.user_model = user_model;
    }

    public async findUserByEmail(email: string): Promise<T | null> {
        try {
            return await this.user_model.findOne({email});
        }catch(error){
            throw new Error(`A problem ocurred :( ${error}`);
        }
    }
}

export default BaseUserService;