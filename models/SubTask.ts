import mongoose, {Schema} from "mongoose";

const subTaskSchema = new Schema({
    tasks : [{
        type : Schema.Types.ObjectId,
        ref : "Task"
    }]
},{timestamps : true})


export const SubTask = mongoose.models.subTask || mongoose.model("SubTask", subTaskSchema)
