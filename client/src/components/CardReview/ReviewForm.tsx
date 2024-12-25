import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

type ReviewFormProps = {
  username: string; // Tên người dùng
  avatar: string; // Avatar người dùng
  store_id: string; // ID của cửa hàng
  onSubmit: (rating: number, comment: string, photo: string | null) => void; // Hàm submit đánh giá
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  username,
  avatar,
  store_id,
  onSubmit,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // Kiểm tra trạng thái của form (đóng/mở)
  const [rating, setRating] = useState<number>(0); // Lưu rating của người dùng
  const [comment, setComment] = useState<string>(""); // Lưu comment của người dùng
  const [photo, setPhoto] = useState<string | null>(null); // Lưu ảnh (nếu có)

  // Xử lý khi người dùng thay đổi rating (sao)
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  // Xử lý khi người dùng thay đổi comment
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Xử lý khi người dùng thêm ảnh
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setPhoto(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Xử lý khi người dùng gửi đánh giá
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      console.error("Rating and comment are required.");
      return; // Không gửi yêu cầu khi rating hoặc comment trống
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/review/create",
        {
          store_id, // Lấy store_id từ prop
          rate: rating, // Lấy rating từ state
          comment: comment, // Lấy comment từ state
          image: photo || null, // Lấy ảnh từ state (có thể null nếu không có ảnh)
        },
        { withCredentials: true }
      );
      console.log("Review submitted:", response.data);
      // Reset form sau khi submit
      setRating(0);
      setComment("");
      setPhoto(null);
      setIsFormOpen(false); // Đóng form sau khi gửi
    } catch (error) {
      console.error("Error submitting review:");
    }
  };

  // Lấy ngày hiện tại
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="p-4 border rounded-lg shadow-md flex gap-60">
      {/* Hiển thị avatar, tên người dùng */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="user avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h3 className="text-2xl font-semibold pb-2">{username}</h3>
            <p className="text-xl text-gray-500">{currentDate}</p>
          </div>
        </div>
      </div>
      {/* Phần ngôi sao đánh giá và "Start Your Review" */}
      <div className="flex flex-col items-start gap-2 pl-60">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
              size="lg"
              onClick={() => handleStarClick(index)} // Xử lý click để thay đổi rating
            />
          ))}
        </div>

        {/* Dòng chữ "Start Your Review" */}
        <button
          className="text-[#57370E] font-semibold"
          onClick={() => setIsFormOpen(true)} // Mở form khi nhấn "Start your review"
        >
          Start Your Review
        </button>
      </div>

      {/* Modal (popup) khi mở form review */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[480px]">
            <div className="flex justify-end items-center">
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsFormOpen(false)} // Đóng form khi nhấn vào dấu X
              />
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }
                  size="lg"
                  onClick={() => handleStarClick(index)} // Xử lý click để thay đổi rating
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your review..."
              className="w-full p-2 border rounded-lg mb-4"
              rows={4}
            />

            <div className="flex items-center gap-2 mb-4">
              <label
                htmlFor="photo"
                className="flex items-center text-[#57370E] cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} className="mr-2 text-[#57370E]" />
                Add Photo
              </label>
              <input
                type="file"
                id="photo"
                className="hidden"
                accept="image/*"
                onChange={handleAddPhoto}
              />
              {photo && (
                <img
                  src={photo}
                  alt="Preview"
                  className="w-16 h-16 object-cover"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#57370E] text-white py-2 rounded-lg hover:bg-[#4F310D] transition"
              disabled={rating === 0 || comment.trim() === ""}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;