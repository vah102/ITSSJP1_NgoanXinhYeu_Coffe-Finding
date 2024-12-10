// models/Feature.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // import pool connection

const Feature = sequelize.define('Feature', {
  feature_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  features_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'Features',
  timestamps: false, // Bảng này không có các trường `createdAt`, `updatedAt`
});

export default Feature;
