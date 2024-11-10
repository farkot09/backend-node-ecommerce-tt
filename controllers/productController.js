/* eslint-disable no-undef */
"use strict";

const { Product } = require("../models");
const Redis = require("ioredis");
require("dotenv").config();
const redis = new Redis({
  host: process.env.HOST_REDIS || "localhost", // Dirección del servidor Redis (localhost)
  port: process.env.PORT_REDIS || 6379, // Puerto por defecto de Redis
  password: process.env.PASSWORD_REDIS || "", // Si Redis tiene contraseña, añádela aquí
  db: process.env.DB_REDIS || 0, // Base de datos de Redis (por defecto es 0)
});

const ProductController = {
  create: async (req, res) => {
    try {
      const { name, price, image, quantity, status } = req.body;
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

      const products = await Product.findAll();

      await redis.set("productos", JSON.stringify(products), "EX", 7200);

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
      const { name, price, image, quantity, status = true } = req.body;
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

      const products = await Product.findAll();

      await redis.set("productos", JSON.stringify(products), "EX", 7200);

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

      const products = await Product.findAll();

      await redis.set("productos", JSON.stringify(products), "EX", 7200);
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
      const cachedProducts = await redis.get("productos");

      if (cachedProducts) {
        res.setHeader('X-Data-Source', 'redis');
        return res.status(200).json({ products: JSON.parse(cachedProducts) });
      }

      const products = await Product.findAll();

      await redis.set("productos", JSON.stringify(products), "EX", 7200);

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
