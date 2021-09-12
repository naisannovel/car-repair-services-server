const googleAuthRouter = require('./googleAuthRouter');


module.exports = (app)=>{
    app.use('/api/auth/google',googleAuthRouter)
}