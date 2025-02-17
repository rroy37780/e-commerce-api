const express = require('express');
const router = express();

const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.patch('/products/:id', productController.patchProduct);

module.exports = router;