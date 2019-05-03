const User = require('../models/userModel');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    signUp: async function (req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        user.save()
            .then(doc => {
                res.status(201).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err,
                });
            })
    },
    signIn: async function (req, res) {
        User.findOne({email: req.body.email})
            .exec()
            .then(doc => {
                if(doc){
                    if (bcrypt.compareSync(req.body.password, doc.password)) {
                        const token = jwt.sign({doc}, process.env.SECRET, { expiresIn: '72h' });
                        res.status(200).json({
                            _id:doc._id,
                            token: token});
                    }
                }
                res.status(404).json({
                    message: `Incorrect password or email`,
                });

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },


};