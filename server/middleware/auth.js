// middleware incorporating passport.authenticate() to authorize requests
const passport = require('passport');
const httpStatus = require('http-status')
const { ApiError } = require('../middleware/apiError')

const verify = (req, res, resolve, reject) => async(err, user) => {
    if(err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized request!'))
    }
    req.user = user;
    resolve()
}

const auth = () => async(req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject))(req, res, next) 
        // console.log("yo : ", req)
    })
    .then(() => next())
    .catch((err) => next(err))
}

module.exports = auth;
