// Helpers
import { prepareResponse, sendErrorResponse } from "../../utils.js"



export default class UserController{
    static Errors ={
        'credFormat': 422,
        'emailExists': 409,
        'invalidCreds': 401
    }
    
    constructor(service){
        this.service = service
    }

    async handleRegister(req, res){
        // 1. Try create user
        try {
            await this.service.registerUserAccount(
                req.body.email, req.body.password
            )

            // 2. Return successful strucutre
            prepareResponse({
                'response': res,
                'values': {'email': req.body.email}
            })

            return res.status(200).json(res.locals.format)

        } catch (error){
            // 2. Return error strucuture
            return sendErrorResponse(error, UserController, res)
        }
    }

    async handleLogin(req, res){
        // 1. Try access user account datas
        try {
            await this.service.accessUserAccount(
                req.body.email, req.body.password
            )

            // 2. Return successful strucutre
            prepareResponse({'response': res })

            return res.status(200).json(res.locals.format)

        } catch (error){
            // 2. Return error strucuture
            return sendErrorResponse(error, UserController, res)
        }
            
    }
}