const { Order, Product, User } = require('../models');
const APIError = require("../utils/errors");
const Response = require("../utils/response");

class OrderController {
  // Yeni bir sipariş oluştur
  async createOrder(req, res) {
    try {
      const { productIds, totalAmount } = req.body; // Siparişteki ürünlerin ID'leri ve toplam tutar
      const userId = req.user.id; // Giriş yapan kullanıcının ID'si

      // Siparişi oluştur
      const newOrder = await Order.create({
        userId,
        totalAmount,
      });

      // Sipariş ile ürünleri ilişkilendir (Many-to-Many)
      await newOrder.addProducts(productIds);

      return new Response(newOrder, 'Sipariş başarıyla oluşturuldu.').created(res);
    } catch (error) {
      console.error('Error creating order:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Satıcının ürünlerine ait tüm siparişleri getir
  async getSellerOrders(req, res) {
    try {
      const sellerId = req.user.id; // Giriş yapan kullanıcının ID'si (satıcı)

      // Satıcının sahip olduğu ürünleri bul
      const sellerProducts = await Product.findAll({
        where: { userId: sellerId },
        attributes: ['productId'], // Sadece productId bilgisine ihtiyacımız var
      });

      // Eğer satıcının ürünü yoksa, boş bir dizi döndür
      if (sellerProducts.length === 0) {
        return new Response([], 'Henüz satış yapılmış bir ürününüz bulunmuyor.').success(res);
      }

      // Satıcı ürünlerinin productId'lerini al
      const productIds = sellerProducts.map(product => product.productId);

      // Satıcının ürünlerine ait siparişleri bul
      const orders = await Order.findAll({
        include: [
          {
            model: Product,
            as: 'products',
            where: { productId: productIds },
            required: true // Sadece satıcının ürünlerini içeren siparişleri getir
          },
          { model: User, as: 'user' }
        ],
      });

      return new Response(orders, 'Siparişler başarıyla getirildi.').success(res);
    } catch (error) {
      console.error('Error fetching seller orders:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Kullanıcının kendi siparişlerini getir
  async getUserOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: Product, as: 'products' }],
      });

      return new Response(orders, 'Siparişler başarıyla getirildi.').success(res);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Belirli bir siparişi getir (yalnızca sipariş sahibi veya ilgili satıcı erişebilir)
  async getOrderById(req, res) {
    try {
      const orderId = req.params.orderId;
      const userId = req.user.id;  // Giriş yapan kullanıcının ID'si
      const userRole = req.user.role;

      const order = await Order.findOne({
        where: { orderId },
        include: [
          { model: Product, as: 'products' },
          { model: User, as: 'user', attributes: ['id', 'name'] }
        ],
      });

      if (!order) {
        throw new APIError('Sipariş bulunamadı.', 404);
      }

      // Sipariş sahibi veya satıcı olup olmadığını kontrol et
      const isOwner = order.userId === userId;
      const isSeller = order.products.some(product => product.userId === userId);

      if (!isOwner && !(isSeller && userRole === 'seller')) {
        return new Response(null, 'Bu siparişi görüntüleme yetkiniz yok.').error403(res);
      }

      return new Response(order, 'Sipariş başarıyla getirildi.').success(res);
    } catch (error) {
      console.error('Error fetching order:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }

  // Sipariş durumunu güncelle
  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.orderId;
      const { status } = req.body;

      const order = await Order.findOne({ where: { orderId } });
      if (!order) {
        throw new APIError('Sipariş bulunamadı.', 404);
      }

      await order.update({ status });

      return new Response(order, 'Sipariş durumu başarıyla güncellendi.').success(res);
    } catch (error) {
      console.error('Error updating order status:', error);
      return new Response(null, 'Bir hata oluştu.').error500(res);
    }
  }
}

module.exports = new OrderController();
