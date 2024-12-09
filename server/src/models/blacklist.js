import db from '../config/db.js'; // Giả sử db.js là nơi chứa pool kết nối MySQL

const BlacklistModel = {
    // Lấy danh sách các quán ăn đã bị blacklist bởi người dùng
    getBlacklistedStores: async (user_id) => {
        const [rows] = await db.execute(`
            SELECT Store.store_id, Store.name
            FROM Store
            JOIN Blacklist_detail ON Store.store_id = Blacklist_detail.store_id
            JOIN Blacklist ON Blacklist_detail.blacklist_id = Blacklist.blacklist_id
            WHERE Blacklist.user_id = ?`, [user_id]);
        return rows;
    },

    // Thêm quán ăn vào blacklist của người dùng
    addStoreToBlacklist: async (userId, storeId) => {
        try {
            // Kiểm tra xem userId đã có trong blacklist chưa
            const [existingBlacklist] = await db.query('SELECT * FROM Blacklist WHERE user_id = ?', [userId]);
            console.log('Existing blacklist:', existingBlacklist);  // Debug log
    
            if (existingBlacklist.length === 0) {
                // Nếu chưa có, tạo mới blacklist entry cho user
                const [result] = await db.query('INSERT INTO Blacklist (user_id) VALUES (?)', [userId]);
                console.log('Insert result:', result);  // Debug log
                const blacklistId = result.insertId;
    
                // Sau đó thêm store vào blacklist_detail
                const [blacklistDetailResult] = await db.query('INSERT INTO Blacklist_detail (store_id, blacklist_id) VALUES (?, ?)', [storeId, blacklistId]);
                console.log('Blacklist detail result:', blacklistDetailResult);  // Debug log
            } else {
                // Nếu đã có blacklist, chỉ cần thêm store vào blacklist_detail
                const [blacklist] = existingBlacklist;
                const blacklistId = blacklist.blacklist_id;
                console.log('Existing blacklistId:', blacklistId);  // Debug log
    
                const [blacklistDetailResult] = await db.query('INSERT INTO Blacklist_detail (store_id, blacklist_id) VALUES (?, ?)', [storeId, blacklistId]);
                console.log('Blacklist detail result:', blacklistDetailResult);  // Debug log
            }
        } catch (error) {
            console.error('Error adding store to blacklist:', error);  // Log lỗi
            throw new Error('Error adding store to blacklist');
        }
    },
    

    // Xóa quán ăn khỏi blacklist của người dùng
    removeStoreFromBlacklist: async (user_id, store_id) => {
        // Lấy blacklist_id của người dùng
        const [blacklistResult] = await db.execute('SELECT blacklist_id FROM Blacklist WHERE user_id = ?', [user_id]);

        if (blacklistResult.length === 0) {
            return { message: 'No blacklist found for this user' };
        }

        const blacklist_id = blacklistResult[0].blacklist_id;

        // Xóa quán ăn khỏi blacklist
        await db.execute('DELETE FROM Blacklist_detail WHERE blacklist_id = ? AND store_id = ?', [blacklist_id, store_id]);
        return { message: 'Store removed from blacklist' };
    }
};

export default BlacklistModel;
