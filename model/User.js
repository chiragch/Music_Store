var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String

});


module.exports = mongoose.model('users', UserSchema);