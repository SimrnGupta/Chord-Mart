const { User } = require('../models/user')
require('dotenv').config()

// this middleware is used to verify token of user before he goes to some other page, like profile
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const jwtOptions = {
    secretOrKey : process.env.DB_SECRET_KEY,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async(payload, done) => {
    // payload is in the form {sub : user._id} -> generateAuthToken method in models/user.js
    try {
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false);
        }
        else return done(null, user);

    } catch(err) {
        return done(err, false);
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}
