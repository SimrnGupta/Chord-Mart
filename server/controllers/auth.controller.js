const { authService, emailService } = require('../services')

const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);

            // send user email for verification
            await emailService.registerEmail(email, user);

            res.cookie('access-token', token).status(200).send({user, token})
        }
        catch(error) {
            console.log(error)
            next(error)
        }
    },
    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signInWithEmailAndPassword(email, password);
            const token = await authService.genAuthToken(user);
            res.cookie('access-token', token).send({user, token})
        }
        catch(error) {
            next(error)
        }
    },
    async isauth(req, res, next) {
        try {
            res.json(req.user)
        }
        catch(error) {
            console.log(error)
        }
        
    },
}

module.exports =  authController