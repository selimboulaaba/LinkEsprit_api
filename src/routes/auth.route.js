const authController = require('../controllers/auth.controller')
const { userVerification } = require('../middlewares/auth.middleware')
const passport = require('passport'); // Import passport module
const router = require('express').Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/', userVerification)
router.post('/resetrequest', authController.resetPasswordRequestController)
router.post('/passwordReset', authController.resetPasswordController)
router.post('/google-login-callback', authController.googleLoginCallback)
router.get('/verifyExistingUser/:email', authController.verifierExistingUser)
module.exports = router
