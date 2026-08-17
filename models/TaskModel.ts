import mongoose, { Schema, Document } from "mongoose";
import { userInterface } from "./UserModel";


export interface taskInterface extends Document {
    title: string,
    description: string,
    status: string,
    project: any,
    comments: any,
    attachments: any,
    assignees: userInterface[],
    estimatedHours: TimeRanges,
    totalHours: TimeRanges
}

const taskSchema = new Schema<taskInterface>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ["pending", "In Progress", "Q/A", "Completed", "Revision"],

    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    attachments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    assignees: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    estimatedHours : {
        type : TimeRanges,
        required : true,
    },
    totalHours : {
        type : TimeRanges,
        required : true,
    }

}, { timestamps: true })


export const Task = mongoose.models.tasks || mongoose.model<taskInterface>("Task", taskSchema)