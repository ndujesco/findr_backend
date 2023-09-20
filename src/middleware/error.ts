import { Request, Response } from 'express';

export class ErrorHandler {
  static pageNotFound(req: Request, res: Response) {
    res.status(404).json({ status: 404, message: "Endpoint doesn't exist" });
  }

  static catchUnexpectedError(error: any, res: Response) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
}
