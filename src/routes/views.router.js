import {Router} from 'express';
import MessageManagerMongo from '../dao/mongo/message.mongo.js';

const messageMongo = new MessageManagerMongo();

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const messages = await messageMongo.getMessages()
        let data = {
            title: 'Mensajes',
            messages,
            hasMessages: messages.length > 0
        }
        res.render('chat', data)
    }catch (error){
        console.log(error)
    }
})

router.post('/', async(req, res)=>{
    try{
        const message= req.body;
        await messageMongo.addMessage(message)

        const messages = await messageMongo.getMessages()
        let data = {
            title: 'Mensajes',
            messages,
            hasMessages: messages.length > 0
        }

        res.render('chat', data)
     
    }catch (error){
        console.log(error)
    }
})

export default router;