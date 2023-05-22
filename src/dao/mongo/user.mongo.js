import { userModel } from "../models/user.model.js";

class UserManagerMongo {

    getUsers = async() =>{
        try {
            return await userModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    validateUser = async(email, password)=>{
        try {
            return await userModel.findOne({email, password}); 
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

}

export default UserManagerMongo;