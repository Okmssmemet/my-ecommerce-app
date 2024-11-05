const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST || 'db',
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
