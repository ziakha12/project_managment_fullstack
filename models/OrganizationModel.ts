import mongoose, {Schema, Document} from "mongoose";
import { userInterface } from "./UserModel";

export interface organiztaionInterface extends Document {
    name : string,
    owner : userInterface | string,
    slug : string,
    logo : string,
    organizationStatus : "active" | "inactive" | "suspended",
    plan : {
        type : string,
        seatsAllowed : number,
        seatsUsed : number,
        planStatus : "active" | "inactive" | "suspended",
        trailEndDate : Date,
        isActive : boolean
    },
    setting : {
        timezone : string,
        currency : string,
        aiFeatureEnabled : boolean,
        workingDays : string[],
    }
}

const organizationSchema = new Schema<organiztaionInterface>(
    {
        name : {
            type : String,
            required : true,
            
        },
        slug : {
            type : String,
            required : true, 
        },
        logo : {
            type : String,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User", 
        },
        organizationStatus : {
            type : String,
            required : true,
            deafault : "active",
            enum : ["active", "inactive", "suspended"]
        },
        plan : {
            type : {
                type : String,
                enum : ["free", "pro", "enterprise"]
            },
            seatsAllowed : {
                type : Number,
                default : 3
            },
            seatsUsed : {
                type : Number,
                default : 0
            },
            planStatus : {
                type : String,
                enum : ["active", "inactive", "suspended"],
                default : "active"
            },
            trailEndDate : {
                type : Date
            },
            isActive : {
                type : Boolean,
                default : true
            }
        },
        setting : {
            timezone : {
                type : String,
                default : "UTC"
            },
            currency : {
                type : String,
                default : "USD"
            },
            aiFeatureEnabled : {
                type : Boolean,
                default : false
            },
            workingDays : {
                type : [String],
                default : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
        }
    },
    {
        timestamps : true
    }
)

export const Organization = mongoose.models.organizations || mongoose.model<organiztaionInterface>('Organization', organizationSchema)

