import { setDatabaseClient, testDabaseClient, closeDatabaseClient } from "./db/client.js";
import { setRedisClient, testRedisClient, closeRedisClient } from "./redis/client.js";
import { setEmailClient, testEmailClient, closeEmailClient } from "./email/client.js";



const clientsConfig = {
  'database': {
    'set': setDatabaseClient,
    'test': testDabaseClient,
    'close': closeDatabaseClient
  },
  'redis': {
    'set': setRedisClient,
    'test': testRedisClient,
    'close': closeRedisClient
  },
  'email': {
    'set': setEmailClient,
    'test': testEmailClient,
    'close': closeEmailClient
  }
};

export default clientsConfig;