import { Schema, model } from "mongoose";

const collection = 'tickets'

const ticketSchema = new Schema({
    code:{
        type: String,
        unique: true
    },
    purchase_datetime:{
        type: String
    },
    amount:{
        type: Number
    },
    purchaser:{
        type: String
    }
})

export const ticketModel = model(collection, ticketSchema);