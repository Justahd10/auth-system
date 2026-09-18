export default class HealthController{
    constructor(service){
        this.service = service
    }

    testResponse(req, res){
        const testData = this.service.setEchoResponse()
        
        res.locals.format.data ={
            ...res.locals.format.data,
            ...testData
        }

        res.status(200).json(res.locals.format)
    }
}
