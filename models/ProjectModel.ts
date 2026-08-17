import mongoose, {Schema, Document} from "mongoose";
import { userInterface } from "./UserModel";

export interface projectInterface extends Document {
    title : string
    description : string
    priority : string
    projectStatus : string
    price : number,
    createdBy : userInterface
}

const projectSchema = new Schema<projectInterface>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true,
        default : "normal", 
        enum : ["High", "normal", "low"]
    },
    projectStatus : {
        type : String,
        required : true,
        default : "pending", 
        enum : ["on going", "pending", "rejected"]
    },
    price : {
        type : Number,
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
},{timestamps : true})


export const Project = mongoose.models.projects || mongoose.model<projectInterface>('Project', projectSchema)