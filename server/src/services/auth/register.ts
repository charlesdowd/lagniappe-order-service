import crypto from 'crypto';
import { HttpError } from '../../interfaces/Errors';
import { IUser, User } from '../../models';

export async function register(
  email: string,
  company: string,
  phoneNumber: string,
): Promise<{ emailToken: string }> {
  const user = await User.findOne({ email });

  // If email already exists throw error
  if (user) {
    throw new HttpError('Email already in use.', {
      status: 409,
      friendlyMessage:
        'This email already exists. Please try again with a different email.',
    });
  }

  const emailToken = crypto.randomBytes(64).toString('hex');

  // Create a new user object, wait until email has been sent to save the user
  const newUser: IUser = {
    email,
    emailToken,
    company,
    phoneNumber,
  };

  // Email has been successfully sent, save the user to the db
  await User.create(newUser);

  // Return emailToken to be used in our email service
  return { emailToken };
}
