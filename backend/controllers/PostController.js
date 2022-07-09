const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDelete: false, isPublic: true })
      .populate('user')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Not found post' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, images, district, user, isPublic } = req.body;
    const data = {
      content: content,
      images: images,
      district: district,
      user: user,
      isPublic: isPublic,
    };
    const post = await Post.create(data);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400).json({ message: 'Not found post' });
    }
    const { content, images, district, user } = req.body;
    const data = {
      content: content,
      images: images,
      district: district,
      user: user,
    };

    post = await Post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(400).json({ message: 'Not found post' });
    }

    post.isDeleted = true;
    console.log(post);
    await post.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
