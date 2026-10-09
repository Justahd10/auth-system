// Helpers
import { prepareResponse } from "../../utils.js"



export default class HealthController{
    
    /**
     * @param {import('./services.js').default} service 
     */
    constructor(service){
        this.service = service
    }

    /** 
     * @param {import('express').Response} res 
     */
    testResponse(res){
        const testData = this.service.setEchoResponse()
        
        prepareResponse({
            'response': res, 'values': testData
        })

        res.status(200).json(res.locals.payload)
    }
}
