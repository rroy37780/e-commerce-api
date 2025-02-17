const Product = require('../models/productModel.js');
const addProduct = (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
const getAllProducts = (req, res) => {
    Product.find()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error);
        })
};
const getProduct = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
const deleteProduct = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
//
const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
const patchProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, { runValidators: true })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};

module.exports = { addProduct, getAllProducts, getProduct, deleteProduct, updateProduct, patchProduct };
