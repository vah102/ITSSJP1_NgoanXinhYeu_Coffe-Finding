// src/components/CardBlackList.tsx
import React, { useEffect, useState } from "react";
import "./CardBlackList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CafeCardProps {
    avatar: string;
    name: string;
    rate: number;
    time_open: string;
    style: string;
    address: string;
    store_id: number;
    handleRemoveStore: (storeId: number) => void; // Hàm xử lý xóa
}

const CardBlackList: React.FC<CafeCardProps> = ({
    avatar,
    name,
    rate,
    time_open,
    style,
    address,
    store_id,
    handleRemoveStore,
}) => {
    const handleBanClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault(); // Hàm ngăn khi bấm Ban chuyển sang trang storedetail
        e.stopPropagation();
        handleRemoveStore(store_id);
    };
    const { t } = useTranslation();

    const savedLanguage = localStorage.getItem("language") || "en";
    const [language, setLanguage] = useState(0);
    useEffect(() => {
        switch (savedLanguage) {
            case "en":
                setLanguage(0);
                break;
            case "jp":
                setLanguage(2);
                break;
            case "vi":
                setLanguage(1);
                break;
            default:
                setLanguage(0);
                break;
        }
    }, [savedLanguage]);

    const styles = style.split("|").map((i) => i.trim());
    const addresses = address.split("|").map((i) => i.trim());

    return (
        <Link to={`/storedetail/${store_id}`} className="wrapper">
            <div className="card">
                <div className="card-left">
                    <img src={avatar} className="profile-pic" />
                </div>
                <div className="card-right">
                    <div className="cafe-name1">
                        {name}
                        <FontAwesomeIcon
                            icon={faBan}
                            className="ban-icon"
                            onClick={handleBanClick}
                        />
                    </div>
                    <div className="rating-stars">⭐ {rate} / 5</div>
                    <div className="info-row">
                        <span className="info">
                            <b>{t("hour.timeOpen")}</b> {time_open}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info">
                            <b>{t("hour.style")}:</b> {styles[language]}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info">
                            <b>{t("hour.address")}:</b> {addresses[language]}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CardBlackList;
