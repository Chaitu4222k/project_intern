const Performance = require('../models/Performance');

exports.createPerformance = async (req, res) => {
    try {
        const { internId, performanceDate, evaluation } = req.body;
        if (!internId || !performanceDate || !evaluation) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const performance = await Performance.create({ intern: internId, performanceDate, evaluation });
        res.status(201).json({ performance, status: true, msg: 'Performance record created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.getPerformance = async (req, res) => {
    try {
        const performance = await Performance.findById(req.params.performanceId).populate('intern');
        if (!performance) {
            return res.status(404).json({ status: false, msg: 'Performance record not found' });
        }
        res.status(200).json({ performance, status: true, msg: 'Performance record retrieved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.updatePerformance = async (req, res) => {
    try {
        const { performanceDate, evaluation } = req.body;
        if (!performanceDate || !evaluation) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const performance = await Performance.findById(req.params.performanceId);
        if (!performance) {
            return res.status(404).json({ status: false, msg: 'Performance record not found' });
        }

        const updatedPerformance = await Performance.findByIdAndUpdate(req.params.performanceId, { performanceDate, evaluation }, { new: true });
        res.status(200).json({ performance: updatedPerformance, status: true, msg: 'Performance record updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

/* exports.deletePerformance = async (req, res) => {
    try {
        const performance = await Performance.findById(req.params.performanceId);
        if (!performance) {
            return res.status(404).json({ status: false, msg: 'Performance record not found' });
        }

        await Performance.findByIdAndDelete(req.params.performanceId);
        res.status(200).json({ status: true, msg: 'Performance record deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
}; */
