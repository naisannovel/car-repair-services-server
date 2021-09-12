const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price:{
        type: Number,
        required: true,
    },
    about:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports.ServiceModel = model('Service',ServiceSchema)