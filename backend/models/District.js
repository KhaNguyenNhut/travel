var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DistrictSchema = new Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.ObjectId, ref: "City" },
});

DistrictSchema.virtual("post", {
  ref: "Post",
  localField: "_id",
  foreignField: "district",
});

DistrictSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("District", DistrictSchema);
