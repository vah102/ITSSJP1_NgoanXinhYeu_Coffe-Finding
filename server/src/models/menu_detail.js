import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import kết nối database
import Menu from './menu.js'; // Import Menu model

const MenuDetail = sequelize.define('MenuDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Tự động tăng
    allowNull: false,
  },
  menu_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu, // Quan hệ với bảng Menu
      key: 'menu_id',
    },
  },
  dish_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dish_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dish_image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'MenuDetail',
  timestamps: false, // Không sử dụng các trường createdAt, updatedAt
});

MenuDetail.belongsTo(Menu, { foreignKey: 'menu_id' });
Menu.hasMany(MenuDetail, { foreignKey: 'menu_id' });

export default MenuDetail;
