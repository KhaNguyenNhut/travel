const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isPublic: true });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.find({
      post: req.params.id,
      isPublic: true,
    }).populate("user");
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: "Not found comment" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
    };
    const comment = await Comment.create(data);
    const notification = await Notification.create(data);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(400).json({ message: "Not found comment" });
    }
    const { content, post, user } = req.body;
    const data = {
      content: content,
      post: post,
      user: user,
      isPublic: false,
    };

    comment = await Comment.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.hideComment = async (req, res) => {
  try {
    let comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      res.status(400).json({ message: "Not found comment" });
    }

    comment.isPublic = false;
    await comment.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
