// name
// employees
// owner

import mongoose, {Schema, Document} from "mongoose";
import { userInterface } from "./UserModel";

export interface organiztaionInterface extends Document {
    name : string,
    employees : string[],
    owner : userInterface | string
    projects : string[],
    tasks : string[],
    departments : string[],
    salaries : string[]
}

const organizationSchema = new Schema<organiztaionInterface>(
    {
        name : {
            type : String,
            required : true,
            
        }
    },
    {
        timestamps : true
    }
)


