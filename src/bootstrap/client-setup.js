import appConfig from "../../config/AppConfig.js";
import db from "../clients/PostgresClient.js";
import redis from "../clients/RedisClient.js";
import email from "../clients/EmailClient.js";



// 1. Start errors list
const errs = [];

const { env, version } = appConfig.data;

export const clientsConfigs = {
  'database': {
    'set': () => db.connect(env[DB_CONNECTION]),
    'test': db.verify,
    'close': db.quit
  },
  'redis': {
    'set': () => redis.connect(
      env[REDIS_URL], env[REDIS_USER], env[REDIS_PASSWORD]
    ),
    'test': redis.verify,
    'close': redis.quit
  },
  'email': {
    'set': () => email.connect(
      "gmail", env[EMAIL_FROM], env[EMAIL_APP_PASSWORD]
    ),
    'test': email.verify,
    'close': email.quit
  }
};


function handleClient() {
  Object.entries(clientsConfigs).forEach(config => {
    // 1. Check client its configured
    const client = version.clients[config[0]];

    try {
      if (client) {

        // 2. Set connection
        config[1].set();

        // 3. Check test requeriment
        if (client.type === "critical") {
          config[1].test()
        };
      }
      
    } catch (error) {

      // 4. Append error
      errs.push({
        'client': config[0],
        'issue': error.message
      });
    };
  });

  return errs
}

export default function handleClientsSetup() {
  // 1. Setup clients
  handleClient();

  // 2. Check errors
  if (errs.length > 0){
    const errMsg = errs.map(err => (
      `Client: ${err.client} | Issue: ${err.issue}` 
    )).join("\n");

    console.error(errMsg);
    process.exit(1);
  }
}

handleClientsSetup()