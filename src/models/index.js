const User = require('./user.model');
const Category = require('./category.model');
const Product = require('./product.model');

// User ve Product arasındaki ilişki
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Category ve Product arasındaki ilişki
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  User,
  Category,
  Product,
};