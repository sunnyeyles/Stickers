import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// data type received from google api
interface IUserData {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
}

export const handleGoogleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }

      if (!user) {
        return res.redirect("/login");
      }

      // Authentication succeeded, user data is available in `req.user`
      const userData: IUserData = user as IUserData;

      // Create a JWT token if needed
      const payload = {
        id: userData.id,
        name: userData.displayName,
      };
      const token = jwt.sign(payload, clientSecret, { expiresIn: "1h" });

      res.send(`Hi ${userData.displayName} your token is Token: ${token}`);
    }
  )(req, res);
};

export default passport;
