// models/orderedProduct.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class OrderedProduct extends Model {}

OrderedProduct.init(
  {
    orderedProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders', // orders tablosuna referans
        key: 'orderId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // products tablosuna referans
        key: 'productId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderedProduct',
    tableName: 'ordered_products',
    timestamps: false,
  }
);

module.exports = OrderedProduct;
