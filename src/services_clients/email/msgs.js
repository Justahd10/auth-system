import emailClient from "./client.js";



// Email sending
/**
 * @typedef {object} EmailMessageValues
 * @property {string | null} text
 * @property {object | null} html
 */

/**
 * @param {string} to
 * @param {string} template
 * @param {EmailMessageValues} values
 */
async function sendMail(to, template, values) {
  // Set default values
  let msgFormat = { ...defaultValues[template] };
  msgFormat.to = to;

  // Define from
  msgFormat.from = process.env.EMAIL_FROM;

  // Set variables values
  if (values.text) msgFormat.text = values.text;
  if (values.html) {
    msgFormat.html = templates[template](values.html);
  }

  // Try send mail message
  await emailClient.sendMail(msgFormat);
}


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