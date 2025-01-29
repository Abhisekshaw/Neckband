const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
}, {timestamps: true});

// Middleware to convert timestamps to IST before saving
UserSchema.pre('save', function (next) {
    // Convert timestamps to IST
    this.createdAt = moment(this.createdAt).tz('Asia/Kolkata');
    this.updatedAt = moment(this.updatedAt).tz('Asia/Kolkata');
    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;