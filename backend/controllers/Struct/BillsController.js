const Bill = require('../models/Bill');
const Table = require('../models/Table');
const Order = require('../models/Order');

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).populate('table').sort( { createAt: -1 } );
    res.status(200).json(bills);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Not found bill' });
  }
};

exports.getBillByTable = async (req, res) => {
  try {
    const bill = await Bill.find({ table: req.params.id });
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Not found bill' });
  }
};

exports.createBill = async (data) => {
  try {
    await Order.deleteMany({ "table": data.table?._id })

    const bill = await Bill.create(data);
    await Table.findByIdAndUpdate(data.table?._id, { status: 'Empty', customerName: ''});
    return bill;
  } catch (err) {
    return 'Have something wrong!';
  }
};

exports.updateBill = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);
    if (!bill) {
      res.status(400).json({ message: 'Not found bill' });
    }
    bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);
    if (!bill) {
      res.status(400).json({ message: 'Not found bill' });
    }

    await bill.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
