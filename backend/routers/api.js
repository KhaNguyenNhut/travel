const express = require("express");
var app = express();

const userRoutes = require("./userRouters");
const cityRoutes = require("./cityRouters");
const districtRoutes = require("./districtRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRouters");
const reportRoutes = require("./reportRouters");
const notificationRoutes = require("./notificationRouters");

app.use("/users", userRoutes);
app.use("/city", cityRoutes);
app.use("/district", districtRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/report", reportRoutes);
app.use("/notification", notificationRoutes);

module.exports = app;
