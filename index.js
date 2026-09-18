/*
        Starts backend
*/
import "dotenv/config"

import setHealthDomain from "./sv_conf/domains/health/config.js";
import setUsersDomain from "./sv_conf/domains/user/config.js";

import app from "./sv_conf/app.js";
import db from "./db_conf/db.js";



// Application services domain setting
[
    setHealthDomain,
    setUsersDomain
]
.forEach(domain => domain(app, db));


app.listen(process.env.PORT, ()=>{
    console.log("Backend server running.")
})