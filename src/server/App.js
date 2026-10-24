import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";



class App {

  constructor(port, jsonSpaces = 2) {
    this.app = express();
    this.port = port;
    this.app.set("json spaces", jsonSpaces);

    // json parsing
    this.app.use(json());
    // Cookie parsing
    this.app.use(cookieParser());
  }


  /**
   * @param {import('./types').sessionConfig} sessionConfig 
   */
  setCookieSession(sessionConfig) {
    this.app.use(cookieSession(sessionConfig));
  }

  /**
   * @param {import('./types').middlewares}
   */
  setMiddlewares(middlewares) {
    this.app.use(middlewares);
  }

  /**
   * @param {import('./types').corsConfig} corsConfig 
   */
  setCors(corsConfig) {
    this.app.use(cors(corsConfig));
  }

  /**
   * @param {import('express').ErrorRequestHandler} handlerErrFn 
   */
  setErrHandler(handlerErrFn) {
    this.app.use(handlerErrFn);
  }

  listen() {
    this.app.listen(this.port);
  }
}


/**
 * @param {import("./types").AppConfig} appConfigs
 * @return {App}
 */
export default function createApp(appConfigs) {

}