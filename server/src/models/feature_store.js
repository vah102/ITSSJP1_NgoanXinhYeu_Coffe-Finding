// models/FeaturesStore.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // import pool connection

const FeaturesStore = sequelize.define('FeaturesStore', {
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Store', // Quan hệ với bảng Store
      key: 'store_id',
    },
  },
  feature_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Feature', // Quan hệ với bảng Feature
      key: 'feature_id',
    },
  },
}, {
  tableName: 'Features_store',
  timestamps: false, // Bảng này không có các trường `createdAt`, `updatedAt`
});

export default FeaturesStore;
