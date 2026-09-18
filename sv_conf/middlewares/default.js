export function setTimestamp(req, res, next){
    console.log("executed")
    res.locals.timestamp = {
        'timestamp': new Date().toISOString()
    }
    next()
}


// The counter is storaged in backend memory
// Redis data base is better for big systems
export function validateRateLimit(req, res, next){
    // Access IP of the origin device
    

    // Check the current rate limit counter


        // 1. return Too Many Request

    
    // add to rate limit counter
    

    // return to continues
    next()
}

export function createResponseFormat(req, res, next){
    req.locals.format = {
        'status': "successful",
        'error': null,
        'data': {
            'timestamp': req.locals.timestamp
        }
    }
}
