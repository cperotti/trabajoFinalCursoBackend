import nodemailer from 'nodemailer';
import { configServer } from '../configServer/configServer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configServer.gmail_user_app,
        pass: configServer.gmail_pass_app
    }
})

export const sendMail = async (destino, subject, html)=>{
    return await transport.sendMail({
        from: 'Ecommerce <carolinaperotti16@gmail.com>',
        to: destino,
        subject,
        html,
    })
}
