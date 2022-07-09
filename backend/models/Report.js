var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReportSchema = new Schema({
  content: { type: String },
  post: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: new Date() },
  isPublic: { type: Boolean, default: true },
});

ReportSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Report", ReportSchema);
