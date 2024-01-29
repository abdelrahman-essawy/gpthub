import { Injectable} from '@nestjs/common';

// import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from '../dto/mail.dto';

@Injectable()
export class AppService {
  private transporter;

  constructor(private readonly mailerService: MailerService) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async sendMail(mailBody: MailDto) {
    mailBody.mails.forEach((toEmail)=>{
      try {
          this.mailerService.sendMail({
          to: toEmail,
          from: 'gpthubemail@gmail.com',
          subject: mailBody.subject,
          html: mailBody.body,
        });
        console.log(`Email sent successfully to ${toEmail}`);
      } catch (error) {
        console.error(`Error sending email to ${toEmail}:`, error);
      }
    });
  }
}
