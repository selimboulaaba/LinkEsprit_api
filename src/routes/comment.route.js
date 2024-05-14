const express = require('express');
const router = express.Router();
const commentController = require("../controllers/comment.controller")


router.route('/comments')
.get(commentController.list)
.post(commentController.create);

router.get('/comments/publication/:id', commentController.getCommentsByPublicationId);


router.put('/comment/update/:id', commentController.update);
router.delete('/comment/:id',commentController.remove)

module.exports = router;
