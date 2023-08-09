export interface Meta {
  friendlyMessage?: string; // More readable error message
}

export default class BaseError extends Error {
  friendlyMessage: string;

  status: number;

  constructor(message: string, meta: Meta = {}) {
    super(message);

    const { friendlyMessage } = meta;

    this.friendlyMessage = friendlyMessage || '';
    this.status = 500;
  }
}
