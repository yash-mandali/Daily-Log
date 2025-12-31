const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    work: { type: String, required: true },
    isHoliday: { type: Boolean, default: false },
});

module.exports = mongoose.model('DailyLog', dailyLogSchema);