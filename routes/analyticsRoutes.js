const express = require('express');
const router = express();
const analyticsController = require('../controllers/analyticsController.js');

router.get('/analytics/top-products', analyticsController.getTopProducts);
router.get('/analytics/top-customers', analyticsController.getTopCustomers);
router.get('/analytics/revenue', analyticsController.getTotalRevenue);
router.get('/analytics/average-order-value', analyticsController.getAverageOrderValue);
router.get('/analytics/customer-ltv/:user_id', analyticsController.getCustomerLTV);

module.exports = router;
