import Blacklist from '../models/blacklist.js'; // Import model Blacklist
import Blacklist_detail from '../models/blacklist_detail.js'; // Import model Blacklist_detail
import Store from '../models/store.js'; // Import model Store
import User from '../models/user.js'; // Import model User

const blacklistController = {
    getUserBlacklist : async (req, res) => {
        try {
            const { user_id } = req.user;
    
            if (!user_id) {
                return res.status(400).json({ message: 'User ID not found in the request' });
            }
    
            const blacklist = await Blacklist.findOne({
                where: { user_id: user_id },
                include: {
                    model: Blacklist_detail,
                    as: 'Blacklist_details',  // Alias đúng với định nghĩa trong association
                    include: {
                        model: Store,
                        as: 'Store',  // Alias đúng với định nghĩa trong association
                    },
                },
            });
    
            if (!blacklist) {
                return res.status(404).json({ message: 'Blacklist not found' });
            }
    
            res.json(blacklist);
        } catch (error) {
            console.error('Error fetching blacklist:', error);
            res.status(500).json({ message: 'Error fetching blacklist' });
        }
    },
    addStoreToBlacklist: async (req, res) => {
        try {
            const { user_id } = req.user; // Lấy user_id từ token trong req.user
            const { store_id } = req.body; // Lấy store_id từ request body
    
            if (!store_id) {
                return res.status(400).json({ message: 'Store ID is required' });
            }
    
            // Tìm blacklist của user dựa trên user_id
            let blacklist = await Blacklist.findOne({
                where: { user_id: user_id },
            });
    
            if (!blacklist) {
                // Nếu blacklist chưa tồn tại, tạo mới một blacklist
                blacklist = await Blacklist.create({
                    user_id: user_id,
                });
            }
    
            // Kiểm tra lại giá trị blacklist.blacklist_id
            if (!blacklist.blacklist_id) {
                return res.status(500).json({ message: 'Failed to retrieve blacklist ID' });
            }
    
            // Kiểm tra store_id đã tồn tại trong blacklist_detail chưa
            const existingEntry = await Blacklist_detail.findOne({
                where: {
                    blacklist_id: blacklist.blacklist_id,
                    store_id: store_id,
                },
            });
    
            if (existingEntry) {
                return res.status(409).json({ message: 'Store is already in the blacklist' });
            }
    
            // Thêm store vào blacklist_detail
            const blacklistDetail = await Blacklist_detail.create({
                blacklist_id: blacklist.blacklist_id,  // Sử dụng blacklist.blacklist_id
                store_id: store_id,
            });
    
            res.status(201).json({ message: 'Store added to blacklist successfully', blacklistDetail });
        } catch (error) {
            console.error('Error adding store to blacklist:', error);
            res.status(500).json({ message: 'Error adding store to blacklist' });
        }
    },
    
     // Hàm xóa store khỏi blacklist của người dùng
     removeStoreFromBlacklist: async (req, res) => {
        try {
            const { user_id } = req.user; // Lấy user_id từ token trong req.user
            const { store_id } = req.body; // Lấy store_id từ request body

            if (!store_id) {
                return res.status(400).json({ message: 'Store ID is required' });
            }

            // Tìm blacklist của user dựa trên user_id
            const blacklist = await Blacklist.findOne({
                where: { user_id: user_id },
            });

            if (!blacklist) {
                return res.status(404).json({ message: 'Blacklist not found' });
            }

            // Tìm blacklist_detail dựa trên blacklist_id và store_id
            const blacklistDetail = await Blacklist_detail.findOne({
                where: {
                    blacklist_id: blacklist.blacklist_id,
                    store_id: store_id,
                },
            });

            if (!blacklistDetail) {
                return res.status(404).json({ message: 'Store not found in blacklist' });
            }

            // Xóa store khỏi blacklist_detail
            await blacklistDetail.destroy();

            res.status(200).json({ message: 'Store removed from blacklist successfully' });
        } catch (error) {
            console.error('Error removing store from blacklist:', error);
            res.status(500).json({ message: 'Error removing store from blacklist' });
        }
    },
};
export default blacklistController;
