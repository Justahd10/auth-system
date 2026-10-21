import appConfig from "../../config/AppConfig.js";
import nodemailer from "nodemailer";



let emailTransporter; // client


class EmailClient {
  #templates = appConfig.data.emailTemplates;
  #from = appConfig.data.env.EMAIL_FROM;
  #msgTypes = appConfig.data.default.email;


  /**
   * @param {string} service 
   * @param {string} usr 
   * @param {string} pass 
   */
  create(service, usr, pass) {
    console.log("Creating email session...");
    emailTransporter = nodemailer.createTransport({
      'service': service,
      'auth': {
        'user': usr,
        'pass': pass
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
    const msgType = this.#msgTypes[type];
    
    // 1. Start initial format
    const msgFormat = { ...msgType.format };

    // 2. Append parameters
    msgFormat.from = this.#from;
    msgFormat.to = to;

    // 3. Resolve text
    if (text) msgFormat.text = text;

    // 4. Resolve Html
    if (msgType.hasTemplate){
      Object.entries(htmlValues).forEach(item => {
        this.#templates[type]
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
    await emailTransporter.sendEmail(
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
    await emailTransporter.verify();
  }

  async quit() {
    console.log("Closing email session...")
    await emailTransporter.close()
  }
};


const email = new EmailClient();

export default email;