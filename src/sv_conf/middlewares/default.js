import validateRateLimit from "./rate-limit.js"



/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function setTimestamp(req, res, next) {
  res.locals.timestamp = {
    'timestamp': new Date().toISOString()
  }
  next()
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function createPayload(req, res, next) {
  res.locals.payload = {
    'status': "successful",
    'error': null,
    'data': {
      ...res.locals.timestamp
    }
  }

  next()
}


export default function getDefaultMiddlewares() {
  return [
    setTimestamp,
    createPayload,
    validateRateLimit
  ]
}