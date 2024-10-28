"use strict";

const  {Customer}  = require("../models");
require("dotenv").config();

const CustomerController = {
  create: async (req, res) => {
    try {
      const { name, email } = req.body;
      const customerExists = await Customer.findOne({
        where: {
          email,
        },
      });
      if (customerExists) {
        return res.status(400).json({
          message: "El cliente ya existe",
        });
      }
      const customerSaved = await Customer.create({
        name,
        email,
      });
      return res.status(201).json({
        message: "Customer Crated",
        customerSaved,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  updateCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const customerExists = await Customer.findByPk(id);
      if (!customerExists) {
        return res.status(404).json({
          message: "El cliente no existe",
        });
      }
      customerExists.name = name || customerExists.name;
      customerExists.email = email || customerExists.email;
      await customerExists.save();
      return res.status(200).json({
        message: "Customer Updated",
        customerExists,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({
          message: "El cliente no existe",
        });
      }
      await customer.destroy();
      return res.status(200).json({
        message: "Customer Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.findAll()        
      return res.status(200).json({ customers });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
};

module.exports = CustomerController;

