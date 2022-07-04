var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')


//Create a user
router.post('/user', userController.validateUser, userController.addUser);

//get all users
router.get('/user', authController.validateToken, userController.getUsers);

//get profile
router.get('/user/profile', authController.validateToken, userController.getUserProfile);

//Get a specific user
router.get('/user/:userId', authController.validateToken, userController.getUserById);

//delete a user
router.delete('/user/:userId', authController.validateToken, userController.deleteUser);

//edit a user
router.put('/user/:userId', authController.validateToken, userController.validateUser, userController.editUser);

module.exports = router;
