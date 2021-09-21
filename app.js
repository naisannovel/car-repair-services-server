require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// payment gateway
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// router
const userAuthRouter = require('./routers/userAuthRouter');
const serviceRouter = require('./routers/serviceRouter');
const reviewRouter = require('./routers/reviewRouter');
const cartRouter = require('./routers/cartRouter');

app.use(express.static(__dirname + '/media/img/'))
app.use(express.json());
app.use(cors());

// google auth
require('./googleAuth/googleAuthRoute')(app);

app.get('/',(req,res)=>{
    res.send('hello world, i am root api')
})

app.use('/api/user',userAuthRouter);
app.use('/api', serviceRouter);
app.use('/api/review', reviewRouter);
app.use('/api/cart',cartRouter)

// payment router

app.post("/payment", (req, res) => {
    const { service, token } = req.body;
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: service.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${service.name}`
          }
        );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
  });

//   ------------------

app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;