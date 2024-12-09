import BlacklistModel from '../models/blacklist.js';

const BlacklistController = {
    // Lấy danh sách quán ăn bị blacklist
    getBlacklistedStores: async (req, res) => {
        const user_id = req.user.id;  // Giả sử bạn đã xác thực người dùng và lấy id người dùng từ token

        try {
            const stores = await BlacklistModel.getBlacklistedStores(user_id);
            res.json(stores);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching blacklisted stores' });
        }
    },

    // Thêm quán ăn vào blacklist
    addStoreToBlacklist: async (req, res) => {
        const storeId = req.params.storeId;  // Lấy storeId từ URL params
        const userId = req.user.id;          // Lấy userId từ thông tin xác thực trong req.user

        console.log(`User ID: ${userId}`);
        console.log(`Store ID: ${storeId}`);

        try {
            const result = await BlacklistModel.addStoreToBlacklist(userId, storeId);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error adding store to blacklist' });
        }
    },

    // Xóa quán ăn khỏi blacklist
    removeStoreFromBlacklist: async (req, res) => {
        const  store_id  = req.params.storeId;  // Lấy store_id từ URL params
        const user_id = req.user.id;  // Lấy user_id từ token
        console.log(`User ID: ${user_id}`);
        console.log(`Store ID: ${store_id}`);

        try {
            const result = await BlacklistModel.removeStoreFromBlacklist(user_id, store_id);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error removing store from blacklist' });
        }
    }
};

export default BlacklistController;
