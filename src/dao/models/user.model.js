import {Schema, model} from "mongoose";

const collection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
       type: String,
       unique: true, 
       required: true,
    },
    date_of_birth: {
       type: String,
    },
    password: {
        type: String,
        unique: true,
    },

})

export const userModel = model(collection, userSchema);