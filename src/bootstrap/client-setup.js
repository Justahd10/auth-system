import PostgresClient from "../clients/PostgresClient.js";
import RedisClient from "../clients/RedisClient.js";
import EmailClient from "../clients/EmailClient.js";


/**
 * @typedef {object} ClientEnvironment
 * @property {string} DB_CONNECTION
 * @property {string} REDIS_URL
 * @property {string} REDIS_USER
 * @property {string} REDIS_PASSWORD
 * @property {string} EMAIL_FROM
 * @property {string} EMAIL_APP_PASSWORD
 */

/**
 * @typedef {object} ClientSettings
 * @property {boolean} isCritical
 */

/**
 * @typedef {object} ClientConfigInterface
 * @property {() => void | Promise<void>} set
 * @property {() => void | Promise<void>} test
 * @property {() => void | Promise<void>} close
 */

/**
 * @typedef {object} ClientErrInterface
 * @property {string} client
 * @property {string} issue
 */

/**
 * @param {ClientEnvironment} env
 * @returns {Record<string, ClientConfigInterface>}
 */
function createClientsConfigs(env) {
  return {
    'database': {
      'set': () => db.create(env.DB_CONNECTION),
      'test': db.verify,
      'close': db.quit
    },
    'redis': {
      'set': () => redis.create(
        env.REDIS_URL,
        env.REDIS_USER,
        env.REDIS_PASSWORD
      ),
      'test': redis.verify,
      'close': redis.quit
    },
    'email': {
      'set': () => email.create(
        "gmail",
        env.EMAIL_FROM,
        env.EMAIL_APP_PASSWORD
      ),
      'test': email.verify,
      'close': email.quit
    }
  };
}

/**
 * @param {string} clientName
 * @param {Record<string, ClientSettings>} clients
 * @param {Record<string, ClientConfigInterface>} clientsConfigs
 * @returns {Promise<ClientErrInterface | void>}
 */
async function handleClientSession(clientName, clients, clientsConfigs) {
  try {
    await clientsConfigs[clientName].set();

    if (clients[clientName].isCritical) {
      await clientsConfigs[clientName].test();
    }

  } catch (error) {
    return {
      client: clientName,
      issue: error.message
    };
  }
}

/**
 * @param {ClientErrInterface[]} errs
 */
function resolveErrMsg(errs) {
  return errs.map(
    err => `Client: ${err.client} | Issue: ${err.issue}`
  ).join("\n");
}

/**
 * @param {object} config
 * @param {ClientEnvironment} config.env
 * @param {Record<string, ClientSettings>} config.clients
 */
export default async function handleClientsSetup({ env, clients }) {
  const clientsConfigs = createClientsConfigs(env);
  const errs = [];

  for (const client of Object.keys(clientsConfigs)) {
    const err = await handleClientSession(
      client,
      clients,
      clientsConfigs
    );

    if (err) errs.push(err);
  }

  if (errs.length > 0) {
    console.error(resolveErrMsg(errs));
    process.exit(1);
  }
}