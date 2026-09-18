/*
        Starts backend
*/
import startServer from "./sv_conf/app.js"
import startDatabase from "./db_conf/db.js"



startDatabase()
startServer()