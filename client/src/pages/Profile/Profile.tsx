import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho thông tin người dùng
export interface UserProfile {
    user_id: number;
    username: string;
    avatar: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    gmail: string;
}

export default function Profile() {
    const [formData, setFormData] = useState<UserProfile | null>(null); // Dữ liệu người dùng
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Tệp ảnh được chọn

    // Lấy dữ liệu từ API khi component được render
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/user/profile") // Thay bằng endpoint của bạn
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    // Xử lý cập nhật giá trị
    const handleChange = (key: keyof UserProfile, value: string) => {
        if (formData) {
            setFormData({ ...formData, [key]: value });
        }
    };

    // Gửi yêu cầu cập nhật đến API
    const handleUpdate = (key: keyof UserProfile) => {
        if (formData) {
            axios
                .put(`http://localhost:3000/api/user/update`, {
                    [key]: formData[key],
                })
                .then(() => {
                    toast.success(`${key} updated successfully!`);
                })
                .catch((error) => {
                    toast.error("Error updating user data:", error);
                });
        }
    };
    // Xử lý chọn file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Gửi ảnh lên Cloudinary và cập nhật avatar
    const handleAvatarUpload = () => {
        if (!selectedFile || !formData) {
            toast.error("Please select a file first!");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("file", selectedFile);
        formDataToSend.append("upload_preset", "itss"); // Sử dụng preset đã tạo

        // Gửi file lên Cloudinary
        axios
            .post("https://api.cloudinary.com/v1_1/dgkfmvxat/image/upload", formDataToSend)
            .then((response) => {
                const avatarUrl = response.data.secure_url; // URL của ảnh đã tải lên
                // Cập nhật avatar URL trong database bằng PUT
                axios
                    .put("http://localhost:3000/api/user/update", {
                        user_id: formData.user_id,
                        avatar: avatarUrl,
                    })
                    .then(() => {
                        toast.success("Avatar updated successfully!");
                        setFormData({ ...formData, avatar: avatarUrl });
                    })
                    .catch((error) => {
                        console.error("Error updating avatar in the database:", error);
                    });
            })
            .catch((error) => {
                console.error("Error uploading avatar to Cloudinary:", error);
            });
    };

    if (!formData) {
        return <div>Loading...</div>; // Hiển thị loading khi dữ liệu đang được tải
    }

    return (
        <div className="profile">
            <div className="avatar">
                <img src={formData.avatar} alt="User Avatar" className="avatar-img" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" id="file-input" style={{ display: "none" }} />
                <button className="button-update-avatar" onClick={() => document.getElementById("file-input")?.click()}>
                    Update Avatar
                </button>
                {selectedFile && <button className="button-upload-avatar" onClick={handleAvatarUpload}></button>}
            </div>
            {/* Form hiển thị thông tin */}
            <div className="form">
                {/* Form elements here */}
                <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>YOUR PROFILE</h2>

                <div className="item">
                    <input className="input" type="text" value={formData.username} onChange={(e) => handleChange("username", e.target.value)} />
                    <button className="change" onClick={() => handleUpdate("username")}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>

                {/* First Name and Last Name */}
                <div className="row">
                    <div className="item">
                        <input className="input" type="text" value={formData.first_name} onChange={(e) => handleChange("first_name", e.target.value)} />
                        <button className="change" onClick={() => handleUpdate("first_name")}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </div>
                    <div className="item">
                        <input className="input" type="text" value={formData.last_name} onChange={(e) => handleChange("last_name", e.target.value)} />
                        <button className="change" onClick={() => handleUpdate("last_name")}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </div>
                </div>
                <div className="item">
                    <input className="input" type="text" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    <button className="change" onClick={() => handleUpdate("phone")}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
                <div className="item">
                    <input className="input" type="text" value={formData.gmail} onChange={(e) => handleChange("gmail", e.target.value)} />
                    <button className="change" onClick={() => handleUpdate("gmail")}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
                <div className="item">
                    <input className="input" type="text" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
                    <button className="change" onClick={() => handleUpdate("address")}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
            </div>
        </div>
    );
}
