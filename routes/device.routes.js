const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/add', deviceController.addDevice);

module.exports = router;