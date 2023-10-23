const express = require("express");
const router = express.Router();

const productCategoryController = require("../controllers/product-category.controller");
const authenticateUser = require("../middlewares/authenticateUser.middleware");

router.get("/", productCategoryController.GetProductCategories);
router.get("/:id", productCategoryController.GetProductCategory);

// Secure routes
router.post("/create", authenticateUser, productCategoryController.CreateProductCategory);
router.patch("/update/:id", authenticateUser, productCategoryController.UpdateProductCategory);
router.delete("/delete/:id", authenticateUser, productCategoryController.DeleteProductCategory);

module.exports = router;