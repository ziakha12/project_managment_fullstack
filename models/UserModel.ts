import mongoose, { Schema, Document } from "mongoose";

export interface userInterface extends Document {

    username: string
    email: string
    password: string
    role: string
    tasks: string[]
    projects: string[]
    permissions: string[]
    avatar: string
    projectCompleted: number
    Attendance: any

}

const userSchema = new Schema<userInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Minimum 8 Characters are required"],
    },
    role: {
        type: String,
        required: true,
        enum : ["manager" , "employee"],
        default : "employee"
    },
    permissions : [{
        type: String,
        required: true,
        enum : ["read", "update", "create", "delete"]
    }],
    projects : [{
        type: Schema.Types.ObjectId,
        ref : "Project",
    }],
    
    tasks : [{
        type: Schema.Types.ObjectId,
        ref : "Task",
        required : true
    }],
    
    avatar : {
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtCAXOYueXDQfxhs7vsSfUQGkPNM1XENi9Bxg7IMPY3A&s=10'
    },
    projectCompleted : {
        type : Number,
        default : 0
    },
    Attendance : [{
        type: Schema.Types.ObjectId,
        ref : "Attendance",
    }],
    
}, { timestamps: true })

export const User = mongoose.models.users || mongoose.model<userInterface>("User", userSchema)