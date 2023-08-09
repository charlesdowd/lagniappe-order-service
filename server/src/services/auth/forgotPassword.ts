import jwt, { Secret } from 'jsonwebtoken';
import { HttpError } from '../../interfaces/Errors';
import { User } from '../../models';

export async function forgotPassword(email: string): Promise<string> {
  // Find existing user
  const user = await User.findOne({ email });

  // If email doesnt exist throw error
  if (!user)
    throw new HttpError('User with this email not found', {
      status: 401,
      friendlyMessage: 'This email does not exist',
    });

  // Create signed token with the users email and id, expiring in 5 minutes
  const resetToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.RESET_PASSWORD_SECRET as Secret,
    {
      expiresIn: '5m',
    },
  );

  return resetToken;
}
