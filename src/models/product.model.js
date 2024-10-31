const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Primary key olarak tanımlıyoruz
      autoIncrement: true, // Otomatik artan
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // User modeline referans
        key: 'id', // Kullanıcı ID'si
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories', // Category modeline referans
        key: 'categoryId', // Kategori ID'si
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING, // Görsel URL'si için
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Varsayılan stok değeri
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products', // Veritabanı tablosu
    timestamps: true, // Oluşturulma ve güncellenme tarihleri
  }
);

module.exports = Product;
