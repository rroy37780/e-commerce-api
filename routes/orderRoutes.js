const express = require('express');
const router = express();

const orderController = require('../controllers/orderController.js');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.put('/orders/:id', orderController.updateOrder);
router.patch('/orders/:id', orderController.patchOrder);

module.exports = router;