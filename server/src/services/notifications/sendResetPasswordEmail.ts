import { sendEmail } from './sendEmail';

export async function sendResetPasswordEmail(
  email: string,
  resetToken: string,
): Promise<void> {
  const mailOptions = {
    to: email,
    from: 'order@lagniappefoods.com',
    subject: 'Reset your password',
    html: `<h2>Click the link below to reset your password</h2>
          <h4>This reset link will expire in 5 minutes from when you receive it.</h4>
          <button>
            <a href=${process.env.BASE_URL}/reset-password?resetToken=${resetToken}>
              Reset Password
            </a>
          </button>`,
  };

  await sendEmail(mailOptions);
}
