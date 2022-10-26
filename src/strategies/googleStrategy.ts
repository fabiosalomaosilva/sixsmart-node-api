import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const googleStrategy = GoogleStrategy.Strategy;

passport.serializeUser(function (user: unknown, done): void {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  return done(null, user);
});

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
passport.use(
  new googleStrategy(
    {
      clientID: googleClientId as string,
      clientSecret: googleClientSecret as string,
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    },
    function (
      request: unknown,
      accessToken: string,
      refreshToken: string,
      profile: Express.User,
      done,
    ) {
      return done(null, profile);
    },
  ),
);

export default passport;
