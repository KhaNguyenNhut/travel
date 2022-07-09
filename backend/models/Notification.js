var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  content: { type: String },
  post: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: new Date() },
  isSeen: { type: Boolean, default: false },
});

NotificationSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Notification", NotificationSchema);
