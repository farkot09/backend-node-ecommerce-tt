"use strict";

const  {Sale}  = require("../models");
const  {User}  = require("../models");
const  {Product}  = require("../models");
const {sendMasiveMail} = require("./mailController");

require("dotenv").config();

const SaleController = {
    create: async (req, res) => {
      try {
        const { id_customer, total_sale, list_products  } = req.body;
        const customerExists = await User.findOne({
          where: {
            id: id_customer,
          },
        });
        if (!customerExists) {
          return res.status(400).json({
            message: "El cliente NO existe",
          });
        }
        const saleSaved = await Sale.create({
            id_customer,
            total_sale,
            list_products
        });
        //actualizamos la cantidad del inventario
        if (saleSaved) {
          const productUpdateQuantity = list_products.map(async (product) => {
            const productExists = await Product.findByPk(product.id_product);
            if (productExists) {
              productExists.quantity = productExists.quantity - product.quantity_sale;
              await productExists.save();
            }
          });
          await Promise.all(productUpdateQuantity);
        }
        return res.status(201).json({
          message: "Sale Crated",
          saleSaved,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error",
          error,
        });
      }
    },
    getAllSales: async (req, res) => {
      try {
        const sales = await Sale.findAll()        
        return res.status(200).json({ sales });
      } catch (error) {
        return res.status(500).json({
          message: "Error",
          error,
        });
      }
    },
    getSaleByUser: async (req, res) => {
      const {id} = req.params;
      try {
        const sales = await Sale.findAll({
          where: {
            id_customer: id,
          },
        })        
        return res.status(200).json({ sales });
      } catch (error) {
        return res.status(500).json({
          message: "Error",
          error,
        });
      }
    },
  };
  
  module.exports = SaleController;