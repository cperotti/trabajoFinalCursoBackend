import {Schema, model} from "mongoose";

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: String, 
    price: {
       type: Number, 
       required: true,
    },
    stock: {
       type: Number, 
       required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,
    }

})

export const productModel = model(collection, productSchema);
