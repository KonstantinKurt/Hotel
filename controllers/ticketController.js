const Hall = require('../models/hallModel.js');
const Ticket = require('../models/ticketModel.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
module.exports = {
    // addTicket: async function (req, res) {
    //     let decodedJwt = jwt.decode(req.headers.token, {complete: true});
    //     const ticket = new Ticket({
    //         _id: new mongoose.Types.ObjectId(),
    //         hall_id: req.body.hall_id,
    //         user_id: decodedJwt.payload.sub,
    //         from: req.body.from,
    //         to: req.body.to,
    //         title: req.body.title
    //     });
    //     if (ticket) {
    //         Hall.updateOne({_id: req.body.hall_id}, {isEmpty:false})
    //             .exec()
    //             .then(doc => {
    //                 if (!doc.error) {
    //                     ticket.save()
    //                         .then(doc => {
    //                             res.status(201).json(doc);
    //                         })
    //                         .catch(err => {
    //                             console.log(err);
    //                             res.status(500).json({
    //                                 errors: err,
    //                             });
    //                         })
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     }
    //
    // },
    addTicket: async function (req, res) {
        let decodedJwt = jwt.decode(req.headers.token, {complete: true});
        const ticket = new Ticket({
            _id: new mongoose.Types.ObjectId(),
            hall_id: req.body.hall_id,
            user_id: decodedJwt.payload.sub,
            from: req.body.from,
            to: req.body.to,
            title: req.body.title
        });
        Ticket.find({hall_id: req.body.hall_id})
            .exec()
            .then(doc => {
               if(doc){
                   res.status(200).json(doc);
               }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    },
};