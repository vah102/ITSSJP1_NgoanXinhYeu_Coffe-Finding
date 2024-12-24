import React, { useState, useEffect } from "react";

interface LocationProps {
  lat: number | null;
  lon: number | null;
}

const LocationDisplay: React.FC<LocationProps> = ({ lat, lon }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await response.json();

          if (data && data.address) {
            const {
              house_number,
              road,
              neighbourhood,
              suburb,
              city,
              state,
              country,
            } = data.address;

            // Ghép các thành phần địa chỉ, loại bỏ postcode
            const fullAddress = `${house_number || ""} ${road || ""}, ${neighbourhood || ""}, ${suburb || ""}, ${city || ""}, ${state || ""}, ${country || ""}`.trim();

            setAddress(fullAddress || "Không tìm thấy địa chỉ đầy đủ");
          } else {
            setAddress("Không tìm thấy địa chỉ cụ thể");
          }
        } catch (error) {
          setAddress("Đã xảy ra lỗi khi lấy địa chỉ");
        }
      };

      fetchAddress();
    }
  }, [lat, lon]);

  return (
    <div>
      {address ? (
        <p>Địa chỉ: {address}</p>
      ) : (
        <p>Chưa có dữ liệu về địa chỉ</p>
      )}
    </div>
  );
};

export default LocationDisplay;
