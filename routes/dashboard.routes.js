const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const dashboardController = require('../controllers/dashboardController');

router.post('/deviceandanimal', dashboardController.getDeviceAndAnimal);

module.exports = router;