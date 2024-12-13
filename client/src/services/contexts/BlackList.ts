// src/services/blacklistService.ts
import axios from 'axios';

// Đảm bảo bạn đã cài đặt axios: npm install axios

const API_URL = 'http://localhost:3000/api/blacklist'; 

// Lấy dữ liệu blacklist của người dùng
export const getUserBlacklist = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      withCredentials: true,
    });
    return response.data; // Trả về dữ liệu blacklist
  } catch (error) {
    throw new Error('Failed to fetch blacklist');
  }
};

// // Thêm store vào blacklist
// export const addStoreToBlacklist = async (token: string, storeId: number) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/add`,
//       { store_id: storeId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data; // Trả về dữ liệu blacklist detail mới được thêm
//   } catch (error) {
//     throw new Error('Failed to add store to blacklist');
//   }
// };

// Xóa store khỏi blacklist
export const removeStoreFromBlacklist = async (token: string, storeId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { store_id: storeId },  // Gửi tham số store_id trong body
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    throw new Error('Failed to remove store from blacklist');
  }
};


