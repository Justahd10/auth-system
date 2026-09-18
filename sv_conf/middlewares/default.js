function setTimestamp(req, res, next){
    console.log("executed")
    res.locals.timestamp = {
        'timestamp': new Date().toISOString()
    }
    next()
}


// The counter is storaged in backend memory
// Redis data base is better for big systems
function validateRateLimit(req, res, next){
    // Access IP of the origin device
    

    // Check the current rate limit counter


        // 1. return Too Many Request

    
    // add to rate limit counter
    

    // return to continues
    next()
}

function createResponseFormat(req, res, next){
    res.locals.format = {
        'status': "successful",
        'error': null,
        'data': {
            ...res.locals.timestamp
        }
    }

    next()
}


export default function getDefaultMiddlewares(){
    return [
        setTimestamp,
        validateRateLimit,
        createResponseFormat
    ]
}