import fs from "fs";
import path from "path";



const __dirname = import.meta.dirname;

const templates ={
  /**
   * @param {{'confirmCode': string}} param0 
   */
  'mailConfirm': ({ confirmCode })=>{
    let html = fs.readFileSync(
      path.join(__dirname, 'email-confirmation.html'),
      {
        'encoding': "utf-8"
      }
    );

    html = html.replace("{confirmCode}", confirmCode);

    return html;
  }
}

export default templates