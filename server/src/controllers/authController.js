import User from '../models/user.js'; // Import User Model
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_jwt_secret_key'; // Thay bằng key thực tế

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Kiểm tra thông tin người dùng
      const user = await User.findOne({
        where: { username, password },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Tạo JWT token
      const token = jwt.sign(
        { user_id: user.user_id, username: user.username }, // Payload
        SECRET_KEY, // Secret key
        { expiresIn: '1h' } // Token hết hạn sau 1 giờ
      );

      // Đặt token vào cookie
      res.cookie('token', token);

      return res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default authController;

