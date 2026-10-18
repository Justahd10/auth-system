import { resolveResponse } from '../utils.js';



const errTypes ={
  401: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/401",
  409: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/409",
  422: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/422",
  429: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/429",
  500: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/500"
};


/**
 * @param {Error | {
 *  'errCode': string,
 *  'errItems': array,
 *  'status': keyof typeof errTypes
 * }} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export default function handleError(err, req, res, next){
  if (err.name !== "ClientSideError"){
    return resolveResponse({
      'res': res,
      'type': "error",
      'status': 500,
      'values': {
        'type': errTypes[500],
        'status': 500,
        'code': err.message.toUpperCase().replace(" ", "_"),
        'errors': null,
      }
    })
  }

  return resolveResponse({
    'res': res,
    'type': "error",
    'status': err.status,
    'values': {
      'type': errTypes[err.status],
      'status': err.status,
      'code': err.message,
      'errors': err.errItems ?? null
    }
  })
}