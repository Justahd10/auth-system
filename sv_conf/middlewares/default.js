export function appendTimestamp(req, res, next){
    console.log("executed")
    res.locals.timestamp = {
        'timestamp': new Date().toISOString()
    }
    next()
}