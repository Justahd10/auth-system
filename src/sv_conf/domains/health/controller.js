// Helpers
import { resolveResponse } from "../../utils.js"



export default class HealthController {

  /**
   * @param {import('./services.js').default} service 
   */
  constructor(service) {
    this.service = service
  }

  /** 
   * @param {import('express').Response} res 
   */
  testResponse(res) {
    const testData = this.service.setEchoResponse()

    return resolveResponse({
      'res': res,
      'type': "success",
      'status': 200,
      'values': testData
    })
  }
}
