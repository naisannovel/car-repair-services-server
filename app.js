require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');     // during deployment need this package.
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const fileUpload = require('express-fileupload');

// GoogleStrategy
require('./googleAuthStrategy/googleAuthConfig');

// router
const googleAuthRouter = require('./routers/googleAuthRouter');
const userAuthRouter = require('./routers/userAuthRouter');
const serviceRouter = require('./routers/serviceRouter');
const reviewRouter = require('./routers/reviewRouter');
const cartRouter = require('./routers/cartRouter');
const paymentRouter = require('./routers/paymentRouter');

// Middleware
app.use(express.static(__dirname + '/media/img/'))
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(passport.initialize());
app.use(fileUpload());

// root api
app.get('/',(req,res)=>{
    res.send('hello world, i am root api')
})


app.use('/api/user',userAuthRouter);
app.use('/api', serviceRouter);
app.use('/api/review', reviewRouter);
app.use('/api/cart',cartRouter)
// payment router
app.use('/payment',paymentRouter);
// google auth router
app.use('/api/auth/google',googleAuthRouter)


app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;