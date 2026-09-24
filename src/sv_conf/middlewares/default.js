import validateRateLimit from "./rate-limit.js"



function setTimestamp(req, res, next){
    res.locals.timestamp = {
        'timestamp': new Date().toISOString()
    }
    next()
}

function createPayload(req, res, next){
    res.locals.payload = {
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
        createPayload,
        validateRateLimit
    ]
}