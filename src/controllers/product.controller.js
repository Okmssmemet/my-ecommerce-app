const { Product } = require('../models'); 

class ProductController {

  // Tüm ürünleri getir
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll(); 
      return res.status(200).json(products); 
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Kategoriye göre ürünleri getir
  async getAllProductByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const products = await Product.findAll({
        where: { categoryId: categoryId }, // categoryId'ye göre filtreleme
      });

      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bu kategoriye ait ürün bulunamadı.',
        });
      }

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Bir hata oluştu.',
      });
    }
  }

  // Ürün ekleme

  async addProduct(req, res) {
    try {
      const { name, description, image, stock, categoryId } = req.body;
      const userId = req.user.id; // Giriş yapan kullanıcının ID'si

      const newProduct = await Product.create({
        name,
        description,
        image,
        stock,
        userId,
        categoryId,
      });

      return res.status(201).json({
        success: true,
        data: newProduct,
        message: 'Ürün başarıyla eklendi.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Bir hata oluştu.',
      });
    }
  }
  // Ürün silme
  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId;

      // Ürünü bul
      const product = await Product.findOne({ where: { productId } });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Ürün bulunamadı.',
        });
      }

      // Kullanıcının ürünü silme yetkisini kontrol et
      if (product.userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Bu ürünü silmek için yetkiniz yok.',
        });
      }

      await product.destroy();

      return res.status(200).json({
        success: true,
        message: 'Ürün başarıyla silindi.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Bir hata oluştu.',
      });
    }
  }

  // Ürün güncelleme
  async updateProduct(req, res) {
    try {
      const productId = req.params.productId;
      const { name, description, image, stock, categoryId } = req.body;

      // Ürünü bul
      const product = await Product.findOne({ where: { productId } });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Ürün bulunamadı.',
        });
      }

      // Kullanıcının ürünü güncelleme yetkisini kontrol et
      if (product.userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Bu ürünü güncellemek için yetkiniz yok.',
        });
      }

      // Ürünü güncelle
      await product.update({
        name,
        description,
        image,
        stock,
        categoryId,
      });

      return res.status(200).json({
        success: true,
        data: product,
        message: 'Ürün başarıyla güncellendi.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Bir hata oluştu.',
      });
    }
  }

  // Giriş yapan satıcının ürünlerini listeleme
  async getProductsBySeller(req, res) {
    try {
      const userId = req.user.id; // Giriş yapan kullanıcının ID'si

      const products = await Product.findAll({
        where: { userId },
      });

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Bir hata oluştu.',
      });
    }
  }
}

module.exports = new ProductController();
