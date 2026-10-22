import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import {
  setTimestamp,
  createPayload,
  validateRateLimit
} from "./middlewares/default.js";


/**
 * @typedef {object} RouteConfig
 * @property {string} method
 * @property {string} endpoint
 * @property {import("express").RequestHandler[]} middlewares
 * @property {import("express").RequestHandler} handler
 */

/**
 * @typedef {object} DomainConfig
 * @property {boolean} enabled
 * @property {string[]} disabledEndpoints
 * @property {string[]} disabledMethods
 */

/**
 * @typedef {object} cookiesSession
 * @property {string} name
 * @property {boolean} signed
 */

/**
 * @typedef {object} HttpAccessConfig
 * @property {object} corsConfig 
 * @property {cookiesSession} cookiesSession
 * @property {{extended: boolean}} urlEncoded
 * @property {number} jsonSpaces
 */

/**
 * @typedef {object} options
 * @property {number} port
 * @property {HttpAccessConfig} httpAccess
 * @property {Record<string, RouteConfig[]>} domainRoutes
 * @property {Record<string, DomainConfig>} domainServices
 * @property {import("express").ErrorRequestHandler} errorHandler
 */

export default class Server {

  /**
   * @param {options} options
   */
  constructor({
    port,
    httpAccess,
    domainServices,
    domainRoutes,
    errorHandler
  }) {
    this.port = port;
    this.httpAccess = httpAccess;
    this.domainRoutes = domainRoutes;
    this.domainServices = domainServices;
    this.errorHandler = errorHandler;

    this.app = express();
    this.server = null;
  }


  setHttpAccess() {
    // Global middlewares
    this.app.use([
      setTimestamp,
      createPayload,
      validateRateLimit
    ]);

    const config = this.httpAccess;

    // Extension middlewares
    this.app.use(cors(config.corsConfig));
    this.app.use(cookieParser());
    this.app.use(cookieSession(config.cookiesSession));

    // Native middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded(config.urlEncoded));

    this.app.set("json spaces", config.jsonSpaces);
  }

  /**
   * Registra uma rota na instância Express desta classe.
   * @param {RouteConfig} routeConfig
   */
  #buildRoute(routeConfig) {
    const method = routeConfig.method.toLowerCase();

    this.app[method](
      routeConfig.endpoint,
      ...routeConfig.middlewares,
      routeConfig.handler
    );
  }


  setAppRoutes() {
    const domainRoutes = this.domainRoutes;
    const domainServices = this.domainServices;

    for (const [name, configs] of Object.entries(domainRoutes)) {
      const domain = domainServices[name];

      if (!domain || !domain.enabled) {
        continue;
      }

      for (const config of configs) {
        if (
          domain.disabledEndpoints.includes(config.endpoint) ||
          domain.disabledMethods.includes(config.method)
        ) {
          continue;
        }

        this.#buildRoute(config);
      }
    }
  }


  setAppErrHandler() {
    this.app.use(this.errorHandler);
  }

  run() {
    this.setHttpAccess();
    this.setAppRoutes();
    this.setAppErrHandler();

    this.server = this.app.listen(this.port);
    return this.server;
  }
}
