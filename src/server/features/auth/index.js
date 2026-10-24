import UserRepository from "./repository";
import AuthService from "./services";
import AuthController from "./controller";
import createRoutes from "./routes";



/**
 * @param {import('express').Application} app 
 * @param {import('pg-promise').IDatabase} db
 * @param {import('../../types').domainConfig} config
 */
export default function createAuthDomain(app, db, config) {
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