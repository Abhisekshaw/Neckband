const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const deviceSchema = new mongoose.Schema({
    Device: {type: String},
    animal_type: {type: String},
    realtime: {type: String},
    irtemp: {type: Number},
    bpm: {type: Number},
    spO2: {type: Number},
    Pitch: {type: Number},
    Posture: {type: String},
    Rumination: {type: String},
    deviceOrientation: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    batteryPercentage: {type: Number},
    cv: {type: Number},
    abnormal_flag: {type: Number},
    imei: {type: String},
    simNo: {type: String},
    esp32No : {type: String},
    esp32Mdate: {type: String},
    accX: {type: Number},
    accY: {type: Number},
    accZ: {type: Number},
    GyroX: {type: Number},
    GyroY: {type: Number},
    GyroZ: {type: Number},
    magX: {type: Number},
    magY: {type: Number},
    magZ: {type: Number},
}, { timestamps: true })

// Middleware to convert timestamps to IST before saving
deviceSchema.pre('save', function (next) {
    // Convert timestamps to IST
    this.createdAt = moment(this.createdAt).tz('Asia/Kolkata');
    this.updatedAt = moment(this.updatedAt).tz('Asia/Kolkata');
    next();
});

const device = mongoose.model('DeviceData', deviceSchema);

module.exports = device;