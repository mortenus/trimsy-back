import { check, validationResult } from 'express-validator';

const login = [
  check('email').isEmail(),
  check('fullname').isLength({ min: 3 }),
  check('order.productType').notEmpty(),
  check('order.purpose').notEmpty(),
  check('order.seo').notEmpty(),
];

export default login;
