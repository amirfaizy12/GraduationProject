import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_PASS', 'FRONTEND_URL'];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`${key} is not set in environment variables.`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT as string, 10),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: '"PortfolioBuilder" <noreply@portfoliobuilder.com>',
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
};
