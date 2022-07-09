const City = require("../models/City");

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    console.log(city);
    res.status(200).json(city);
  } catch (err) {
    res.status(400).json({ message: "Not found city" });
  }
};

exports.createCity = async (req, res) => {
  try {
    const { name } = req.body;
    const data = {
      name: name,
    };

    const city = await City.create(data);
    res.status(200).json(city);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateCity = async (req, res) => {
  try {
    let city = await City.findById(req.params.id);
    if (!city) {
      res.status(400).json({ message: "Not found city" });
    }
    const { name } = req.body;
    const data = {
      name: name,
    };

    city = await City.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(city);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
