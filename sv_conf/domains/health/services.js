class HealthService{
    constructor(repository = null){

    }

    // Build a test strucuture for response
    setEchoResponse(){
        return {
            'test': "successful access"
        }
    }
}

export default HealthService