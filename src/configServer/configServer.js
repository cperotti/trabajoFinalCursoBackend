import {connect} from "mongoose";
import dotEnv from 'dotenv';
dotEnv.config({path: './.env'})

let url = process.env.MONGO_URL_SERVER

export const configServer = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDB:()=>{
        connect(url)
        console.log('Base de datos conectada')
    }
}