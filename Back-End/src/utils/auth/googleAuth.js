import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
}))
