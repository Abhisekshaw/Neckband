const device = require('../models/device.model');

// Function to add a new device entry
exports.addDevice = async (req, res) => {
    console.log(req.body);
    try {
        const newDevice = new device(req.body); 
        const savedDevice = await newDevice.save(); // Save to the database
        res.status(201).json({
            message: "Device data saved successfully",
            data: savedDevice,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving device data",
            error: error.message,
        });
    }
};