const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userValidator = require('../middlewares/userValidator');

router.post('/signup', userValidator, authController.signUp);
router.post('/login', userValidator, authController.login);

module.exports= router;