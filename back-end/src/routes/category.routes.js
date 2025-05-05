const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller/index");
const upload = require("../config/multer.config");

router.route("/").get(categoryController.getAllCategories).post(upload.single("img"), categoryController.addCategory);
router.route("/onlyIKnow").delete(categoryController.deleteAllCategories);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .delete(categoryController.deleteCategory)
  .put(upload.single("img"), categoryController.updateCategory);

module.exports = router;
