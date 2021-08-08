import * as fs from "fs";
import { keys } from "lodash";
import * as nodemailer from "nodemailer";
import * as path from "path";
import { Log } from "./logger";

interface rawMailData {
  to,
  html?,
  text?,
  subject,
}


export class SendEmail {
  private logger: any = Log.getLogger();

  public sendEmail(template: string, subject: string, to: [string], mailData: Json) {
    let html = "";
    if (template) {
      const tempPath = path.resolve(`${__dirname}/../`, "templates");
      const content = `${tempPath}/${template}.html`;
      html = this.getHtmlContent(content, mailData);
    }
    this.sendRawMail({
      to,
      html,
      subject,
    });
  }

  public sendRawMail = (rawData: rawMailData) => {
    const { to, subject, html, text } = rawData;
    const mailOptions = {
      to,
      html,
      text,
      subject,
      from: process.env.DEFAULT_FROM
    };

    const config = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      }
    });

    config.sendMail(mailOptions, (mailSendErr: any, info: any) => {
      if (!mailSendErr) {
        this.logger.info(`Email sent: ${info.response}`);
      } else {
        this.logger.error(`Error in sending email: ${mailSendErr} and info ${info}`);
      }
    });
  }

  private getHtmlContent = (filePath: string, replaceData: any) => {
    const rawData = fs.readFileSync(filePath);
    let html = rawData.toString();
    keys(replaceData).forEach((key) => {
      html = html.replace(key, replaceData[key]);
    });
    return html;
  }

}
