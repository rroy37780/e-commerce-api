const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const getTopProducts = (req, res) => {
    const limit = parseInt(req.query.limit);
    Order.aggregate([
        { $group: { _id: "$productId", totalSold: { $sum: "$quantity" } } },
        { $sort: { totalSold: -1 } },
        { $limit: limit },
        { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
        { $unwind: "$product" }
    ])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
};

const getTopCustomers = (req, res) => {
    const limit = parseInt(req.query.limit);
    Order.aggregate([
        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $group: { _id: "$userId", totalSpent: { $sum: { $multiply: ["$quantity", "$product.price"] } } } },
        { $sort: { totalSpent: -1 } },
        { $limit: limit },
        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" }
    ])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
};

const getTotalRevenue = (req, res) => {
    Order.aggregate([
        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } } } }
    ])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
};

const getAverageOrderValue = (req, res) => {
    Order.aggregate([
        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } }, totalOrders: { $sum: 1 } } },
        { $project: { _id: 0, averageOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] } } }
    ])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
};

const getCustomerLTV = (req, res) => {
    const userId = req.params.user_id;
    Order.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $group: { _id: "$userId", totalSpent: { $sum: { $multiply: ["$quantity", "$product.price"] } } } }
    ])
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
};

module.exports = {
    getTopProducts,
    getTopCustomers,
    getTotalRevenue,
    getAverageOrderValue,
    getCustomerLTV
};
