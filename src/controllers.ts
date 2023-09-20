import { Request, Response } from 'express';

import { User as UserInterface } from './model';
import User from './model';
import { ErrorHandler } from './middleware/error';
import { Helper } from './helper';

export class Controllers {
  static sayHello(req: Request, res: Response) {
    res.status(200).json({ message: 'Hello World!' });
  }

  static async addUser(req: Request, res: Response) {
    let user: UserInterface;

    try {
      user = await User.create(req.body);
    } catch (error: any) {
      ErrorHandler.catchUnexpectedError(error, res);
    }

    res.status(200).json({ success: true, status: 200, user });
  }

  static async getAllUsers(req: Request, res: Response) {
    let users: UserInterface[];

    try {
      users = await User.find().select({
        _id: 0,
        __v: 0
      });
    } catch (error: any) {
      ErrorHandler.catchUnexpectedError(error, res);
    }

    res
      .status(200)
      .json({
        success: true,
        status: 200,
        results: Helper.modifyUserInfo(users)
      });
  }
}
