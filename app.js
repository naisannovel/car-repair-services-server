require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// router
const userAuthRouter = require('./routers/userAuthRouter');

app.use(express.json());
app.use(cors());
dotenv.config();


app.get('/',(req,res)=>{
    res.send('hello world, i am root api')
})

app.use('/user',userAuthRouter);

app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;