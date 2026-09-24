import validateRateLimit from "./rate-limit.js"



function setTimestamp(req, res, next){
    res.locals.timestamp = {
        'timestamp': new Date().toISOString()
    }
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
        createResponseFormat,
        validateRateLimit
    ]
}