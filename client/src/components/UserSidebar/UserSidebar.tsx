// import React, { useEffect, useState } from "react";
// import { faUser, faBan } from "@fortawesome/free-solid-svg-icons";
// import { FaUserAlt } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import { VscCircleSlash } from "react-icons/vsc";
// import { UserProfile } from "../../pages/Profile/Profile";
// import axios from "axios";

// export default function UserSidebar() {
//     const [formData, setFormData] = useState<UserProfile | null>(null);
//     // Lấy dữ liệu từ API khi component được render
//     useEffect(() => {
//         axios
//             .get("http://localhost:3000/api/user/profile") // Thay bằng endpoint của bạn
//             .then((response) => {
//                 setFormData(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching user data:", error);
//             });
//     }, []);
//     return (
//         <div className="bg-[var(--color-secondary)] w-[250px] h-[535px] rounded-[10px] pl-[25px] pb-[25px] flex flex-col gap-[20px]">
//             <div className="w-full flex flex-row items-center gap-[10px]">
//                 <FaUserAlt />
//                 <h2 className="text-3xl font-bold">@{formData?.username}</h2>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//                 <Link className="link" to="/profile" style={{ color: "unset", textDecoration: "none " }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         <FontAwesomeIcon icon={faUser} />
//                         <span className="title">Profile</span>
//                     </div>
//                 </Link>
//                 <Link className="link" to="/blacklist" style={{ color: "unset", textDecoration: "none " }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         <FontAwesomeIcon icon={faBan} />
//                         <span className="title">Blacklist</span>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { faUser, faBan } from "@fortawesome/free-solid-svg-icons";
import { FaUserAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { UserProfile } from "../../pages/Profile/Profile";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function UserSidebar() {
    const [formData, setFormData] = useState<UserProfile | null>(null);
    const [activeLink, setActiveLink] = useState<string>("profile"); // State để theo dõi link đang được chọn
    const { t } = useTranslation();
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

    return (
        <div className="bg-[var(--color-secondary)] w-[250px] h-[535px] rounded-[10px] pl-[25px] pb-[25px] flex flex-col gap-[20px]">
            <div className="w-full flex flex-row items-center gap-[10px]" style={{ marginTop: "15px", paddingLeft: "10px" }}>
                <FaUserAlt />
                <h2 className="text-3xl font-bold">@{formData?.username}</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                <Link
                    className={`link ${activeLink === "profile" ? "font-bold bg-[var(--color-secondary-dark)]" : ""}`} // Đổi kiểu khi active
                    to="/profile"
                    style={{ color: "unset", textDecoration: "none", paddingLeft: "20px" }}
                    onClick={() => setActiveLink("profile")} // Cập nhật trạng thái khi nhấn vào
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px" }}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="title">{t("header.profile")}</span>
                    </div>
                </Link>
                <Link
                    className={`link ${activeLink === "blacklist" ? "font-bold bg-[var(--color-secondary-dark)]" : ""}`} // Đổi kiểu khi active
                    to="/blacklist"
                    style={{ color: "unset", textDecoration: "none", paddingLeft: "20px" }}
                    onClick={() => setActiveLink("blacklist")} // Cập nhật trạng thái khi nhấn vào
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px" }}>
                        <FontAwesomeIcon icon={faBan} />
                        <span className="title">{t("blacklist")}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
