import getDefaultMiddlewares from "./middlewares/default.js";

import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import express from "express";



const app = express();


// Application level middlewares
app.use(getDefaultMiddlewares());

// Extensions middlewars
app.use(cors({
  'origin': process.env.FRONTEND_ORIGIN,
  'credentials': true
}))
app.use(cookieParser());
app.use(cookieSession({
  'name': 'session',
  'signed': false
}));

//  Native middlewares
app.use(express.json());
app.use(express.urlencoded({
  'extended': true
}));

app.set('json spaces', 2);


export default app