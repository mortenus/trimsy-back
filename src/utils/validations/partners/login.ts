import { check, validationResult } from 'express-validator';

const login = [check('email').isEmail(), check('password').isLength({ min: 3 })];

export default login;
