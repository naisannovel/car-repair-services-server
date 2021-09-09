const { Schema,model } = require('mongoose');
const jwt = require('jsonwebtoken');

const googleAuthSchema = new Schema({
    name:{
        type:String,
        required: true,
        minlength:2,
        maxlength:255
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    googleId:{
        type:String,
        required:true,
        unique:true,
        minlength:2
    }
},{timestamps:true})

googleAuthSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id:this._id,
        name:this.email,
        email:this.email,
        role:this.role
    },process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    return token;
}

module.exports.GoogleAuth = googleAuthSchema;