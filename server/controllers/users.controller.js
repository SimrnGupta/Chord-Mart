const { userService, authService } = require('../services')
const httpStatus = require('http-status')
const { ApiError } = require('../middleware/apiError')

const userController = {
    async profile(req, res, next) {
        try {
            const user = await userService.findUserById(req.user._id);
            if(!user) {
                throw new ApiError(httpStatus.NOT_FOUND, "User not found.")
            }
            res.json(res.locals.permission.filter(user._doc)) // filter based on persmissions not granted in auth.js
            
        } catch(err) {
            next(err)
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req);
            res.json(user)
            
        } catch(err) {
            next(err)
        }
    },
    async updateUserEmail(req, res, next) {
        try {
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            res.cookie('access-token', token).status(httpStatus.OK).send({user, token})            
        } catch(err) {
            next(err)
        }
    }
 
}

module.exports =  userController