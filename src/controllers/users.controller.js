import { userService } from "../service/index.js"

class UsersController {
    updateUserPremium = async(req, res)=>{
        try{
            let dataReplace ={premium: true}
            let {uid} = req.params
        
            let response = await userService.updateUserPremium(uid,dataReplace)
            res.send({
                status: 'success',
                payload: response,
            })
        }catch (error){
            req.logger.error(error)
            //console.log(error)
        }
    }

    uploadFiles = async(req, res) => {
        try {
            let {uid} = req.params
            // let files = req.files
            // let response = await userService.uploadFiles(uid)
            // res.send({
            //     status: 'success',
            //     payload: response,
            // })
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default UsersController;