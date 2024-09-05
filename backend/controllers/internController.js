const Intern = require('../models/Intern');

exports.createIntern = async (req, res) => {
    try {
        const { name, contact, department, startDate, endDate } = req.body;
        if (!name || !contact || !department || !startDate || !endDate) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const intern = await Intern.create({ name, contact, department, startDate, endDate });
        res.status(201).json({ intern, status: true, msg: 'Intern created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.getInterns = async (req, res) => {
    try {
        const interns = await Intern.find(req.query); // `req.query` enables filtering
        res.status(200).json({ interns, status: true, msg: 'Interns retrieved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

// exports.updateIntern = async (req, res) => {
//     try {
//         const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!intern) {
//             return res.status(404).json({ status: false, msg: 'Intern not found' });
//         }

//         const updatedIntern = await Intern.findByIdAndUpdate(req.params.internId, req.body, { new: true });
//         res.status(200).json({ intern: updatedIntern, status: true, msg: 'Intern updated successfully' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ status: false, msg: 'Internal Server Error' });
//     }
// };

exports.updateIntern = async (req, res) => {
    try {
        const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIntern);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteIntern = async (req, res) => {
    try {
        const intern = await Intern.findByIdAndDelete(req.params.internId);
        if (!intern) {
            return res.status(404).json({ status: false, msg: 'Intern not found' });
        }
        res.status(200).json({ status: true, msg: 'Intern deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};
