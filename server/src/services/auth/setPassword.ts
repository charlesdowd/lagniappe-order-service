import bcrypt from 'bcrypt';
import { IUserDocument, User } from '../../models';
import { BaseError } from '../../interfaces/Errors';

export async function setPassword(
  userId: string,
  password: string,
): Promise<IUserDocument | null> {
  const user: IUserDocument | null = await User.findById(userId);

  // If no user has this emailToken associated with them, throw error
  if (!user) {
    throw new BaseError('No user with this user ID');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Set password for user
  return User.findOneAndUpdate(
    { _id: userId },
    { $set: { password: hashedPassword } },
  );
}
