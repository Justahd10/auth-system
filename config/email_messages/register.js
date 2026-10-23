import fs from "fs";
import path from "path";




/**
 * @typedef {object} emailMsgFormat
 * @property {string} subject
 */

/**
 * @typedef { object } msgConfig
 * @property { string } template
 * @property { emailMsgFormat } format
 */


export default class EmailMessagesRegister {
  #htmlTemplates = null;

  /**
   * @param {msgConfig[]} msgsConfig 
   */
  constructor(msgsConfig) {
    this.msgs = new Map();
  }

  
  #fetchTemplates() {
    // Try get html files


    // For each file


      // Try read file

  }

  #registerMsgs() {
    // For each configuration item


      // get html template


      // Set in msgs map with format

  }


  /**
   * @param {string} msgType 
   */
  getMsg(msgType) {
    // Get data in map by type


    // Return data

  }
};