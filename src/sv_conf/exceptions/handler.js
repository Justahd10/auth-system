import { resolveResponse } from '../utils.js';



/**
 * @param {Error | {
 *  'errCode': string,
 *  'errItems': array,
 *  'status': keyof typeof errorsDesc
 * }} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export default function handleError(err, req, res, next){
  if (err.name === "ServerSideError"){
    return resolveResponse({
      'res': res,
      'type': "error",
      'status': 500,
      'values': {
        'type': errorsDesc[500],
        'status': 500,
        'code': "SERVER_ERROR",
        'errors': null
      }
    })
  }

  if (err.name === "ClientSideError"){
    return resolveResponse({
      'res': res,
      'type': "error",
      'status': err.status,
      'values': {
        'type': errorsDesc[err.status],
        'status': err.status,
        'code': err.message,
        'errors': err.errItems ?? null
      }
    })
  }
}