const City = require("../models/City");
const District = require("../models/District");

exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    res.status(200).json(district);
  } catch (err) {
    res.status(400).json({ message: "Not found district" });
  }
};

exports.createDistrict = async (req, res) => {
  try {
    const { name, city } = req.body;
    const data = {
      name: name,
      city: city,
    };

    const district = await District.create(data);
    res.status(200).json(district);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateDistrict = async (req, res) => {
  try {
    let district = await District.findById(req.params.id);
    if (!district) {
      res.status(400).json({ message: "Not found district" });
    }
    const { name, city } = req.body;
    const data = {
      name: name,
      city: city,
    };

    district = await District.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(district);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
