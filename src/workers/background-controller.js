import crypto from "crypto";
import EventEmitter from "events";



/**
 * @typedef {object} TaskUpdateInterface
 * @property {"add" | "del"} operation
 * @property {string | null} id
 * @property {object | null} values 
 */

export default class BackgroundTasksController extends EventEmitter {
  #tasks = new Map();

  constructor(isShuttingDown = false) {
    super();

    this.isShuttingDown = isShuttingDown;
  }


  #verifyTasks() {
    if (this.#tasks.size === 0 && this.isShuttingDown) {
      this.emit('tasksDone')
    }
  }


  /**
   * @param {TaskUpdateInterface} param0
   * @return {string | void}
   */
  #updateTasks({ operation, id = null, values = null }) {
    switch (operation) {

      case "add":
        const taskId = crypto.randomUUID();

        this.#tasks.set(
          taskId, {
          'created': new Date().toISOString(),
          ...values
        }
        )

        return taskId

      case "del":
        this.#tasks.delete(id);
        this.#verifyTasks();
    }
  }

  /**
   * @param {Promise} task
   * @param {object | null} values 
   */
  handleTask(task, values = null) {
    // 1. Save task in state
    const taskId = this.#updateTasks({
      'operation': "add",
      'values': values
    })

    // 2. Run task
    task()
      // 3. Remove task from state
      .then(result => this.#updateTasks({
        'operation': 'del',
        'id': taskId
      }))
  }
}