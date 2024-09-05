const Feedback = require('../models/Feedback');

exports.addFeedback = async (req, res) => {
    try {
        const { internName, managerName, content, date } = req.body;
        if (!internName || !managerName || !content || !date) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const feedback = await Feedback.create({ internName, managerName, content, date });
        res.status(201).json({ feedback, status: true, msg: 'Feedback added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({ internName: req.params.internName });
        if (!feedback.length) {
            return res.status(404).json({ status: false, msg: 'No feedback found' });
        }
        res.status(200).json({ feedback, status: true, msg: 'Feedback retrieved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        // Remove any validation related to `validateObjectId`
        const feedback = await Feedback.findById(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.feedbackId, req.body, { new: true });
        res.status(200).json({ feedback: updatedFeedback, status: true, msg: 'Feedback updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        // Remove any validation related to `validateObjectId`
        const feedback = await Feedback.findByIdAndDelete(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }
        res.status(200).json({ status: true, msg: 'Feedback deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};
