import { check, validationResult } from 'express-validator';

const login = [
  check('email').isEmail(),
  check('username').isLength({ min: 4, max: 15 }),
  check('password').isLength({ min: 4, max: 20 }),
  check('socialMedia').isLength({ min: 1 }),
  check('hearAbout').isLength({ min: 1 }),
  check('audienceTarget').isLength({ min: 1 }),
];

export default login;
