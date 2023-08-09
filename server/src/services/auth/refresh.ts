import jwt, { Secret } from 'jsonwebtoken';
import { IUserDocument, User } from '../../models';
import { HttpError } from '../../interfaces/Errors';

export async function refresh(refreshToken: string) {
  try {
    // TODO: refresh is expired, make sure we handle the error and log the user out
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret,
    );

    // Look for user from decoded refresh token
    const foundUser: IUserDocument | null = await User.findById(decoded._id);

    // User not authorized
    if (!foundUser)
      throw new HttpError('Unauthorized', {
        status: 401,
        friendlyMessage: 'Unauthorized',
      });

    // Create and return new access token
    const accessToken = jwt.sign(
      {
        _id: foundUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: '1h' },
    );

    return { accessToken };
  } catch (error) {
    console.log(error);
    // Server error if something breaks in try/catch
    throw new Error('Internal Server Error');
  }
}
