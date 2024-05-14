const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quiz.controller')

router.route('/quiz')
  .get(quizController.list)
  .post(quizController.create)

router.get('/quiz/:id', quizController.getById)

router.put('/quiz/update/:id', quizController.update)

router.delete('/quiz/:id', quizController.remove)

module.exports = router
