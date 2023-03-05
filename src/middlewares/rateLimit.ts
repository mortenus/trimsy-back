const rateLimit = require('express-rate-limit');

const minutes = 1;

const limiter = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  message: 'Too many requests, please try again in a moment',
  skipFailedRequests: true,
  skipSuccessfulRequests: true,
  proxy: true,
});

export default limiter;
