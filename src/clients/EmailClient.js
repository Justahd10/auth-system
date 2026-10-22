import nodemailer from "nodemailer";



export default class EmailClient {
  
  /**
   * @param {string} service 
   * @param {string} usr 
   * @param {string} pass
   */
  constructor(
    service, 
    usr, 
    pass, 
    from, 
    templates, 
    msgFormats
  ) {
    this.service = service;
    this.usr = usr;
    this.pass = pass;

    this.from = from;
    this.templates = templates;
    this.msgFormats = msgFormats;

    /** @type {import('nodemailer').Transporter | null} */
    this.transporter = null;
  }

  createTransporter() {
    console.log("Creating email session...");

    this.transporter = nodemailer.createTransport({
      'service': this.service,
      'auth': {
        'user': this.usr,
        'pass': this.pass
      }
    });
  }


  /**
   * @typedef {object} MsgFormatInterface
   * @property {string} to
   * @property {string | undefined} text
   * @property {object | undefined} htmlValues
   */

  /**
   * @param {MsgFormatInterface} param0;
   */
  #resolveMsgFormat({ to, type, text, htmlValues }) {
    const msgType = this.msgFormats[type];
    
    // 1. Start initial format
    const msgFormat = { ...msgType.format };

    // 2. Append parameters
    msgFormat.from = this.from;
    msgFormat.to = to;

    // 3. Resolve text
    if (text) msgFormat.text = text;

    // 4. Resolve Html
    if (msgType.hasTemplate){
      Object.entries(htmlValues).forEach(item => {
        this.templates[type]
          .replaceAll(item[0], item[1])
      });
    };

    return msgFormat
  }

  /**
   * @param {string} to 
   * @param {string} code 
   */
  async sendMailConfirmMsg(to, code) {
    await this.transporter.sendEmail(
      this.#resolveMsgFormat({
        'to': to,
        'type': "confirmation",
        'htmlValues': {
          '{confirmCode}': code
        }
      })
    )
  }

  async verify() {
    console.log("Testing email session...");

    await this.transporter.verify();
  }

  quit() {
    console.log("Closing email session...");

    this.transporter.close();
  }
};