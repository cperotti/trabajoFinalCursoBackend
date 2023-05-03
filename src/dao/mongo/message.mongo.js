import { messageModel } from "../models/message.model"

class MessageManagerMongo {
    addMessage = async(newMessage)=>{
        try {
            return await messageModel.create(newMessage)
        } catch (error) {
            return new Error(error)
        }
    }
    getMessages = async()=>{
        try {
            return await messageModel.find()
        } catch (error) {
            return new Error(error)
        }
    }
}

export default MessageManagerMongo;