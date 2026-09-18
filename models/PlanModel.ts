import mongoose,{Document, Schema} from "mongoose";


export interface planInterface extends Document {
        seatsAllowed : number,
        price : number,
        name : string,
        metaDiscription : string[]
}

const planSchema = new Schema<planInterface>({
    name  : {
        type : String,
        required : true,
        trim : true
    },
    seatsAllowed : {
        type : Number,
        required : true,
    },
    metaDiscription : [{
        type : String,
        required : true 
    }],
    price : {
        type : Number,
        required : true
    }
},{timestamps : true})

export const Plan = mongoose.models.plans || mongoose.model<planInterface>("Plan", planSchema)