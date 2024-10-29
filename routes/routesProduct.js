const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/products", ProductController.getAllProducts);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
