const express = require('express');
const router = express.Router();

const hallController = require('../controllers/hallController.js');
const enshureToken = require('../libs/enshureToken.js');
const enshureAdmin = require('../libs/enshureAdmin.js');
const enshureTokenWithBarrier = require('../libs/enshureTokenWithBarrier.js');



router.put('/hall',enshureTokenWithBarrier,enshureAdmin, hallController.addHall); //Only admin can add new halls;
router.get('/halls',enshureTokenWithBarrier, hallController.getAllHalls); //All authenticated users can view all halls;
router.delete('/hall/:id',enshureTokenWithBarrier,enshureAdmin, hallController.deleteHall); //Only admin can delete hall;
// Developer routes
router.get('/test', enshureAdmin);

module.exports = router;