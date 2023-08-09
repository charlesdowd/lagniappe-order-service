import { Request } from 'express';
import { IUserDocument } from '../models';

export default interface AuthenticatedRequest<T = any> extends Request<T> {
  user: IUserDocument;
}
