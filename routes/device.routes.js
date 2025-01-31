const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const verifyToken = require('../middleware/authmiddleware');

router.post('/add', deviceController.addDevice);
router.post('/get', deviceController.getDevice);

module.exports = router;