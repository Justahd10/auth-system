// import middlewares


/**
 * @param {import('../../types').middleware} controller 
 * @returns {Array<import('../../types').RouteConfig>}
 */
export default function createRoutes(controller) {
  return [
    {
      'method': "POST",
      'endpoint': "/api/auth/register",
      'middlewares': [

      ],
      "handler": controller.handleRegister
    },
    {
      'method': "POST",
      'endpoint': "/api/auth/login",
      'middlewares': [

      ],
      "handler": controller.handleLogin
    },
    {
      'method': "GET",
      'endpoint': "/api/auth/me",
      'middlewares': [

      ],
      "handler": controller.handleAuthDetails
    },
    /* {
      'method': "GET",
      'endpoint': "/api/auth/me",
      'middlewares': [
  
      ],
      "handler": controller.handleAuthDetails
    },
    {
      'method': "GET",
      'endpoint': "/api/auth/me",
      'middlewares': [
  
      ],
      "handler": controller.handleAuthDetails
    },
    {
      'method': "GET",
      'endpoint': "/api/auth/me",
      'middlewares': [
  
      ],
      "handler": controller.handleAuthDetails
    } */
  ];
}