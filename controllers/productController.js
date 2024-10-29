"use strict";

const  {Product}  = require("../models");
require("dotenv").config();

const ProductController = {
  create: async (req, res) => {
    try {
      const { name, price, image, quantity, status  } = req.body;
      const productExists = await Product.findOne({
        where: {
            name,
        },
      });
      if (productExists) {
        return res.status(400).json({
          message: "El producto ya existe",
        });
      }
      const productSaved = await Product.create({
        name,
        price,
        image,
        quantity,
        status,
      });
      return res.status(201).json({
        message: "Product Crated",
        productSaved,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, image, quantity, status=true } = req.body;           
      const productExists = await Product.findByPk(id);
      if (!productExists) {
        return res.status(404).json({
          message: "El Producto no existe",
        });
      }
      productExists.name = name || productExists.name;
      productExists.price = price || productExists.price;
      productExists.image = image || productExists.image;
      productExists.quantity = quantity || productExists.quantity;
      productExists.status = status;
      await productExists.save();
      return res.status(200).json({
        message: "product Updated",
        productExists,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);            
      if (!product) {
        return res.status(404).json({
          message: "El producto no existe",
        });
      }
      await product.destroy();
      return res.status(200).json({
        message: "product Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll()        
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
};

module.exports = ProductController;