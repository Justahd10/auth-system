import HealthController from "./controller";
import HealthService from "./services";
import createHealthRoutes from "./routes";



/**
 * @param {import('express').Application} app 
 * @param {import('../../types').domainConfig} config
 */
export default function createHealthDomain(app, config) {
  // Domain layers building
  const service = new HealthService();
  const controller = new HealthController(service);
  const routes = createHealthRoutes(controller);

  // routes mapping
  routes.forEach(route => {
    if (
      !config.disabledEndpoints.includes(route.endpoint) &&
      !config.disabledMethods.includes(route.method)
    ) {
      app[route.method.toLowerCase()](
        route.endpoint, route.middlewares, route.handler
      )
    }
  })
}