import crypto from "crypto";
import EventEmitter from "events";



class BackgroundTasksController extends EventEmitter {

  constructor() {
    super();
  }


  #verifyTasks() {
    
  }

  /**
   * @param {"add" | "remove"} operation
   * @param {string} taskName
   */
  #updateTasks(operation, taskName) {

  }

  /**
   * @param {Promise} task 
   */
  #handleTask(task) {

  }
}

const tasksController = new BackgroundTasksController();

export default tasksController