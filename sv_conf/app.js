/*
        Backend building
*/
// Start enviroment variables
import "dotenv/config"

import express from "express"
import setRouting from "./routes/config.js"



export default function startServer(){
    // Start Express.js server instance
    const app = express()

    // Settings
    setRouting(app)

    app.listen(process.env.PORT, ()=>{
        console.log("Server started.")
    })
}