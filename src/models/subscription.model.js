import mongoose, {Schema} from "mongoose";
//ek schema bnana padega 
const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref :"User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})


export const subscription = mongoose.model("subscription",subscription)