const { User } = require('../models/user')
const httpStatus = require('http-status')
const { ApiError } = require('../middleware/apiError')
const userService= require('./user.service')

const createUser = async(email, password) => {
    try {
        if(await User.emailTaken(email)) {
            // console.log("Email already exists")
            throw new ApiError(httpStatus.BAD_REQUEST, "Email taken.")
        }
        // creates new instance in db
        const user = new User({
            email, 
            password
        })
        await user.save();
        return user; 
    }
    catch(error) {
        throw error;
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async(email, password) => {
    try {
        const user = await userService.findUserByEmail(email);
        if(!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Email does not exist.")
        }
        if(!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password.")
        }
        return user;
    }
    catch(error) {
        throw error;
    }
}

module.exports = {
    createUser, 
    genAuthToken,
    signInWithEmailAndPassword
}