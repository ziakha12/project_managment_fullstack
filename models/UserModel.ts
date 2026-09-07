import mongoose, { Schema, Document } from "mongoose";

export interface userInterface extends Document {

    username: string
    email: string
    password: string,
    refreshToken: string
    organization: string | mongoose.Types.ObjectId | any
    avatar: string
    role: string
    department: string | mongoose.Types.ObjectId | any
    isActive: boolean
    lastLoginAt: Date


}

const userSchema = new Schema<userInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        index: true,
    },

    avatar: { type: String },

    role: {
        type: String,
        enum: ['owner', 'admin', 'hr', 'manager', 'employee', 'client'],
        default: 'employee',
    },

    department: { type: Schema.Types.ObjectId, ref: 'Department' },

    isActive: { type: Boolean, default: true },

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
    refreshToken: {
        type: String
    },
    lastLoginAt: { type: Date },

}, { timestamps: true })

export const User = mongoose.models.users || mongoose.model<userInterface>("User", userSchema)