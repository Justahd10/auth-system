/*
        Backend building
*/
import getDefaultMiddlewares from "./middlewares/default.js"

import express from "express"



const app = express()

// Native middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application level middlewares for
// default use by all server routes
app.use(getDefaultMiddlewares())

export default app