import jwt, { Secret } from 'jsonwebtoken';
import { BaseError } from '../../interfaces/Errors';
import { User, IUserDocument } from '../../models';

export async function resetPassword(
  resetToken: string,
): Promise<IUserDocument | null> {
  try {
    const decoded: any = jwt.verify(
      resetToken,
      process.env.RESET_PASSWORD_SECRET as Secret,
    );

    // Find user and set their current password to null, return user document with that update
    return await User.findByIdAndUpdate(
      decoded.id,
      {
        $set: { password: null },
      },
      { new: true },
    );
  } catch (error) {
    throw new BaseError('Error resetting password');
  }
}
