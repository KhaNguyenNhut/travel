const router = require("express").Router();

const {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  hideNotification,
} = require("../controllers/notificationController");

router.get("/", getAllNotifications);
router.get("/:id", getNotification);
router.post("/", createNotification);
router.put("/:id", updateNotification);
router.delete("/:id", hideNotification);

module.exports = router;
