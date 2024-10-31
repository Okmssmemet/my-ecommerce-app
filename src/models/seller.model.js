const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Seller extends Model {}

Seller.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Seller',
    tableName: 'sellers',
    timestamps: true,
  }
);

module.exports = Seller;
