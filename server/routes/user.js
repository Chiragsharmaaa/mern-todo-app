const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const middleware = require('../middleware/auth');

router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.post('/updateuserdetails', middleware.authentication, userController.postUpdateUserDetails);

module.exports = router;