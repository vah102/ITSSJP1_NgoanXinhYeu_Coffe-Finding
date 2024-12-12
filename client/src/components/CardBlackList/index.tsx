import React from "react";
import "./CardBlackList.css";

interface CafeCardProps {
  avatar: string;
  name: string;
  rate: number;
  time_open: string;
  style: string;
  address: string;
}

const CardBlackList: React.FC<CafeCardProps> = ({
  avatar,
  name,
  rate,
  time_open,
  style,
  address,
}) => {
  return (
    <div className="card">
      <div className="card-left">
        <img src={avatar} alt={name} className="profile-pic" />
      </div>
      <div className="card-right">
        <div className="cafe-name">{name}</div>
        <div className="rating-stars">⭐ {rate} / 5</div>
        <div className="info-row">
          <span className="info"><b>Thời gian mở cửa:</b> {time_open}</span>
        </div>
        <div className="info-row">
          <span className="info"><b>Phong cách:</b> {style}</span>
        </div>
        <div className="info-row">
          <span className="info"><b>Địa chỉ:</b> {address}</span>
        </div>
      </div>
    </div>
  );
};

export default CardBlackList;
