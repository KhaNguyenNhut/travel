const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Not found user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      name: name,
      avatar: avatar,
      email: email,
      password: hashedPassword,
    };

    const user = await User.create(data);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: 'Not found user' });
    }
    const { name, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      name: name,
      avatar: avatar,
      email: email,
      password: hashedPassword,
    };

    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.blockUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).json({ message: 'Not found user' });
    }

    user.isBlock = !user.isBlock;
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: 'Username or Password is required !' });
    }

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Username or Password is wrong !' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(404)
        .json({ message: 'Username or Password is wrong !' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
