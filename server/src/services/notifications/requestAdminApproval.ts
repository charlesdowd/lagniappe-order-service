import { sendEmail } from './sendEmail';

export async function requestAdminApproval(
  email: string,
  company: string,
  phoneNumber: string,
) {
  // Send email notifying admins a user has signed up and is requesting approval
  const mailOptions = {
    to: 'order@lagniappefoods.com',
    from: 'order@lagniappefoods.com',
    subject: 'New user sign up - action required',
    html: `<h2>New user information: </h2>
          <h4>Email: ${email} \n
              Phone number: ${phoneNumber || 'N/A'} \n
              Company: ${company || 'N/A'} \n
          </h4>
          <h4>Use the button below to approve them in the account approval page</h4
          <button>
            <a href=${process.env.BASE_URL}/admin/approve-accounts>
              Account Approval Page
            </a>
          </button>`,
  };

  await sendEmail(mailOptions);
}
