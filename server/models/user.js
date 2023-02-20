const mongoose = require('mongoose')
const validator = require('validator')
require('dotenv').config()

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstname: {
        type: String,
        maxLen: 100, 
        default: '',
        trim: true
    },
    lastname: {
        type: String,
        maxLen: 100, 
        default: '',
        trim: true
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
})

const User = mongoose.Model('User', userSchema)


module.exports = { User
    
}