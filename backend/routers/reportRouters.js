const router = require("express").Router();

const {
  getAllReports,
  getReport,
  createReport,
  updateReport,
  hideReport,
} = require("../controllers/reportController");

router.get("/", getAllReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", hideReport);

module.exports = router;
