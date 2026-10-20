// enviroment variaables
import "dotenv/config";
// Services domain
import setHealthDomain from "./src/sv_conf/domains/health/config.js";
import setAuthDomain from "./src/sv_conf/domains/auth/config.js";
// Email service
import { testEmailConnection } from "./src/sv_conf/domains/auth/email_service/transporter.js";
// Exception handling
import handleError from "./src/sv_conf/exceptions/handler.js";
// Server
import app from "./src/sv_conf/app.js";
// Postgres data base
import db from "./src/db_conf/db.js";
// Redis data base
import { redisQuit, redisConnect } from "./src/redis_conf/redis-client.js";



// Email connection
await testEmailConnection();

// Redis connection
await redisConnect();

/*
    Application services domain setting 
*/ 
[
  setHealthDomain, setAuthDomain
]
  .forEach(domain => domain(app, db));

/*
    Application error handling
*/
app.use(handleError);

// Server run
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Authentication server running. Listening on port ${port}`)
});

// Closing sign handling
process.on("SIGTERM", async ()=>{
  console.log("SIGTERM signal received. Closing HTTP Server")
  server.close();

  await redisQuit();
});