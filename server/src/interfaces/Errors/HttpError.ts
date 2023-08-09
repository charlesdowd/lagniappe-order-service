import { Meta } from './BaseError';

interface HttpErrorMeta extends Meta {
  status?: number;
}

export default class HttpError extends Error {
  friendlyMessage: string;

  status: number;

  constructor(message: string, meta: HttpErrorMeta = {}) {
    super(message);

    const { friendlyMessage = '', status = 500 } = meta; // Set defaults

    this.friendlyMessage = friendlyMessage;
    this.status = status;
  }
}
