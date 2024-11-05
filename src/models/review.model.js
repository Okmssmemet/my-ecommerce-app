// models/review.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Review extends Model {}

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER, // TINYINT yerine INTEGER kullanılıyor
        allowNull: false,
        validate: {
          min: 1, // Minimum 1
          max: 5, // Maximum 5
        },
      },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // user tablosuna referans
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    orderedProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ordered_products', // ordered_product tablosuna referans
        key: 'orderedProductId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false,
  }
);

module.exports = Review;
