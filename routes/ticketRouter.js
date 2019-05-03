const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController.js');
const enshureToken = require('../libs/enshureToken.js');

router.put('/ticket',enshureToken, ticketController.addTicket); //All authenticated users can buy ticket, if room is empty;
router.delete('/ticket',enshureToken, ticketController.deleteTicket);//All authenticated users can delete his own ticket;
router.get('/tickets',enshureToken, ticketController.getAlltickets);

module.exports = router;

