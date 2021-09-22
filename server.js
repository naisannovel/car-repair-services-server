const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MAIN_MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose.connect(DB)
.then(()=>console.log('mongodb connected successfully'))
.catch(()=>console.log('mongodb connection failed'))

app.listen(process.env.PORT || 4001,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})