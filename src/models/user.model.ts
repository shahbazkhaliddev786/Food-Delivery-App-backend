import { model, Schema, Document  } from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    profile?:string;
    isVerified:boolean;
    verifyToken?:string;
}

const userSchema:Schema = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    profile:{
        type: String
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    verifyToken:{type:String},
}, {timestamps:true});

export const User = model<IUser>("User", userSchema);