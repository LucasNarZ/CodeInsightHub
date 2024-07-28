import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github2";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:"https://localhost/api/auth/github"
}, async () => {}));
