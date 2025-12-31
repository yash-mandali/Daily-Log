const express = require('express');
const jwt = require('jsonwebtoken');
const DailyLog = require('../models/DailyLog');

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Add log
router.post('/', auth, async (req, res) => {
    const { date, work, isHoliday } = req.body;
    try {
        const log = new DailyLog({ user: req.user, date, work, isHoliday });
        await log.save();
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get logs
router.get('/', auth, async (req, res) => {
    try {
        const logs = await DailyLog.find({ user: req.user }).sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete log
router.delete('/:id', auth, async (req, res) => {
    try {
        const log = await DailyLog.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.json({ message: 'Log deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;