import sequelize from '../config/db.js'; // Import kết nối từ db.js
import { DataTypes, Model } from 'sequelize'; // Thêm DataTypes
import Feature from './feature.js'; // import Feature model
import FeaturesStore from './feature_store.js'; // import FeaturesStore model
import Menu from './menu.js'; // import Menu model
import Review from './review.js'; // import Review model
const Store = sequelize.define('Store', {
  store_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Nếu bạn muốn tự động tăng
    allowNull: false,
  },
  logo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rate: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    validate: {
      min: 0.0,
      max: 5.0,
    },
  },
  min_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  banner: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  style: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
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
  time_open: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  time_close: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  map: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  latitude: {  // Cột mới cho vĩ độ
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,  // Có thể để null nếu không bắt buộc
  },
  longitude: {  // Cột mới cho kinh độ
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,  // Có thể để null nếu không bắt buộc
  },
}, {
  tableName: 'Store', // Tên bảng trong DB
  timestamps: false, // Không sử dụng createdAt, updatedAt
});
Store.belongsToMany(Feature, {
    through: FeaturesStore,
    foreignKey: 'store_id',
    otherKey: 'feature_id',
  });
  
Feature.belongsToMany(Store, {
    through: FeaturesStore,
    foreignKey: 'feature_id',
    otherKey: 'store_id',
});

Store.hasMany(Menu, { foreignKey: 'store_id' });
Store.hasMany(Review, {
  foreignKey: 'store_id', // Khóa ngoại trong bảng Review
  onDelete: 'CASCADE',    // Hành vi khi Store bị xóa
  onUpdate: 'CASCADE',    // Hành vi khi Store bị cập nhật
});

export default Store;