import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Import kết nối Sequelize từ `db.js`

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Tự động tăng giá trị
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  gmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true, // Đảm bảo định dạng email hợp lệ
    },
  },
}, {
  tableName: 'User', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Không sử dụng createdAt và updatedAt
});

export default User;
