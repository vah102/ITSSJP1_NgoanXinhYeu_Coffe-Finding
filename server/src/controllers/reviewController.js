import sequelize from '../config/db.js'; // import sequelize
import Review from '../models/review.js'; // import Review model
import cloudinary from '../config/cloudinary.js';

const reviewController = {
    createReview: async (req, res) => {
        const { user_id } = req.user;
        const { store_id, rate, comment } = req.body;
        const image = req.file; 
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!store_id || !rate) {
              return res.status(400).json({ message: 'Store ID and rating are required.' });
            }
            let uploadedImageUrl = null;
            if (image) {
              const uploadResult = await cloudinary.uploader.upload(image.path, {
                folder: 'reviews', // Lưu ảnh trong thư mục "reviews"
              });
              uploadedImageUrl = uploadResult.secure_url; // URL ảnh được Cloudinary trả về
            }
      
            // Tạo mới review trong database
            const newReview = await Review.create({
              store_id,
              user_id,
              rate,
              comment,
              image: uploadedImageUrl, 
              created_at: sequelize.fn('CONVERT_TZ', sequelize.fn('NOW'), '+00:00', '+07:00') // Lưu thời gian với múi giờ VN
            });
      
            // Trả về kết quả tạo review thành công
            return res.status(201).json({
              message: 'Review created successfully!',
              review: newReview
            });
      
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating review', error: error.message });
          }
    },
};

export default reviewController;