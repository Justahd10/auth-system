const errCodes = [
  'EMAIl_FAILED'
]

const errorsDesc ={
  401: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/401",
  409: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/409",
  422: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/422",
  429: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/429",
  500: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/500",
}

/**
 * @typedef { object } ServerSideErrorInterface
 * @property { errCodes[number] | "SERVER_ERROR" } errCode
 * @property { array | null } errItems
 */


export default class ServerSideError extends Error {
  
  /**
   * @param {ServerSideErrorInterface} param0 
   */
  constructor({ errCode, errItems = null }){
    super(errCode)

    this.name = "ServerSideError"
    this.errItems = errItems
  }
}