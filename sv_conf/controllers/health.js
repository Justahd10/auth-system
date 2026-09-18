class HealthController{
    constructor(service){
        this.service = service
    }

    testResponse(req, res){
        const testData = 
        this.service.setEchoResponse()

        res.status(200).json({
            'status': "successful",
            'error': null,
            'data': Object.assign(
                testData, res.locals.timestamp
            )
        })
    }
}

export default HealthController