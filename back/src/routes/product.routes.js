const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authenticateUser = require("../middlewares/authenticateUser.middleware");

router.get("/", productController.GetProducts);
router.get("/:id", productController.GetProduct);
router.get("/stock/:id", productController.GetProductStock);

// Secure routes
router.post("/create", authenticateUser, productController.CreateProduct);
router.patch("/update/:id", authenticateUser, productController.UpdateProduct);
router.delete("/delete/:id", authenticateUser, productController.DeleteProduct);

module.exports = router;