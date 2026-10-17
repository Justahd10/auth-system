import nodemailer from "nodemailer";
import templates from "./templates/templates";



// SMTP transporter (App password)
export const transporter = nodemailer.createTransport({
  'service': "gmail",
  'auth': {
    'user': "diognasde06@gmail.com",
    'pass': process.env.APP_PASSWORD
  }
})

// Check email service
export async function testEmailConnection(){
  try {
    await transporter.verify()
    console.log("Email service sucessful started.")

  } catch(error){
    console.error("Email service verification failsed:", error)
  }
}

// Messages setting
const defaultValues ={
  'mailConfirm': {
    'subject': "Confirmação de email"
  }
}

// Email sending
/**
 * @typedef {object} EmailMessageValues
 * @property {string | null} text
 * @property {object | null} html
 */

/**
 * @param {string} to
 * @param {keyof typeof messages} type
 * @param {EmailMessageValues} values
 */
export function sendMail(to, type, values){
  // Set default values
  let msgFormat = defaultValues[type];
  msgFormat.to = to;

  // Define from
  msgFormat.from = process.env.EMAIL_FROM;

  // Set variables values
  if (values.text) msgFormat.text = values.text;
  if (values.html){
    msgFormat.html = templates[type](values.html);
  }

  // Try send mail message
  transporter.sendMail(msgFormat)
}
