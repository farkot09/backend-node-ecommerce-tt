"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {}
  }
  Sale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customers', 
          key: 'id',          
        }
      },
      total_sale: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      list_products: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sale",
      tableName: "sales",      
    }
  );
  return Sale;
};