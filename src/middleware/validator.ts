import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import User from '../model';

export class Validator {
  static addUserValidator() {
    return [
      body('email', 'Email is invalid')
        .isEmail()
        .normalizeEmail()
        .custom((value) => {
          return User.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject('Email address already exists!');
            }
          });
        }),

      body('name', 'Name field should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('gender')
        .trim()
        .custom((value) => {
          if (!['male', 'female'].includes(value))
            throw new Error("'gender' must be either 'male' or 'female'");
          return true;
        })
    ];
  }

  static validateUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
}
