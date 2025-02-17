const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const createOrder = (req, res) => {
    const { userId, productId, quantity } = req.body;
    //validate user
    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send("User not found");
            }
            return Product.findById(productId);
        })
        //validate product
        .then((product) => {
            if (!product) {
                return res.status(404).send("Product not found");
            }
            if (product.stock < quantity) {
                return res.status(400).send("Insufficient stock");
            }
            product.stock -= quantity;
            product.save();
        })
        .then(() => {
            const order = new Order({ userId, productId, quantity });
            order.save()
                .then((result) => {
                    res.send(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

const getAllOrders = (req, res) => {
    Order.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

const getOrder = (req, res) => {
    const id = req.params.id;
    Order.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteOrder = (req, res) => {
    const id = req.params.id;
    let deletedOrder; // Store order before deletion

    Order.findById(id)
        .then((order) => {
            if (!order) {
                return res.status(404).send("Order not found");
            }
            deletedOrder = order; // Store the deleted order details before removing it
            return Order.findByIdAndDelete(id);
        })
        .then(() => {
            return Product.findById(deletedOrder.productId);
        })
        .then((product) => {
            if (!product) {
                return res.status(404).send("Product not found");
            }
            product.stock += deletedOrder.quantity;
            return product.save();
        })
        .then((updatedProduct) => {
            res.send({ message: "Order deleted successfully", updatedProduct });
        })
        .catch((error) => {
            console.error("Error deleting order:", error);
            res.status(500).send("Internal Server Error");
        });
};

const updateOrder = ((req, res) => {
    const id = req.params.id;
    const { userId, productId, quantity } = req.body;
    let existingOrder;
    Order.findById(id)
        .then((order) => {
            if (!order) throw new Error("Order not found");
            existingOrder = order;
            return Product.findById(productId);
        })
        .then((product) => {
            if (!product) throw new Error("Product not found");
            product.stock -= quantity - existingOrder.quantity;
            product.save()
                .then(() => {
                    Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                        .then((order) => {
                            res.send(order);
                        })
                        .catch((error) => {
                            console.log("Here");
                            console.log(error);
                        });
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

// const patchOrder = ((req, res) => {
//     const id = req.params.id;
//     const { userId, productId, quantity } = req.body;
//     let existingOrder;
//     Order.findById(id)
//         .then((order) => {
//             if (!order) throw new Error("Order not found");
//             existingOrder = Order;
//             return Product.findById(order.productId);
//         })
//         .then((product) => {
//             if (!product) throw new Error("Product not found");
//             product.stock -= quantity - existingOrder.quantity;
//             product.save()
//                 .then(() => {
//                     Order.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true })
//                         .then((order) => {
//                             res.send(order);
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                         });
//                 });
//         })
//         .catch((error) => {
//             console.log(error);
//         });

// });

const patchOrder = (req, res) => {
    const id = req.params.id;
    const { userId, productId, quantity } = req.body;
    let existingOrder; // Store order reference

    // Check if at least one valid field is provided for update
    if (!userId && !productId && quantity === undefined) {
        return res.status(400).send("At least one field (userId, productId, quantity) is required for update.");
    }

    Order.findById(id)
        .then((order) => {
            if (!order) {
                return res.status(404).send("Order not found");
            }
            existingOrder = order; // Save the existing order data
            return Product.findById(order.productId);
        })
        .then((product) => {
            if (!product) {
                return res.status(404).send("Product not found");
            }

            // Adjust stock only if quantity is being updated
            if (quantity !== undefined) {
                const quantityDifference = quantity - existingOrder.quantity;
                if (product.stock < quantityDifference) {
                    return res.status(400).send("Insufficient stock to update order");
                }
                product.stock -= quantityDifference;
                return product.save();
            }
        })
        .then(() => {
            return Order.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
        })
        .then((updatedOrder) => {
            res.send(updatedOrder);
        })
        .catch((error) => {
            console.error("Error updating order:", error);
            res.status(500).send("Internal Server Error");
        });
};


module.exports = { createOrder, getAllOrders, getOrder, deleteOrder, updateOrder, patchOrder };