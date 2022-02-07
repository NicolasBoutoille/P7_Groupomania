const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;