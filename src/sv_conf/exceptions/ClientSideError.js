import { resolveResponse } from '../utils.js';



/*
    Errors url description mapping
*/
const errorsDesc ={
  401: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/401",
  409: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/409",
  422: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/422",
  429: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/429",
  500: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/500",
}

/*
    Errors handling - Classes structure
*/

/**
 * @typedef {object} ClientSideErrorInterface
 * @property {string} errCode
 * @property {array} errItems
 */


class ClientSideError extends Error{

  /**
   * @param {ClientSideErrorInterface} param0
   */
  constructor({errCode, errItems = []}) {
    super(errCode);

    this.name = "ClientSideError";
    this.errItems = errItems;
  }
}


export class UnauthorizedError extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 401;
    this.type = errorsDesc[401];
  }
}

export class UnprocessableEntity extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 422;
    this.type = errorsDesc[422];
  }
}

export class ConflictError extends ClientSideError{

  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 409;
    this.type = errorsDesc[409];
  }
}

export class ManyRequestsError extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 429;
    this.type = errorsDesc[429];
  }
}

/*
    Errors handling - middleware 
*/

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
export function handleError(err, req, res, next){
  if (err.name !== "ClientSideError"){
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