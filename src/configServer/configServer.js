import {connect} from "mongoose";
let url = 'mongodb+srv://cperotti:cpm.db@cluster0.gqgbmdf.mongodb.net/ecommerce?retryWrites=true&w=majority'

export const configServer = {
    connectDB:()=>{
        connect(url)
        console.log('Base de datos conectada')
    }
}