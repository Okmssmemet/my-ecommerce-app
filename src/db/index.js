const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eticaretdb', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging:false
});

const initDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Veritabanına başarıyla bağlandı.');
  
      await sequelize.sync(); // Modeli veritabanı ile senkronize et
      console.log('Model veritabanı ile senkronize edildi.');
    } catch (error) {
      console.error('Veritabanı bağlantı hatası:', error);
    }
  };
  
  initDatabase();
  
  module.exports = sequelize;
