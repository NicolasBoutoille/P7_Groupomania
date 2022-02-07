const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

router.get('/:id', auth, userController.getOneUser);
router.put('/:id', auth, multer, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;