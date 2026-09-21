/*
        Starts backend
*/
import "dotenv/config"

import setHealthDomain from "./src/sv_conf/domains/health/config.js";
import setAuthDomain from "./src/sv_conf/domains/auth/config.js";

import app from "./src/sv_conf/app.js";
import db from "./src/db_conf/db.js";



// Application services domain setting
[
    setHealthDomain,
    setAuthDomain
]
.forEach(domain => domain(app, db));


const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Authentication server running. Listening on port ${port}`)
})