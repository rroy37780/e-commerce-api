const User = require('../models/userModel.js');
const addUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
const getAllUsers = (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error);
        })
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send("User not found");
            }
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
};
const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
//
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};
const patchUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, { runValidators: true })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
};

module.exports = { addUser, getAllUsers, getUser, deleteUser, updateUser, patchUser };
