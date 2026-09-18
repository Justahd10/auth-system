export default class HealthController{
    constructor(service){
        this.service = service
    }

    testResponse(req, res){
        const testData = 
        this.service.setEchoResponse()
        
        req.locals.format.data ={
            ...req.locals.format.data,
            ...testData
        }

        res.status(200).json(req.locals.format)
    }
}
