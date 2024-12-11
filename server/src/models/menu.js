import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import kết nối database
import Store from './store.js'; // Import Store model

const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Tự động tăng
    allowNull: false,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Store, // Quan hệ với bảng Store
      key: 'store_id',
    },
  },
}, {
  tableName: 'Menu',
  timestamps: false, // Không sử dụng các trường createdAt, updatedAt
});

// Menu.belongsTo(Store, { foreignKey: 'store_id' }); // Thiết lập quan hệ với Store

export default Menu;
