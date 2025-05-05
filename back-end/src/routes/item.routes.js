const express = require("express");
const {
  getAllItems,
  addItem,
  getItem,
  deleteItem,
  updateItem,
  deleteAllItems,
} = require("../controller/item.controller");
const router = express.Router();
const upload = require("../config/multer.config");

router.get("/", getAllItems);
router.delete("/onlyIKnow", deleteAllItems);
router.post("/", upload.single("img"), addItem);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);
router.put("/:id", upload.single("img"), updateItem);

module.exports = router;
