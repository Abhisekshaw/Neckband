const device = require('../models/device.model');
const moment = require('moment-timezone');

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

//Get device data
exports.getDevice = async (req, res) => {
    try {
        const {Device, animal_type, startdate, enddate} = req.body;

        //validate inputs
        if(!Device || !animal_type || !startdate || !enddate) {
            return res.status(400).json({success: false, message: "all fields are required"});
        }

        //Convert Ist dates to utc format
        const startDate = moment.tz(startdate, 'MM/DD/YYYY hh:mm:ss A', 'Asia/Kolkata').utc().toISOString();
        const endDate = moment.tz(enddate, 'MM/DD/YYYY hh:mm:ss A', 'Asia/Kolkata').utc().toISOString();

        const deviceData = await device.find({
            Device,
            animal_type,
            createdAt: {$gte: startDate, $lte: endDate}
        });

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: deviceData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error fetching device data"});
    }
}