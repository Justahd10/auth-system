// Helpers
import { prepareResponse, sendErrorResponse } from "../../utils.js"



export default class AuthController{
    static Errors ={
        'credFormat': 422,
        'emailExists': 409,
        'invalidCreds': 401
    }
    
    constructor(service){
        this.service = service
    }

    async handleRegister(req, res){
        // 1. Try create account
        try {
            const accessToken = await this.service.registerAccount(
                req.body.email, req.body.password
            )

            // 2. Return successful strucutre
            prepareResponse({
                'response': res,
                'values': {
                    'access_token': accessToken,
                    'type': "Bearer"
                }
            })

            return res.status(200).json(res.locals.format)

        } catch (error){
            // 2. Return error strucuture
            return sendErrorResponse(error, AuthController, res)
        }
    }

    async handleLogin(req, res){
        // 1. Try access account data
        try {
            const accessToken = await this.service.accessAccount(
                req.body.email, req.body.password
            )

            // 2. Return successful strucutre
            prepareResponse({
                'response': res,
                'values': {
                    'accessToken': accessToken,
                    'type': "Bearer"
                }
            })

            return res.status(200).json(res.locals.format)

        } catch (error){
            // 2. Return error strucuture
            return sendErrorResponse(error, AuthController, res)
        }
            
    }
}