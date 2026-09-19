// Helpers
import { prepareResponse } from "../../utils.js"



export default class HealthController{
    constructor(service){
        this.service = service
    }

    testResponse(req, res){
        const testData = this.service.setEchoResponse()
        
        prepareResponse({
            'response': res, 'values': testData
        })

        res.status(200).json(res.locals.format)
    }
}
