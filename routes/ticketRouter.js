const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController.js');
const enshureToken = require('../libs/enshureToken.js');
const enshureTokenWithBarrier = require('../libs/enshureTokenWithBarrier.js');

router.post('/tickets',enshureTokenWithBarrier, ticketController.addTicket); //All authenticated users can buy ticket, if room is empty;
router.delete('/tickets',enshureTokenWithBarrier, ticketController.deleteTicket);//All authenticated users can delete his own ticket;
router.get('/tickets', ticketController.getAlltickets);
router.get('/ticketsparams/:from/:to', ticketController.getTicketsWithParams);

module.exports = router;

