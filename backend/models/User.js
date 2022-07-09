var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isBlock: { type: Boolean, default: false },
});

UserSchema.virtual("post", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

UserSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("User", UserSchema);
