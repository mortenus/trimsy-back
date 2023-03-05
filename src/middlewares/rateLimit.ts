const rateLimit = require('express-rate-limit');

const minutes = 1;

const limiter = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  message: 'Too many requests, please try again in few minutes',
});

export default limiter;
