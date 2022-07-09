const router = require("express").Router();

const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  hideComment,
} = require("../controllers/commentController");

router.get("/", getAllComments);
router.get("/:id", getComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", hideComment);

module.exports = router;
