import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('itss', 'root', '188102', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Tắt log nếu không cần
});

export default sequelize;
