import getDefaultMiddlewares from "./middlewares/default.js";

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import express from "express";



const app = express();

/*
    Extensions middlewars
*/
app.use(cors({
  'origin': process.env.FRONTEND_SERVER,
  'credentials': true
}))
app.use(cookieParser());
app.use(cookieSession({
    'name': 'session',
    'signed': false
}));

/*
    Native middlewares
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    Application level middlewares
*/
app.use(getDefaultMiddlewares());

export default app