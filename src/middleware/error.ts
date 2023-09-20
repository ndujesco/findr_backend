import { Request, Response } from 'express';

export class ErrorHandler {
  static pageNotFound(req: Request, res: Response) {
    res.status(404).json({ status: 404, message: "Endpoint doesn't exist" });
  }
}
