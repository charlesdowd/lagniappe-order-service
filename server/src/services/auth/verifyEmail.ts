import { IUserDocument, User } from '../../models';
import { HttpError } from '../../interfaces/Errors';

export async function verifyEmail(
  emailToken: string,
): Promise<IUserDocument | null> {
  const user: IUserDocument | null = await User.findOne({ emailToken });

  // If no user has this emailToken associated with them, throw error
  if (!user) {
    throw new HttpError('Email token does not belong to any user', {
      status: 409,
      friendlyMessage: 'Invalid emailToken',
    });
  }

  // Set emailVerified to true on user and clear the emailToken
  return User.findOneAndUpdate(
    { _id: user._id },
    { $set: { emailVerified: true, emailToken: null } },
    { new: true },
  );
}
