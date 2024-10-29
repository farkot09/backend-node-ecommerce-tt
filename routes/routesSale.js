const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/saleController");

router.get("/sales", SaleController.getAllSales);
router.post("/sales", SaleController.create);

module.exports = router;