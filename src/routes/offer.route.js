const express = require('express')
const router = express.Router()
const offerController = require('../controllers/offer.controller')

router
  .route('/offers')
  .get(offerController.list)
  .post(offerController.create)
router.get('/offers/publication/:pubId', offerController.getOffferByPublication)
router.get('/offers/:id', offerController.getById)
router.get('/offers/user/:userId', offerController.getOffersByUserId)
router.put('/offers/update/:id', offerController.update)
router.put('/offers/delete/:id', offerController.deleteOffer)
router.get('/offers/posted/:id', offerController.ownOffers)
router.post('/offers/verifyStudent', offerController.verifyStudentRecommendation)
router.post('/offers/recommend', offerController.recommendStudentForOffer);
router.post('/offers/endOffer/:id/:isEnded', offerController.endOffer);
router.get('/offers/recommended/:userId', offerController.getRecommendedOffers);
router.put('/offers/reject/:recommendationId', offerController.rejectOffer);
module.exports = router
