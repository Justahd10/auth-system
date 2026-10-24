// import middlewares



/**
 * @param {import('../../types').middleware} controller 
 * @returns {Array<import('../../types').RouteConfig>}
 */
export default function createHealthRoutes(controller) {
  return [
    {
      'method': "GET",
      'endpoint': "/api/health/ping",
      'middlewares': [

      ],
      'handler': controller.testResponse
    }
  ]
}