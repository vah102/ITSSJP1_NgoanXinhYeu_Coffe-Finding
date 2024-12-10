import Store from '../models/store.js';
import { Op } from 'sequelize';
import Feature from '../models/feature.js';
import FeaturesStore from '../models/feature_store.js';
const storeController = {
  // Lấy danh sách tất cả các cửa hàng
  getAllStores: async (req, res) => {
    try {
      const stores = await Store.findAll();
      res.json(stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Lấy danh sách các cửa hàng có rate > 4.0
  getStoresByRate: async (req, res) => {
    try {
      const stores = await Store.findAll({
        where: {
          rate: {
            [Op.gt]: 4.0,  // So sánh rating lớn hơn 4.0
          },
        },
      });
      res.json(stores);
    } catch (error) {
      console.error('Error fetching high-rated stores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getStores: async (req, res) => {
    const { searchTerm, minPrice, maxPrice, features, styles, sortOrder } = req.query;
  
    // In ra thông tin các tham số query để kiểm tra
    console.log('Request Query:', req.query); // In ra query để kiểm tra
    
    try {
      // Khởi tạo điều kiện cơ bản
      const whereCondition = {};
  
      // Điều kiện tìm kiếm cơ bản theo tên và địa chỉ
      if (searchTerm) {
        whereCondition[Op.or] = [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { address: { [Op.like]: `%${searchTerm}%` } },
        ];
        console.log('Where Condition after searchTerm:', whereCondition); // In ra điều kiện tìm kiếm sau khi thêm searchTerm
      }
  
      // Điều kiện lọc theo giá (minPrice và maxPrice)
      if (minPrice && maxPrice) {
        whereCondition.min_price = { [Op.lte]: maxPrice };  // Min price cửa hàng phải <= maxPrice
        whereCondition.max_price = { [Op.gte]: minPrice };  // Max price cửa hàng phải >= minPrice
        console.log('Where Condition after price filtering:', whereCondition); // In ra điều kiện lọc theo giá
      }
  
      // Lọc theo các style (nếu có)
      if (styles && styles.length > 0) {
        whereCondition.style = { [Op.in]: styles };  // Điều kiện style theo mảng styles
        console.log('Where Condition after style filtering:', whereCondition); // In ra điều kiện lọc theo style
      }
  
      // Lọc theo các tính năng (features_name)
      let featureCondition = {};
      if (features && features.length > 0) {
        featureCondition = { '$Features.features_name$': { [Op.in]: features } };  // Lọc theo tên tính năng
        console.log('Feature Condition:', featureCondition); // In ra điều kiện lọc theo tính năng
      }
  
      // Tìm kiếm các cửa hàng theo điều kiện tìm kiếm và lọc
      const stores = await Store.findAll({
        where: whereCondition,  // Điều kiện tìm kiếm và lọc
        include: [
          {
            model: Feature,
            through: { attributes: [] },  // Không lấy thông tin từ bảng join
            where: featureCondition,  // Điều kiện lọc theo tính năng
          },
        ],
        order: [['rate', sortOrder || 'DESC']],  // Sắp xếp theo rate
      });
  
      // In ra kết quả các cửa hàng tìm được
      console.log('Stores found:', stores); // In ra danh sách cửa hàng tìm được
  
      // Kiểm tra nếu không tìm thấy cửa hàng
      if (stores.length === 0) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      res.json(stores);
  
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }, 

  // Lấy thông tin cửa hàng theo ID
  getStoreById: async (req, res) => {
    // console.log('Request Query:', req.query);
    try {
      const { id } = req.params;
      const store = await Store.findByPk(id);

      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      res.json(store);
    } catch (error) {
      console.error('Error fetching store by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};


export default storeController;
