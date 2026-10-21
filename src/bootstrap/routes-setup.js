import appConfig from "../../config/AppConfig.js";
import { app } from "../sv/app.js";
import authRoutes from "../sv/domains_services/auth/routes.js";
import healthRoutes from "../sv/domains_services/health/routes.js";



/**
 * @typedef {object} routeConfig
 * @property {string} method
 * @property {string} endpoint
 * @property {function[]} middlewares
 * @property {function} handler
 */


// App methods
const appMethods = {
  'GET': app.get,
  'POST': app.post,
  'PATCH': app.patch,
  'DELETE': app.delete
};

// Routes config map
const domainRoutes = {
  'auth': authRoutes,
  'health': healthRoutes
}

// System configuraitons
const { version } = appConfig.data


/**
 * @param {routeConfig} routeConfig 
 */
function buildRoute(routeConfig) {
  appMethods[routeConfig.method](
    routeConfig.endpoint,
    routeConfig.middlewares,
    (req, res, next) => 
      routeConfig.handler(req, res, next)
  )
}

/**
 * @param {string} name
 * @param {routeConfig[]} configs 
 */
function validateDomainRoutes(name, configs) {
  const domain = version.domainServices[name];

  // Check domain its enabled
  if (domain.enabled) {

    // Check endpoint and method its enabled
    for (const config of configs) {
      if (!(
        domain.disabledEndpoints.includes(
          config.endpoint
        ) ||
        domain.disabledMethods.includes(
          config.method
        )
      )) {
        // Build route
        buildRoute(config)
      }
    }
  }
};

export default function handleRoutesSetup() {
  Object.entries(domainRoutes).forEach(
    ([domain, configs]) => {
      validateDomainRoutes(domain, configs)
    }
  )
};