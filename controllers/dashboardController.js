const device = require('../models/device.model');

// get all unique devices and their corresponding animal types
exports.getDeviceAndAnimal = async(req, res) => {
    try {
        const uniqueDevices = await device.aggregate ([
            {
                $group: {
                    _id: "$Device",
                    animal_type: {$addToSet: "$animal_type"}
                }
            },
            { $sort : { _id : 1 }}
        ]);

        res.status(200).json({
            success: true,
            message: "Device and animal-type retrieved successfully",
            data: uniqueDevices
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}