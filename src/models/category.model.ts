import { model, Schema, Document  } from "mongoose";

export interface ICategory extends Document{
    title:string;
    value:string;
}

const categorySchema:Schema = new Schema({
    title: {
        type:String,
        required:true
    },
    value:{
        type:String,
        unique:true,
        required:true
    }
}, {timestamps:true});

export const Category = model<ICategory>("Category", categorySchema);