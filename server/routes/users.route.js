const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const auth = require('../middleware/auth')

router.route('/profile')
.get(auth('readOwn', 'profile'), userController.profile)



module.exports = router