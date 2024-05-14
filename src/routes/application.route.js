const express = require('express');
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const { uploadPdfFile } = require('../middlewares/pdfFile.middleware');


router.route('/applications')
// .get(applicationController.list)
.post(uploadPdfFile.single('pdfFile'), applicationController.applyToOffer);
router.get('/applications/verify/:userId/:offerId', applicationController.verify)
router.get('/applications/offer/:offerId', applicationController.getApplicationsByOffer)
router.put('/applications/update/:applicationId', applicationController.update)
router.put('/applications/reply/:applicationId/:state', applicationController.replyToApplication)

// router.put('/applictions/update/:id', applicationController.update);


module.exports = router;
