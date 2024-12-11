import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Đảm bảo đường dẫn đúng với file config database
import Store from './store.js'; // Import model Store
import Blacklist from './blacklist.js'; // Import model Blacklist

const Blacklist_detail = sequelize.define('Blacklist_detail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Đảm bảo cột tự tăng
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blacklist_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Blacklist_detail',
  timestamps: false, // Không sử dụng createdAt và updatedAt
});

// Định nghĩa các mối quan hệ
Blacklist_detail.belongsTo(Store, { foreignKey: 'store_id' });
// Blacklist_detail.belongsTo(Blacklist, { foreignKey: 'blacklist_id' });
Store.hasMany(Blacklist_detail, { foreignKey: 'store_id', as: 'Blacklist_details' });
export default Blacklist_detail;
