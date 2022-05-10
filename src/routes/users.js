var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')



router.post('/api/user', userController.validateUser, userController.addUser);


router.get('/api/user', userController.getUsers);

router.get('/api/user/profile', (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-Point is not yet realised",

  })
})

router.get('/api/user/:userId', userController.getUserById);

router.delete('/api/user/:userId', userController.deleteUser);

router.put('/api/user/:userId', userController.editUser);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
