import { userModel } from "./models/user.model.js";
import moment from "moment";

class UserManagerMongo {

    getUsers = async() =>{
        try {
            return await userModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    validateUser = async(data)=>{
        try {
            return await userModel.findOne(data); 
        } catch (error) {
            return new Error(error)
        }
    }

    existUserRegister = async(email)=>{
        try {
            return await userModel.findOne({email});
        } catch (error) {
            return new Error(error)
        }
    }

    addUser = async(newUser)=>{
        try {
            return await userModel.create(newUser)
        } catch (error) {
            return new Error(error)
        }
    }

    updateUser = async(dataFindUser, dataReplace)=>{
        try {
            return await userModel.updateOne(dataFindUser, dataReplace)
        } catch (error) {
            return new Error(error)
        }
    }

    deleteUser = async(uid)=>{
        try {
            return await userModel.deleteOne({_id: uid})
        } catch (error) {
            return new Error(error)
        }
    }

    deleteInactiveUsers = async()=>{
        try {
            let users = await this.getUsers();

            users.map( async(u)=>{
                const ultimaConexion = moment(u.last_connection)
                const fechaActual = moment(Date.now())
                const tiempoInactividad = fechaActual.diff(ultimaConexion,'d')

                if(tiempoInactividad > 2){
                    return await userModel.deleteOne({_id: u._id})
                }
            })
        } catch (error) {
            return new Error(error)
        }
    }

}

export default UserManagerMongo;