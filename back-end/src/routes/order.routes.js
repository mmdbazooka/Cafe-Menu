const express = require("express");
const { orderController } = require("../controller/index");
const router = express.Router();
const upload = require("../config/multer.config");

router.get("/", orderController.getAllOrders);
router.post("/", upload.single("img"), orderController.addOrder);
router.get("/:id", orderController.getOrderById);
router.put("/:id", upload.single("img"), orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
