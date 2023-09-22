import { Request, Response } from 'express';

import { Questionnaire, QuestionnaireI, User, UserI } from './models';
import { ErrorHandler } from './middleware/error';
import { Helper } from './helper';

export class Controllers {
  static sayHello(req: Request, res: Response) {
    res.status(200).json({ success: true, message: 'Hello World!' });
  }

  static async addUser(req: Request, res: Response) {
    let user: UserI;
    const { name, email, gender } = req.body as UserI;

    try {
      user = await User.create({ name, email, gender });
    } catch (error: any) {
      ErrorHandler.catchUnexpectedError(error, res);
    }

    res.status(200).json({ success: true, user });
  }

  static async getAllUsers(req: Request, res: Response) {
    let users: UserI[];

    try {
      users = await User.find().select({
        _id: 0,
        __v: 0
      });
    } catch (error: any) {
      ErrorHandler.catchUnexpectedError(error, res);
    }

    const results = Helper.modifyUserInfo(users);
    res.status(200).json({
      success: true,
      ...results
    });
  }

  static async postQuestionnaire(req: Request, res: Response) {
    let questionnaire: QuestionnaireI;
    const { complexion, height, bodyType, ageRange } =
      req.body as QuestionnaireI;

    try {
      questionnaire = await Questionnaire.create({
        complexion,
        height,
        bodyType,
        ageRange
      });
    } catch (error: any) {
      ErrorHandler.catchUnexpectedError(error, res);
    }

    res.status(200).json({ success: true, questionnaire });
  }
}
