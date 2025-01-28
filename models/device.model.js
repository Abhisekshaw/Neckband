const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const deviceSchema = new mongoose.Schema({
    imei: {type: String},
    simNo: {type: String},
    esp32No : {type: String},
    esp32Mdate: {type: String},
    animal_type: {type: String},
    sensor: {type: String},
    realtime: {type: String},
    irtemp: {type: Number},
    bpm: {type: Number},
    sitting: {type: Number},
    Standing: {type: Number},
    accX: {type: Number},
    accY: {type: Number},
    accZ: {type: Number},
    GyroX: {type: Number},
    GyroY: {type: Number},
    GyroZ: {type: Number},
    Pitch: {type: Number},
    Posture: {type: String},
    deviceOrientation: {type: String},
    magX: {type: Number},
    magY: {type: Number},
    magZ: {type: Number},
    latitude: {type: String},
    longitude: {type: String},
    batteryPercentage: {type: Number},
    abnormal_flag: {type: Number},
    spO2: {type: Number},
    cv: {type: Number},
}, { timestamps: true })

// Middleware to convert timestamps to IST before saving
deviceSchema.pre('save', function (next) {
    this.realtime = moment.tz(this.realtime, 'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    next();
});

const device = mongoose.model('DeviceData', deviceSchema);

module.exports = device;