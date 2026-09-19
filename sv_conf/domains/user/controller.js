// Helpers
import { prepareResponse } from "../../utils.js"



export default class UserController{
    #Errors ={
        'credFormat': 422,
        'emailExists': 409
    }
    
    constructor(service){
        this.service = service
    }

    async handleRegister(req, res){
        // 1. Try create user
        try {
            const user = await this.service.registerUser(
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
            prepareResponse({
                'type': "error",
                'response': res,
                'values': { 'error': error.message }
            })

            const code = this.#Errors[error.cause?.type] ?? 500
            return res.status(code).json(res.locals.format)
        }
    }
}