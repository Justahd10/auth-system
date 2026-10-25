import UserRepository from "./repository";
import AuthService from "./services";
import AuthController from "./controller";
import createRoutes from "./routes";



export default function createAuthDomain(dependencies) {
  // Get required dependencies
  const { app, db, config } = dependencies;

  // Domain layers building
  const repository = new UserRepository(db);
  const services = new AuthService(repository);
  const controller = new AuthController(services);
  const routes = createRoutes(controller);

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