const User = require('./user.model');
const Category = require('./category.model');
const Product = require('./product.model');
const Order = require('./order.model');
const Cart = require('./cart.model');
const CartProduct = require('./cartProduct.model');
const Review = require('./review.model');
const OrderedProduct = require('./orderedProduct.model');
const Payment = require('./payment.model');

// User ve Product arasındaki ilişki
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Category ve Product arasındaki ilişki
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// User ve Order ilişkisi
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Order ve Product ilişkisi (Many-to-Many)
// Order ve Product ilişkisi (Many-to-Many)
Order.belongsToMany(Product, { through: 'OrderProducts', foreignKey: 'orderId', as: 'products' });
Product.belongsToMany(Order, { through: 'OrderProducts', foreignKey: 'productId', as: 'orders' });


// User ve Cart ilişkisi
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Cart ve CartProduct ilişkisi (One-to-Many)
Cart.hasMany(CartProduct, { foreignKey: 'cartId', as: 'cartProducts' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

// Product ve CartProduct ilişkisi (One-to-Many)
Product.hasMany(CartProduct, { foreignKey: 'productId', as: 'cartProducts' });
CartProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Order ve OrderedProduct ilişkisi
Order.hasMany(OrderedProduct, { foreignKey: 'orderId', as: 'orderedProducts' });
OrderedProduct.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product ve OrderedProduct ilişkisi
Product.hasMany(OrderedProduct, { foreignKey: 'productId', as: 'orderedProducts' });
OrderedProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Order.hasOne(Payment, { foreignKey: 'orderId', as: 'payment' });
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// User ve Payment ilişkisi (One-to-Many)
User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Category,
  Product,
  Order,
  Cart,
  CartProduct,
  OrderedProduct,
  Review,
  Payment 
};
