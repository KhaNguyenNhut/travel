const router = require("express").Router();

const {
  getAllCities,
  getCity,
  createCity,
  updateCity,
} = require("../controllers/CityController");

router.get("/", getAllCities);
router.get("/:id", getCity);
router.post("/", createCity);
router.put("/:id", updateCity);

module.exports = router;
