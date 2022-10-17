import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { TokenPayload } from '../dto/userCreateDto';

export default function AutorizeAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization
    ?.replace('Bearer', '')
    .replace('bearer', '')
    .trim();
  if (authorization == null)
    return res.status(401).send('Unauthorized: Usuário não está logado');
  const secret = process.env.JWT_SECRET as string;
  try {
    const userRes = jwt.verify(authorization, secret) as JwtPayload;
    //if (req.route.path === '/register' && userRes.role === 'Cliente') {
    //return res.status(403).send('Forbidden: Usuário não autorizado');
    //}
    if (!userRes.emailIsValid) {
      return res
        .status(403)
        .send('Forbidden: Email do usuário não está validado');
    }
    return next();
  } catch {
    return res.status(500).send('Unauthorized: Usuário não está logado');
  }
}
