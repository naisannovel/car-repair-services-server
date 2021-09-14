const { Schema, model } = require('mongoose');
const joi = require('joi');

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    profession:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    feedback: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2024
    },
    image: {
        type: String,
        required: true
    },
    userId: Schema.Types.ObjectId
})

module.exports.ReviewModel = model('Review',reviewSchema);