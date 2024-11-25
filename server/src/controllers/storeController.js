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
  }

};

export default storeController;

