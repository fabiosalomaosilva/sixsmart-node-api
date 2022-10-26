import { Response, Request, Router } from 'express';
import jwt from 'jsonwebtoken';

import { TokenPayload } from '../../dto/userCreateDto';
import passportAuth from '../../middlewares/passportAuth';
import passport from '../../strategies/googleStrategy';

const googleRouter = Router();

googleRouter.get(
  '/auth/success',
  passportAuth,
  (req: Request, res: Response) => {
    const usuario = req.user?._json;
    const token: TokenPayload = {
      email: usuario?.email,
      emailIsValid: usuario?.emailVerified,
      name: usuario?.name,
      photoUrl: usuario?.photoUrl,
      id: req.user?.id,
      access_data: '',
    };

    const secret = process.env.JWT_SECRET as string;
    token.access_data = jwt.sign(token, secret as string, {
      expiresIn: '20d',
    });
    return res.json(token);
  },
);

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
    successRedirect: '/auth/success',
  }),
);

googleRouter.get('/auth/logout', (req: Request, res: Response, next) => {
  req.session.destroy(function (err) {
    if (err) next(err);
    res.redirect('/auth/google');
  });
});
export default googleRouter;
