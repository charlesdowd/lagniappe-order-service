import { Response, Request } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: () => any,
) {
  // If there is no error, pass to next or end it if none exists
  if (!err) {
    if (next) return next();
    return res.end();
  }

  // TODO: make this a pino logger and log error + stack trace etc..
  console.log(err);

  // 500 status + 'internal server error' in case they were not set
  return res.status(err.status || 500).send({
    error: err.friendlyMessage || 'Internal server error', // Showing the client the friendly message only
  });
}
