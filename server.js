const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_SERVER_LOCAL}/car-service`)
.then(()=>console.log('mongodb connected successfully'))
.catch(()=>console.log('mongodb connection failed'))

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})
