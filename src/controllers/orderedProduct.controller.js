// controllers/orderedProduct.controller.js
const { OrderedProduct } = require('../models');

const OrderedProductController = {
  // Yeni bir OrderedProduct oluştur
  async createOrderedProduct(req, res) {
    try {
      const { orderId, productId, quantity } = req.body;
      const orderedProduct = await OrderedProduct.create({ orderId, productId, quantity });
      return res.status(201).json(orderedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating ordered product' });
    }
  },

  // Tüm OrderedProduct'ları getir
  async getOrderedProducts(req, res) {
    try {
      const orderedProducts = await OrderedProduct.findAll();
      return res.status(200).json(orderedProducts);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching ordered products' });
    }
  },

  // Belirli bir OrderedProduct'ı getir
  async getOrderedProduct(req, res) {
    const { id } = req.params;
    try {
      const orderedProduct = await OrderedProduct.findByPk(id);
      if (!orderedProduct) {
        return res.status(404).json({ error: 'Ordered product not found' });
      }
      return res.status(200).json(orderedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching ordered product' });
    }
  },

  // OrderedProduct güncelle
  async updateOrderedProduct(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const orderedProduct = await OrderedProduct.findByPk(id);
      if (!orderedProduct) {
        return res.status(404).json({ error: 'Ordered product not found' });
      }
      orderedProduct.quantity = quantity;
      await orderedProduct.save();
      return res.status(200).json(orderedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating ordered product' });
    }
  },

  // OrderedProduct sil
  async deleteOrderedProduct(req, res) {
    const { id } = req.params;
    try {
      const orderedProduct = await OrderedProduct.findByPk(id);
      if (!orderedProduct) {
        return res.status(404).json({ error: 'Ordered product not found' });
      }
      await orderedProduct.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting ordered product' });
    }
  },
};

module.exports = OrderedProductController;
