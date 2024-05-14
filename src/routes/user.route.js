const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { userVerification, roleVerification } = require('../middlewares/auth.middleware')
const { uploadProfilePc } = require('../middlewares/profilePic.middleware')

/* GET users. */
/* POST user */
router.route('/users')
  .get(userController.list)
  .post(userController.create)
router.get('/users/dashboard', userController.getDashboard)
router.get('/users/name/:name', userController.getByName)
router.get('/users/skills', userController.getSkills)
router.get('/users/skills/:id', userController.getOwnSkills)

/* GET user */
router.get('/users/:id', userController.getById)
router.get('/users/students/:role',userController.getStudentList)
/* PUT user */
router.put('/users/update/:id', uploadProfilePc.single('file'), userController.update)

/* DELETE user */
router.put('/users/desactivate/:id', userController.desactivate)
router.put('/users/activate/:id', userController.activate)
router.put('/users/verify/:id', userController.verify)
router.post('/users/verifyPassword/:id', userController.verifyPassword)

router.post('/users/addAdmin', userController.addAdmin)
router.post('/users/follow/:userId/:userToFollowId', userController.followUser);
router.post('/users/unfollow/:userId/:userToUnfollowId', userController.unfollowUser);
router.put('/users/skills/:id', userController.updateSkills)

module.exports = router
