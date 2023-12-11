import { check, validationResult } from 'express-validator';

const login = [
  check('email').isEmail(),
  check('fullname').isLength({ min: 3 }),
  check('password').isLength({ min: 3 }),
  check('imageUrl').isLength({ min: 3 }),
  check('companyPosition').isLength({ min: 3 }),
];

export default login;
