// cartProduct.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class CartProduct extends Model {}

CartProduct.init(
  {
    cartProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts', // carts tablosuna referans
        key: 'cartId',
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
    modelName: 'CartProduct',
    tableName: 'cart_products',
    timestamps: false,
  }
);

module.exports = CartProduct;
