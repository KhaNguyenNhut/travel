var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: { type: String },
  images: [],
  district: { type: mongoose.Schema.ObjectId, ref: "District" },
  user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: new Date() },
  isPublic: { type: Boolean, default: true },
  isReported: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

PostSchema.virtual("loves", {
  ref: "Love",
  localField: "_id",
  foreignField: "post",
});

PostSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", PostSchema);
