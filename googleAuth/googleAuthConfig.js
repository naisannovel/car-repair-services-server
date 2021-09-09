const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GoogleAuth } = require('../models/googleAuthModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4001/auth/google/redirect'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
}))
