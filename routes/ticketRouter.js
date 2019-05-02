const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController.js');
const enshureToken = require('../libs/enshureToken.js');

router.put('/ticket',enshureToken, ticketController.addTicket); //All authenticated users can buy ticket, if room is empty;

module.exports = router;

