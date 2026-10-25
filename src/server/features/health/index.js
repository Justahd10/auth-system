import HealthController from "./controller";
import HealthService from "./services";
import createHealthRoutes from "./routes";



/**
 * @param {object} dependencies 
 */
export default function createHealthDomain(dependencies) {
  // Select required data
  const { app, config } = dependencies

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