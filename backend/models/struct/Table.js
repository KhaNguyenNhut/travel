const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const connection = mongoose.createConnection('mongodb://localhost/myDatabase');

autoIncrement.initialize(connection);

const TableSchema = new Schema({
  name: { type: String },
  status: { type: String, default: 'empty' },
  customerName: { type: String },
});

TableSchema.plugin(autoIncrement.plugin, { model: 'Table', field: 'TableId' });

module.exports = mongoose.model('Table', TableSchema);
