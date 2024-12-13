// src/components/CardBlackList.tsx
import React from "react";
import "./CardBlackList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

interface CafeCardProps {
  avatar: string;
  name: string;
  rate: number;
  time_open: string;
  style: string;
  address: string;
  store_id: number; // Nhận thêm store_id
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
  return (
    <div className="card">
      <div className="card-left">
        <img src={avatar} className="profile-pic" />
      </div>
      <div className="card-right">
        <div className="cafe-name">
          {name}
          <FontAwesomeIcon 
            icon={faBan} 
            className="ban-icon" 
            onClick={() => handleRemoveStore(store_id)} // Kích hoạt hàm xử lý
          />
        </div>
        <div className="rating-stars">⭐ {rate} / 5</div>
        <div className="info-row">
          <span className="info"><b>Time open:</b> {time_open}</span>
        </div>
        <div className="info-row">
          <span className="info"><b>Style:</b> {style}</span>
        </div>
        <div className="info-row">
          <span className="info"><b>Address:</b> {address}</span>
        </div>
      </div>
    </div>
  );
};

export default CardBlackList;
