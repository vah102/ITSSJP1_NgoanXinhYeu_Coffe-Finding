import User from "../models/user";

const userController = {
    getUserProfile: async (req, res) => {
        try {
            const { user_id } = req.user;

            if (!user_id) {
                return res.status(400).json({ message: 'User ID not found in the request' });
            }

            const user = await User.findOne({
                where: { user_id: user_id },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Error fetching user profile' });
        }
    },

    // Cập nhật thông tin người dùng
    updateUserProfile: async (req, res) => {
    const { user_id } = req.user;
    const { username, first_name, last_name, phone, gmail } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID not found in the request' });
    }

    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ where: { user_id } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Cập nhật thông tin người dùng
      user.username = username || user.username;
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.phone = phone || user.phone;
      user.gmail = gmail || user.gmail;

      // Lưu các thay đổi
      await user.save();

      res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  },
};

export default userController;