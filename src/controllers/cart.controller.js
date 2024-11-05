const { Cart, CartProduct, Product } = require('../models');
const APIError = require("../utils/errors");
const Response = require("../utils/response");

class CartController {
  // Yeni bir alışveriş sepeti oluştur
  async createCart(req, res) {
    try {
      const userId = req.user.id; // tokenCheck middleware'den alınan userId

      const newCart = await Cart.create({
        userId,
        dateCreated: new Date(),
      });

      return new Response(newCart, 'Sepet başarıyla oluşturuldu.').created(res);
    } catch (error) {
      console.error('Error creating cart:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Sepete ürün ekle
  async addProductToCart(req, res) {
    try {
      const { cartId, productId, quantity } = req.body;

      // Ürünü sepete eklerken mevcut bir kaydı kontrol edin
      const existingCartProduct = await CartProduct.findOne({ where: { cartId, productId } });
      if (existingCartProduct) {
        // Eğer ürün zaten sepette varsa, sadece miktarını güncelleyin
        existingCartProduct.quantity += quantity;
        await existingCartProduct.save();

        return new Response(existingCartProduct, 'Ürün sepete başarıyla eklendi.').success(res);
      }

      const cartProduct = await CartProduct.create({ cartId, productId, quantity });

      return new Response(cartProduct, 'Ürün sepete başarıyla eklendi.').created(res);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Kullanıcının sepetini getir
  async getCart(req, res) {
    try {
      const userId = req.user.id;
  
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartProduct,
            as: 'cartProducts',
            include: [{ model: Product, as: 'product' }], // Ürün bilgilerini de dahil edin
          },
        ],
      });
  
      if (!cart) {
        throw new APIError('Sepet bulunamadı.', 404);
      }
  
      return new Response(cart, 'Sepet başarıyla getirildi.').success(res);
    } catch (error) {
      console.error('Error fetching cart:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }
}

module.exports = new CartController();
