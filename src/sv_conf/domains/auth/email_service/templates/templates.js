import fs from "fs";
import path from "path";



const templates ={
  /**
   * @param {{'confirmCode': string}} param0 
   */
  'mailConfirm': ({ confirmCode })=>{
    let html = fs.readFileSync(
      path.join(__dirname, 'templates', 'email-confirmation.html')
    );

    html = html.replace("{confirmCode}", confirmCode);

    return html;
  }
}

export default templates