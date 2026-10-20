import nodemailer from "nodemailer";



let emailClient; // client

// Set SMTP transporter (App password)

/**
 * @param {string} service 
 * @param {string} usr 
 * @param {string} pass 
 */
export function setEmailClient(service, usr, pass){
  console.log("Creating email service client...");
  emailClient = nodemailer.createTransport({
    'service': service,
    'auth': {
      'user': usr,
      'pass': pass
    }
  });
};

// Test connection
export async function testEmailClient(){
  console.log("Testing email service connection...");
  await emailClient.verify();
};


// Close connection
export async function closeEmailClient(){
  console.log("Closing email service connection...")
  await emailClient.close()
}

export default emailClient;