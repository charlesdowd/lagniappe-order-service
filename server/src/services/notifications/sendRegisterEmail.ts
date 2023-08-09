import { sendEmail } from './sendEmail';

export async function sendRegisterEmail(email: string, emailToken: string) {
  // Send out verification email
  const mailOptions = {
    to: email,
    from: 'order@lagniappefoods.com',
    subject: 'Verify your email',
    html: `<h2>Thanks for registering on our site </h2>
          <h4>Please verify your email to continue...</h4>
          <button>
            <a href=${process.env.BASE_URL}/verify-email?emailToken=${emailToken}>
              Verify Email
            </a>
          </button>`,
  };

  await sendEmail(mailOptions);
}
