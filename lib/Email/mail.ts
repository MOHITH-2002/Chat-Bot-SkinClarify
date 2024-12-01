import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;


export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@qrtickets.software",
    to: email,
    subject: "Confirm your email",
    html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <header style="text-align: center; margin-bottom: 20px;">
      
        <h1 style="color: #4CAF50; font-size: 24px;">Email Confirmation</h1>
      </header>
      <main>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for signing up with Skin Clarify! Please confirm your email address to complete your registration.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${confirmLink}" style="text-decoration: none; background-color: #4CAF50; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 16px;">Confirm Email</a>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #666;">
          If the button above doesn’t work, copy and paste the following link into your browser:
        </p>
        <p style="word-wrap: break-word; background-color: #f9f9f9; padding: 10px; border-radius: 6px; font-family: monospace;">
          <a href="${confirmLink}" style="color: #4CAF50;">${confirmLink}</a>
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #666;">This link will expire in 10 Minutes.</p>
      </main>
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
        <p>Thank you,<br/>Team Skin Clarify</p>
        <p>Need help? <a href="${domain}/support" style="color: #4CAF50;">Contact Support</a></p>
      </footer>
    </div>
  `
  });
};


export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "mail@qrtickets.software",
    to: email,
    subject: "Reset your password",
    html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <header style="text-align: center; margin-bottom: 20px;">
      
        <h1 style="color: #4CAF50; font-size: 24px;">Password Reset</h1>
      </header>
      <main>
        <p style="font-size: 16px; line-height: 1.6;">We received a request to reset your password. If you didn’t make this request, you can safely ignore this email. Otherwise, click the button below to reset your password.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="text-decoration: none; background-color: #4CAF50; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 16px;">Reset Password</a>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #666;">
          If the button above doesn’t work, copy and paste the following link into your browser:
        </p>
        <p style="word-wrap: break-word; background-color: #f9f9f9; padding: 10px; border-radius: 6px; font-family: monospace;">
          <a href="${resetLink}" style="color: #4CAF50;">${resetLink}</a>
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #666;">This link will expire in 10 Minutes.</p>
      </main>
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
        <p>Thank you,<br/>Team Skin Clarify</p>
        <p>Need help? <a href="${domain}/support" style="color: #4CAF50;">Contact Support</a></p>
      </footer>
    </div>`
  });
};