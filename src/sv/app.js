import appConfig from "../../config/AppConfig.js";
import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import {
  setTimestamp,
  createPayload,
  validateRateLimit
} from "./middlewares/default.js";



const {
  defaultConfig: {
    http: {
      jsonSpaces, urlEncoded
    }, 
    auth: { cookiesSession } 
  },
  versionConfig: corsFormat
} = appConfig


// Create application intance
const app = express();

// Application level middlewares
app.use([
  setTimestamp, 
  createPayload,
  validateRateLimit
]);

// Extensions middlewars
app.use(cors(corsFormat))

app.use(cookieParser());

app.use(cookieSession(cookiesSession));

//  Native middlewares
app.use(express.json());

app.use(express.urlencoded(urlEncoded));

app.set('json spaces', jsonSpaces);


export { app }