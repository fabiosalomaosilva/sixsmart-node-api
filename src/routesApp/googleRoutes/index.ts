import { Response, Request, Router } from 'express';
import jwt from 'jsonwebtoken';

import { TokenPayload } from '../../dto/userCreateDto';
import passportAuth from '../../middlewares/passportAuth';
import passport from '../../strategies/googleStrategy';

const googleRouter = Router();
const CLIENT_URL = 'http://localhost:5173/auth/loginsocialsuccess';

googleRouter.get('/auth/success', (req: Request, res: Response) => {
  const usuario = req.user?._json;
  const token: TokenPayload = {
    email: usuario?.email,
    emailIsValid: usuario?.email_verified,
    name: usuario?.name,
    photoUrl: usuario?.picture,
    id: req.user?.id,
    access_data: '',
  };

  const secret = process.env.JWT_SECRET as string;
  token.access_data = jwt.sign(token, secret as string, {
    expiresIn: '20d',
  });
  console.log(req.user?._json);
  return res.status(200).json(token);
});

googleRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

googleRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
    successRedirect: CLIENT_URL,
  }),
);

googleRouter.get('/auth/logout', (req: Request, res: Response, next) => {
  req.session.destroy(function (err) {
    if (err) next(err);
    res.redirect('/auth/google');
  });
});
export default googleRouter;
