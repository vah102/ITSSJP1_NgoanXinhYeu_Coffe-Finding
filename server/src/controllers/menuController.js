import menu from "../models/menu";

const menuController = {
    getMenuDetails: async (req, res) => {
        const { storeId } = req.params; // Lấy storeId từ request parameters

        try {
            // Gọi phương thức từ model để lấy dữ liệu
            const menuDetails = await menu.getMenuDetailsbyStoreId(storeId);

            // Kiểm tra kết quả và phản hồi
            if (menuDetails.length === 0) {
                return res.status(404).json({ message: 'No menu details found for this store.' });
            }

            return res.status(200).json(menuDetails);
        } catch (error) {
            console.error('Error in getMenuDetails:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default menuController;