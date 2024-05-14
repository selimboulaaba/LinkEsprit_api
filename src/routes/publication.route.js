const express = require('express');
const router = express.Router();
const publicationController = require("../controllers/publication.controller")


router.route('/publications')
.post(publicationController.create);

router.get('/publications/:id', publicationController.list);

router.put('/publications/update/:id', publicationController.update);
router.delete('/publications/:id',publicationController.remove);
router.put('/publications/updateLikes/:id', publicationController.updateLikes);

router.get('/publications/likes/:id', publicationController.getLikedUsersForPublication);

module.exports = router;
