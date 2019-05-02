const express = require('express');
const router = express.Router();

const hallController = require('../controllers/hallController.js');
const enshureToken = require('../libs/enshureToken.js');
const enshureAdmin = require('../libs/enshureAdmin.js');


router.put('/hall',enshureToken, hallController.addHall);
router.get('/halls',enshureToken,enshureAdmin, hallController.getAllHalls);
router.delete('/hall/:id',enshureToken, hallController.deleteHall);
// Developer routes
router.get('/test', enshureAdmin);

module.exports = router;