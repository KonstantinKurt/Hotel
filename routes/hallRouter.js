const express = require('express');
const router = express.Router();

const hallController = require('../controllers/hallController.js');
const enshureToken = require('../libs/enshureToken.js');
const enshureAdmin = require('../libs/enshureAdmin.js');


router.put('/hall',enshureToken,enshureAdmin, hallController.addHall); //Only admin can add new halls;
router.get('/halls',enshureToken, hallController.getAllHalls); //All authenticated users can view all halls;
router.delete('/hall/:id',enshureToken,enshureAdmin, hallController.deleteHall); //Only admin can delete hall;
// Developer routes
router.get('/test', enshureAdmin);

module.exports = router;