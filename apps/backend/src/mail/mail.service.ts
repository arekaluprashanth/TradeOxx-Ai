import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true' || true, // use SSL
      auth: {
        user: process.env.SMTP_USER || 'prashu2242@gmail.com', // fallback to user for local testing if env is missing
        pass: process.env.SMTP_PASS, 
      }
    });
  }

  async onModuleInit() {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection verified successfully. Ready to send emails.');
    } catch (error) {
      this.logger.error('SMTP connection failed during startup. Check SMTP_USER, SMTP_PASS, and network settings.', error);
      // We don't crash here so the rest of the backend can still function, 
      // but emails will fail. The user is warned via log.
    }
  }

  async sendVerificationEmail(to: string, token: string) {
    this.logger.log(`Sending verification token to ${to}`);
    // Simulated email body
    const mailOptions = {
      from: '"TradeOxx AI" <noreply@tradeoxx.ai>',
      to,
      subject: 'Verify your TradeOxx AI account',
      text: `Your verification code is: ${token}. Please enter this code to verify your account.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to TradeOxx AI</h2>
          <p>Your verification code is:</p>
          <h1 style="font-size: 36px; letter-spacing: 5px; color: #3b82f6;">${token}</h1>
          <p>Please enter this code in the application to complete your registration.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email successfully sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}:`, error);
      throw new Error(`Failed to send email to ${to}`);
    }
  }

  async sendVerificationSms(to: string, token: string) {
    // Simulated SMS
    this.logger.log(`[SIMULATED SMS] Sending verification token ${token} to phone number ${to}`);
  }
}
