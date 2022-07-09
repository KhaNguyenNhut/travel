const router = require("express").Router();

const {
  getAllDistricts,
  getDistrict,
  createDistrict,
  updateDistrict,
} = require("../controllers/DistrictController");

router.get("/", getAllDistricts);
router.get("/:id", getDistrict);
router.post("/", createDistrict);
router.put("/:id", updateDistrict);

module.exports = router;
