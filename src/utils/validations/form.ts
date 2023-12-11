import { check, validationResult } from 'express-validator';

const form = [check('email').isEmail(), check('fullname').isLength({ min: 3 })];

export default form;
