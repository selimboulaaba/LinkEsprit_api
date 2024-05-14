const express = require('express')
const router = express.Router()
const testController = require('../controllers/test.controller')

router.route('/test')
  .get(testController.list)
  .post(testController.create)

router.get('/test/:id', testController.getById)

router.put('/test/update/:id', testController.update)

router.delete('/test/:id', testController.remove)

module.exports = router
