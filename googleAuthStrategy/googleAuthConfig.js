const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GoogleAuth } = require('../models/googleAuthModel');
const _ = require('lodash');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, cb) => {
    let user = await GoogleAuth.findOne({
        googleId:profile.id,
        email: profile._json.email
    })
    if(user){
        const token = user.generateJWT();
        const response = {
            user: _.pick(user,['_id','name','email']),
            token
        }
        cb(null,response)
    }else{
        user = new GoogleAuth({
            googleId:profile.id,
            email: profile._json.email,
            name: profile.displayName
        })

        try{
            const result = await user.save();
            const token = user.generateJWT();
            const response = {
                user: _.pick(result,['_id','name','email']),
                token      
            }
            cb(null,response)
        }catch(error){
            return response.status(400).send('unknown error')
        }
    }
}))
