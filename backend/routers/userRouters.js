const router = require("express").Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  blockUser,
  login,
} = require("../controllers/UserController");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", blockUser);
router.post("/login", login);

module.exports = router;
