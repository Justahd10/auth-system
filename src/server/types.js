const methods = [
  "GET", "POST", "PATCH", "DELETE"
]

/**
 * @typedef {object} corsConfig
 * @property {string[]} origins
 * @property {boolean} credentials
 */

/**
 * @typedef {object} sessionConfig
 * @property {string} name
 * @property {boolean} extended
 */

/**
 * @typedef {import('express').RequestHandler} middleware
 */
/**
 * @typedef {middleware[] | middleware} middlewares
 */

/**
 * @typedef {object} RouteConfig
 * @property {methods[number]} method
 * @property {string} endpoint
 * @property {middlewares} middlewares
 * @property {import('express').RequestHandler} handler
 */

/**
 * @typedef {object} domainConfig
 * @property {boolean} enabled
 * @property {Array<methods[number]>} disabledMethods
 * @property {string[]} disabledEndpoints
 */

/**
 * @typedef {object} AppConfig
 * @property {number | null} jsonSpaces
 * @property {sessionConfig} sessionConfig
 * @property {corsConfig} corsConfig
 * @property {middlewares} middlewares
 */

export {}