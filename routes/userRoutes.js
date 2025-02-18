const express = require('express');
const router = express();

const userController = require('../controllers/userController');

router.post('/users', userController.addUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id', userController.patchUser);

module.exports = router;