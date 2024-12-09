import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = '0de44539cf24170fc1500506fc3376b8e7de9b618a89e57611d7f2fd3b0b591c07ff4b6730f04f89d1df81301ed90a7617145dcebb4765f614f843097f68a6bc'; // Secret key để tạo JWT

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Sử dụng import động để tránh lỗi vòng lặp và tránh khai báo trùng tên
            const { default: userModel } = await import('../models/user.js');  // Đổi tên thành userModel

            // Lấy người dùng từ cơ sở dữ liệu
            const users = await userModel.getByUsernameAndPassword(username, password);

            if (users.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = users[0]; // Giả sử bạn chỉ nhận một user

            // Tạo JWT token
            const token = jwt.sign(
                { id: user.user_id, username: user.username },
                JWT_SECRET_KEY,
                { expiresIn: '1h' }  // Token sẽ hết hạn sau 1 giờ
            );

            // Trả về token cho người dùng
            res.json({ message: 'Login successful', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default authController;
