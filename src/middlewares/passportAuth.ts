import { NextFunction, Request, Response } from 'express';

export default function PassportAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}
