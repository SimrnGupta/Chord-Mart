const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

userSchema.pre('save', async function(next) {
    let user = this;
    if(user.isModified('password')) {
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next()
})
 
userSchema.methods.generateAuthToken = function() {
    let user = this;
    const userObj = { sub: user._id.toHexString()}
    const token = jwt.sign(userObj, process.env.DB_SECRET_KEY, {expiresIn: '1d'})
    return token;

}

userSchema.statics.emailTaken = async function(email) {
    const user = await this.findOne({email});
    return !!user;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    let user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema)


module.exports = { User
    
}