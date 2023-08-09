import { Request, Response, NextFunction } from 'express';
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest';

const adminCheck = async (
  request: Request,
  res: Response,
  next: NextFunction,
) => {
  /*
   * Needed to use express Request type in middleware params because of type
   * issues when using router.use(). Needed to cast to correct type inside.
   * See this post for more info: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
   */
  const req = request as AuthenticatedRequest;
  if (req.user && req.user.admin) {
    next();
  } else {
    console.log(`Rejected attempt to ${req.method} ${req.path}`);
    return res
      .status(401)
      .json({ message: 'Not authorized to make this request' });
  }
};

export default adminCheck;
