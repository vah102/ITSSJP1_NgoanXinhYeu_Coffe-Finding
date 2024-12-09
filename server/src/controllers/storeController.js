// export const getStores = async (req, res) => {
//     console.log(req.query);
// };

// export const getStoresById = async (req, res) => {
//     console.log(req.query);
// };
import store from '../models/store.js';

const storeController = {
  getStores: async (req, res) => {
    try {
      const userId = req.user.id;  // Lấy userId từ token
      const stores = await store.getAll(userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getStoresById: async (req, res) => {
    try {
      const { storeId } = req.params;
      const userId = req.user.id;  // Lấy userId từ token
      const storeDetails = await store.getById(storeId, userId);  // Truyền userId vào
      if (storeDetails.length === 0) {
        return res.status(404).json({ message: 'Store not found' });
      }
      res.status(200).json(storeDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTrendingStores: async (req, res) => {
    try {
      const userId = req.user.id;  // Lấy userId từ token
      const stores = await store.getByHighRate(userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  sortByRate: async (req, res) => {
    try {
      const userId = req.user.id;  // Lấy userId từ token
      const stores = await store.sortByHighRate(userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchStores: async (req, res) => {
    try {
      const { keyword } = req.query;
      const userId = req.user.id;  // Lấy userId từ token
      if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' });
      }
      const stores = await store.search(keyword, userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  filterStores: async (req, res) => {
    try {
      const { min_price, max_price, style, feature } = req.query;
      const userId = req.user.id;  // Lấy userId từ token
      const styleArray = style ? style.split(',') : [];
      const featureArray = feature ? feature.split(',') : [];
      const filters = { 
        min_price, 
        max_price, 
        style: styleArray, 
        feature: featureArray,
      };
      const stores = await store.filter(filters, userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchAndFilterStores: async (req, res) => {
    try {
      const { keyword, min_price, max_price, style, feature, sortOption } = req.query;
      const userId = req.user.id;  // Lấy userId từ token
  
      const styleArray = style ? style.split(",") : [];
      const featureArray = feature ? feature.split(",") : [];
      const filters = {
        min_price,
        max_price,
        style: styleArray,
        feature: featureArray,
      };
  
      const stores = await store.searchAndFilter(keyword, filters, sortOption, userId);  // Truyền userId vào
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default storeController;

