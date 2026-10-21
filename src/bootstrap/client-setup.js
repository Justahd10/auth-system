import appConfig from "../../config/AppConfig.js";
import db from "../clients/PostgresClient.js";
import redis from "../clients/RedisClient.js";
import email from "../clients/EmailClient.js";



/**
 * @typedef {object} ClientConfigInterface
 * @property {function} set
 * @property {function} test
 * @property {function} quit
 */

/**
 * @typedef {object} ClientErrInterface
 * @property {string} client
 * @property {string} issue
 */


const { env, version: { clients } } = appConfig.data;

export const clientsConfigs = {
  'database': {
    'set': () => db.create(env['DB_CONNECTION']
    ),
    'test': db.verify,
    'close': db.quit
  },
  'redis': {
    'set': () => redis.create(
      env['REDIS_URL'], env['REDIS_USER'], env['REDIS_PASSWORD']
    ),
    'test': redis.verify,
    'close': redis.quit
  },
  'email': {
    'set': () => email.create(
      "gmail", env['EMAIL_FROM'], env['EMAIL_APP_PASSWORD']
    ),
    'test': email.verify,
    'close': email.quit
  }
};


/**
 * @param {string} clientName
 * @returns {Promise<ClientErrInterface | void>}
 */
async function handleClientSession(clientName) {
  try {
    // 1. Create session
    await clientsConfigs[clientName].set();

    // 2. Check test requeriment
    if (clients[clientName].isCritical) {
      await clientsConfigs[clientName].test()
    };

  } catch (error) {
    // 3. Append error
    return {
      'client': clientName,
      'issue': error.message
    }
  }
};

/**
 * @param {object[]} errs 
 */
function resolveErrMsg(errs) {
  return errs.map(
    err => (
      `Client: ${err.client} | Issue: ${err.issue}`
    )
  ).join("\n");
};


export default async function handleClientsSetup() {
  // 1. Setup clients
  const errs = [];

  // 2. handle sessions
  for (const client of Object.keys(clientsConfigs)){
    const err = await handleClientSession(client);

    if (err) errs.push(err);
  }

  // 3. Check errors
  if (errs.length > 0) {
    const errMsg = resolveErrMsg(errs);

    console.error(errMsg);
    process.exit(1);
  }
}
