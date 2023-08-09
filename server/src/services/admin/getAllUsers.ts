import { User, IUser } from '../../models';
import { BaseError } from '../../interfaces/Errors';

export async function getAllUsers(): Promise<IUser[]> {
  try {
    return await User.find();
  } catch (error) {
    // Log error for server
    console.log(error);
    throw new BaseError('Error getting users');
  }
}
