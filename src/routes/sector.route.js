const express = require('express')
const router = express.Router()
const sectorController = require('../controllers/sector.controller')

router.route('/sectors')
  .get(sectorController.list)
  .post(sectorController.create)

router.put('/sectors/update/:id', sectorController.update)

router.put('/sectors/update/:id', sectorController.update)
router.delete('/sectors/:id', sectorController.remove)

module.exports = router
