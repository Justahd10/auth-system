import { sendMail } from "./transporter.js";



/**
 * @param {string} to 
 * @param {string} code 
 */
export async function sendMailConfirmMsg(to, code) {
  await sendMail(to, "mailConfirm", {
    'html': {
      'confirmCode': code
    }
  })
}