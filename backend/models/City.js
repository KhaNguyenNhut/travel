var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: { type: String, required: true },
});

CitySchema.virtual("district", {
  ref: "District",
  localField: "_id",
  foreignField: "city",
});

CitySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("City", CitySchema);
