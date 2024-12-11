import Store from '../models/store.js';
import { Op } from 'sequelize';
import Feature from '../models/feature.js';
import FeaturesStore from '../models/feature_store.js';
import Blacklist from '../models/blacklist.js';
import Blacklist_detail from '../models/blacklist_detail.js';
import Menu from '../models/menu.js';
import MenuDetail from '../models/menu_detail.js';

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
  getStoresByRate : async (req, res) => {
    try {
      let whereCondition = {
        rate: {
          [Op.gt]: 4.0,  // So sánh rating lớn hơn 4.0
        },
      };
  
      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (req.user) {
        // Nếu đã đăng nhập, lọc các cửa hàng không có trong blacklist
        const blacklist = await Blacklist.findOne({
          where: {
            user_id: req.user.user_id, // Giả sử `req.user.user_id` là id người dùng trong JWT
          },
        });
  
        if (blacklist) {
          // Tìm danh sách các cửa hàng bị blacklist của người dùng
          const blacklistedStores = await Blacklist_detail.findAll({
            where: {
              blacklist_id: blacklist.blacklist_id,
            },
            attributes: ['store_id'],
          });
  
          const blacklistedStoreIds = blacklistedStores.map(entry => entry.store_id);
  
          // Thêm điều kiện vào truy vấn để loại bỏ các cửa hàng bị blacklist
          whereCondition.store_id = {
            [Op.notIn]: blacklistedStoreIds,
          };
        }
      }
  
      // Truy vấn cửa hàng với điều kiện đã xác định
      const stores = await Store.findAll({
        where: whereCondition,
      });
  
      res.json(stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getStores : async (req, res) => {
    const { searchTerm, minPrice, maxPrice, features, styles, sortOrder } = req.query;

    console.log('Request Query:', req.query); // In ra query để kiểm tra

    try {
        const whereCondition = {};

        // Điều kiện tìm kiếm cơ bản theo tên và địa chỉ
        if (searchTerm) {
            whereCondition[Op.or] = [
                { name: { [Op.like]: `%${searchTerm}%` } },
                { address: { [Op.like]: `%${searchTerm}%` } },
            ];
            console.log('Where Condition after searchTerm:', whereCondition);
        }

        // Điều kiện lọc theo giá (minPrice và maxPrice)
        if (minPrice && maxPrice) {
            whereCondition.min_price = { [Op.lte]: maxPrice };
            whereCondition.max_price = { [Op.gte]: minPrice };
        }

        // Lọc theo các style (nếu có)
        if (styles && Array.isArray(styles) && styles.length > 0) {
            whereCondition.style = { [Op.in]: styles };
        }

        // Lọc theo các tính năng (features_name)
        let featureCondition = {};
        if (features && Array.isArray(features) && features.length > 0) {
            featureCondition = { '$Features.features_name$': { [Op.in]: features } };
        }

        // Nếu người dùng đã đăng nhập, lọc bỏ các cửa hàng trong blacklist
        let excludeStoreIds = [];
        if (req.user) {
            console.log('User info:', req.user); // Log thông tin người dùng

            // Lấy danh sách store_id trong blacklist của user
            const blacklistDetails = await Blacklist_detail.findAll({
                attributes: ['store_id'],
                include: [{
                    model: Blacklist,
                    where: { user_id: req.user.user_id }, // Chỉ lấy blacklist của user hiện tại
                }],
            });

            // Trích xuất store_id để loại trừ
            excludeStoreIds = blacklistDetails.map(detail => detail.store_id);
            console.log('Excluded store IDs:', excludeStoreIds);
        }

        // Tìm kiếm các cửa hàng theo điều kiện tìm kiếm và lọc
        const stores = await Store.findAll({
            where: {
                ...whereCondition,
                store_id: { [Op.notIn]: excludeStoreIds }, // Loại bỏ các store_id trong blacklist
            },
            include: [
                {
                    model: Feature,
                    through: { attributes: [] },
                    where: featureCondition,
                },
            ],
            order: [['rate', sortOrder || 'DESC']],
        });

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
  getStoreDetails: async (req, res) => {
    const { store_id } = req.params; // Lấy store_id từ URL params
  
    try {
      // Tìm kiếm Store, Features, Menu, và MenuDetails liên quan
      const store = await Store.findOne({
        where: { store_id }, // Điều kiện tìm kiếm theo store_id
        include: [
          {
            model: Feature, // Kết nối với bảng Feature
            through: { attributes: [] }, // Không lấy thông tin từ bảng join
          },
          {
            model: Menu, // Kết nối với bảng Menu
            include: [
              {
                model: MenuDetail, // Kết nối với bảng MenuDetail qua Menu
                attributes: ['id', 'dish_name', 'dish_price', 'dish_image', 'description'], // Chọn các trường cần thiết
              },
            ],
          },
        ],
      });
  
      // Kiểm tra nếu không tìm thấy store
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      // Trả về thông tin store, features, menu, và chi tiết menu liên quan
      res.json(store);
    } catch (error) {
      console.error('Error fetching store details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};


export default storeController;
