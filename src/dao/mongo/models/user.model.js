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
       type: Date,
    },
    password: {
        type: String,
        unique: true,
    },
    cartId: {
        type:Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String
    },
    premiun: {
        type: Boolean,
        default: false
    },
    documents: [{
        name: String,
        reference: String,
    }],
    last_connection: {
        type: Date,
    },

})

export const userModel = model(collection, userSchema);