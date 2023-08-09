import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create nodemailer client to use in different services
const NodeMailer = nodemailer.createTransport({
  host: 'smtp.siteprotect.com',
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: 'order@lagniappefoods.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default NodeMailer;
