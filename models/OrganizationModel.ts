import mongoose, { Schema, Document } from "mongoose";
import { userInterface } from "./UserModel";
import { planInterface } from "./PlanModel";

export interface organiztaionInterface extends Document {
    name: string,
    owner: userInterface | string,
    slug: string,
    logo: string,
    billing: {
        plan: string | planInterface,
        seatsUsed: number,
        planStatus: string,
        isPlanActive : boolean
    }
    organizationStatus: "active" | "inactive" | "suspended",
    setting: {
        timezone: string,
        currency: string,
        aiFeatureEnabled: boolean,
        workingDays: string[],
    }
}

const organizationSchema = new Schema<organiztaionInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        organizationStatus: {
            type: String,
            required: true,
            deafault: "active",
            enum: ["active", "inactive", "suspended"]
        },
        billing : {
            plan: {
                type: Schema.Types.ObjectId,
                ref: "Plan",
                default: 'free'
            },
            seatsUsed : {
                type : Number,
            },
            isPlanActive : {
                type : Boolean,
                default : true
            },
            planStatus : {
                type : String,
                default : 'active',
            },
        },
        setting: {
            timezone: {
                type: String,
                default: "UTC"
            },
            currency: {
                type: String,
                default: "USD"
            },
            aiFeatureEnabled: {
                type: Boolean,
                default: false
            },
            workingDays: {
                type: [String],
                default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
        }
    },
    {
        timestamps: true
    }
)

export const Organization = mongoose.models.organizations || mongoose.model<organiztaionInterface>('Organization', organizationSchema)

