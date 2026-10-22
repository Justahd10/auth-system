import appConfig from "../../config/AppConfig";
import { clientsConfigs } from "./client-setup";
import tasksController from "../workers/bg-tasks-controller";



const { default: { shutdown } } = appConfig.data

/**
 * @param {function} shutdownFn 
 */
function setTrigger(shutdownFn) {
  
}

// 2. Security timeout
function setSecureTimetout() {
  
}

// 3. HTTP sessions closing
function closeHttpSessions() {

}

// 4. Client sessions closing
function closeClientSessions() {

}

// 5. Await background tasks
function closeBackgroundTasks() {

}


export default function setShutdown() {

}