import "dotenv/config";

import setHealthDomain from "./src/sv_conf/domains/health/config.js";
import setAuthDomain from "./src/sv_conf/domains/auth/config.js";

import app from "./src/sv_conf/app.js";
import db from "./src/db_conf/db.js";
import { redisQuit, redisConnect } from "./src/redis_conf/config.js";

import { handleError } from "./src/sv_conf/exceptions/ClientSideError.js";



// Redis connection
await redisConnect();

/*
    Application services domain setting 
*/ 
[
  setHealthDomain,
  setAuthDomain
]
  .forEach(domain => domain(app, db));

/*
    Application error handling
*/
app.use(handleError);

/*
    Server run
*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Authentication server running. Listening on port ${port}`)
});

/*
    Closing sign handling
*/
process.on("SIGTERM", await redisQuit());
process.on("SIGINT", await redisQuit());