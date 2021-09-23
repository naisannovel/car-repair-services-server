const { Schema, model } = require('mongoose');
const joi = require('joi');

const ServiceSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    price:{
        type: Number,
        min: 1,
        required: true,
    },
    about:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: Object,
        required: true
    }
},{ timestamps: true })

const validateService = service =>{
    const schema = joi.object({
        name: joi.string().min(2).max(255).required(),
        price: joi.number().required(),
        about: joi.string().min(5).max(2000).required()
    })
    return schema.validate(service)
}

module.exports.ServiceModel = model('Service',ServiceSchema);
module.exports.validate = validateService;