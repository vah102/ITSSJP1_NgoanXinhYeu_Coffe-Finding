import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Store from '../models/store.js';
import User from '../models/user.js';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Store', // Tên model liên kết
      key: 'store_id', // Khóa liên kết trong bảng Store
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Tên model liên kết
      key: 'user_id', // Khóa liên kết trong bảng User
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5, // Giả định rate là từ 1-5
    },
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'Review',
  timestamps: false, // Nếu bảng không có createdAt và updatedAt
});

// Quan hệ với bảng Store
  
  // Quan hệ với bảng User
  Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

export default Review;
