import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username:{
        type: String,
       
    },
    email:{
        type: String,
       
    },
    password:{
        type: String,
        required:true,
    },
},{timestamps:true})

export default model('user', userSchema)