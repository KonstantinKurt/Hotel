const Hall = require('../models/hallModel.js');
const Ticket = require('../models/ticketModel.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const enshureTimeInterval = require('../libs/enshureTimeInterval');
module.exports = {
    addTicket: async function (req, res) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            const decodedJwt = jwt.decode(req.headers.token, {complete: true});
            const ticket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                hall_id: req.body.hall_id,
                user_id: decodedJwt.payload.doc._id,
                from: req.body.from,
                to: req.body.to,
                title: req.body.title
            });
            const compareFrom = new Date(req.body.from);
            const compareTo = new Date(req.body.to);
            Ticket.find({hall_id: req.body.hall_id})
                .exec()
                .then(docs => {
                    if (docs) {
                        for (let i = 0; i < docs.length; i++) {
                            if (docs[i].from <= compareTo && compareFrom <= docs[i].to) {
                                return res.status(400).json({message: "Busy!!!"});
                            }
                        }
                        ticket.save()
                            .then(doc => {
                                res.status(201).json(doc);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: err,
                                });
                            });

                    } else {
                        ticket.save()
                            .then(doc => {
                                res.status(201).json(doc);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: err,
                                });
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },
    deleteTicket: async function (req, res) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            const decodedJwt = jwt.decode(req.headers.token, {complete: true});
            Ticket.deleteOne({user_id: decodedJwt.payload.doc._id, _id: req.body._id})
                .exec()
                .then(doc => {
                    if (doc) {
                        res.status(200).json(doc);
                    }
                    res.status(403).send("No authority");
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });


        });
    },
    getAlltickets: async function(req,res){
        jwt.verify(req.headers.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            Ticket.find()
                .exec()
                .then(docs => {
                    if (docs.length > 0) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({
                            message: `DB is empty`,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },

};