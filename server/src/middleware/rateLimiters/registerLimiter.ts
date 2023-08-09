import rateLimit from 'express-rate-limit';

const registerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 5 login requests per window per minute
  message: {
    message:
      'Too many register requests from this IP, try again after a 60 second pause',
  },
  handler: (req, res, next, options) =>
    res.status(options.statusCode).send(options.message),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-Rate-Limit-*` headers
});

export default registerLimiter;
