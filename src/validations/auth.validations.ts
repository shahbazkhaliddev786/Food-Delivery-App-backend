import { body } from 'express-validator';

const signupValidations = () => {
  return [
      body('name', 'name is required').notEmpty(),
      body('email', 'email is required').notEmpty().isEmail(),
      body('password', 'password is required and must be at least 8 characters long').notEmpty().isLength({ min: 8 }),
      body('profile').optional()
  ];
};

const loginValidations = () => {
    return [
      body('email', 'email is required').notEmpty().isEmail(),
      body('password', 'password is required').notEmpty().isLength({ min: 8 }),
    ];
};

const changePasswordValidations = () => {
    return [
      body('currentPassword', 'currentPassword is required').notEmpty().isLength({ min: 8 }),
      body('password', 'password is required').notEmpty().isLength({ min: 8 })
    ];
};

export {signupValidations, loginValidations, changePasswordValidations};