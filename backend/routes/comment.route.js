const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getOneComment);
router.post('/', auth, commentController.createComment);
router.put('/:id', auth, commentController.modifyComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;