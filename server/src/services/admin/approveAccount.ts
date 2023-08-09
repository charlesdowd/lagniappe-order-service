import { IUser, User } from '../../models';

export async function approveAccount(userId: string): Promise<IUser | null> {
  return User.findOneAndUpdate({ _id: userId }, { $set: { approved: true } });
}
