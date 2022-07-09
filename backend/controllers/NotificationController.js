const Notification = require("../models/Notification");

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("user")
      .populate("post")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.find({
      user: req.params.id,
    }).populate("user");
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json({ message: "Not found notification" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
    };
    var day = new Date();
    console.log(day);
    const notification = await Notification.create(data);
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(400).json({ message: "Not found notification" });
    }
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
      isSeen: true,
    };

    notification = await Notification.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.hideNotification = async (req, res) => {
  try {
    let notification = await Notification.findOne({ _id: req.params.id });
    if (!notification) {
      res.status(400).json({ message: "Not found notification" });
    }

    notification.isPublic = false;
    await notification.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
