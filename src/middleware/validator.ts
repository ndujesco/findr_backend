import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models';
import { Helper } from '../helper';

export class Validator {
  static addUserValidator() {
    return [
      body('name', 'Name field should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('gender')
        .trim()
        .custom(Helper.enumValidator('gender', ['male', 'female'])),

      body('email', 'Email is invalid')
        .normalizeEmail()
        .isEmail()
        .custom((value) => {
          return User.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject('Email address already exists!');
            }
          });
        })
    ];
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: 422,
        message: 'Validation failed',
        errors: errors.array().map((error: any) => ({
          field: error.path,
          info: error.msg,
          input: error.value
        }))
      });
    }
    next();
  }

  static addQuestionnaireValidator() {
    return [
      body('complexion')
        .trim()
        .custom(Helper.enumValidator('complexion', ['light', 'dark'])),

      body('height')
        .trim()
        .custom(Helper.enumValidator('height', ['short', 'medium', 'tall'])),

      body('bodyType')
        .trim()
        .custom(Helper.enumValidator('bodyType', ['slim', 'built', 'chubby'])),

      body('ageRange')
        .trim()
        .custom(Helper.enumValidator('ageRange', ['20-30', '30-40', '40-50']))
    ];
  }
}
