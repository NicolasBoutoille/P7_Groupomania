const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middlewares/multer-config');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('/', multer, postController.createPost);
router.put('/:id', multer, postController.modifyPost);
router.delete('/:id', postController.deletePost);

module.exports = router;