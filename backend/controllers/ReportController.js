const Report = require('../models/Report');
const Notification = require('../models/Notification');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({ isPublic: true }).populate('post user');
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Report.find({ post: req.params.id }).populate('user');
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: 'Not found report' });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
    };
    const report = await Report.create(data);
    const notification = await Notification.create(data);
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateReport = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);
    if (!report) {
      res.status(400).json({ message: 'Not found report' });
    }
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
    };

    report = await Report.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.hideReport = async (req, res) => {
  try {
    let report = await Report.findOne({ _id: req.params.id });
    if (!report) {
      res.status(400).json({ message: 'Not found report' });
    }

    report.isPublic = false;
    await report.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
