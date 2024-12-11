import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Đảm bảo đường dẫn đúng với file config database
import User from './user.js';
import Blacklist_detail from './blacklist_detail.js';
 // Import model Blacklist_detail   

const Blacklist = sequelize.define('Blacklist', {
  blacklist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Thêm auto increment
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true, // Đảm bảo user_id là duy nhất
    allowNull: false,
  },
}, {
  tableName: 'Blacklist',
  timestamps: false, // Không sử dụng createdAt và updatedAt
});
Blacklist.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
Blacklist.hasMany(Blacklist_detail, { foreignKey: 'blacklist_id', as: 'Blacklist_details' });
export default Blacklist;
