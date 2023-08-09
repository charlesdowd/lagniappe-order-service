import bcrypt from 'bcrypt';
import { IUser, User } from '../../models';
import { BaseError, HttpError } from '../../interfaces/Errors';

export async function createNewUser(
  email: string,
  password: string,
): Promise<void> {
  // Check if all required fields are present
  if (!email || !password) {
    throw new HttpError('All fields required', {
      status: 400,
      friendlyMessage: 'All fields are required',
    });
  }
  // Check if email already exists
  const duplicate = await User.findOne({ email });
  if (duplicate)
    throw new HttpError('Email already exists', {
      status: 409,
      friendlyMessage: 'Email already exists',
    });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject: IUser = {
    email,
    emailVerified: true,
    password: hashedPassword,
  };

  const user = await User.create(userObject);

  if (!user) throw new BaseError('Invalid user data received');
}
