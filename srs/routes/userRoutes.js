const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {validateCreateUser, validateObjectId, validateSearchQuery} = require('../middleware/validate');


router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/profile/:userId', validateObjectId, userController.getUserById);
router.get('/search', validateSearchQuery, userController.searchUsers);
router.get('/sort', userController.getSortedUsers);
router.delete('/:userId', validateObjectId, userController.deleteUser);
router.put('/:userId', validateObjectId, userController.updateUser);


module.exports = router;