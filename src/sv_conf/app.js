/*
        Backend building
*/
import getDefaultMiddlewares from "./middlewares/default.js";

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import express from "express";



const app = express();

// extensions middlewares
app.use(cors({
    'origin': process.env.FRONTEND_SERVER,
    'credentials': true
}))
app.use(cookieParser());
app.use(cookieSession());

// Native middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application level middlewares for
app.use(getDefaultMiddlewares());

export default app