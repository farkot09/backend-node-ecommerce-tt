"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
      static associate(models) {}
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          status: {
            type: DataTypes.BOOLEAN,
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
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
    });
    return Product;
};