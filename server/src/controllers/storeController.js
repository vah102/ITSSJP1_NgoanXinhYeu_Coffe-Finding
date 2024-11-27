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
      const stores = await store.getAll();
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTrendingStores: async (req, res) => {
    try {
      const stores = await store.getByHighRate();
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  sortByRate: async (req, res) => {
    try {
      const stores = await store.sortByHighRate();
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchStores: async (req, res) => {
    try {
      const { keyword } = req.query; // Lấy keyword từ query string
      if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' });
      }
      const stores = await store.search(keyword);
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  filterStores: async (req, res) => {
    try {
      const { min_price, max_price, style, feature } = req.query; 

      const styleArray = style ? style.split(',') : [];
      const featureArray = feature ? feature.split(',') : [];
      const filters = { 
        min_price, 
        max_price, 
        style: styleArray, 
        feature: featureArray,
      }; // Đóng gói vào object filters
      const stores = await store.filter(filters); // Gọi model để lọc dữ liệu
      res.status(200).json(stores); // Trả về kết quả lọc
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default storeController;

