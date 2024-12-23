import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Location: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [manualAddress, setManualAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  const fetchCurrentLocation = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setCurrentLocation({
          display_name: `Vị trí của bạn: ${data.display_name}`,
          lat,
          lon,
        });
      }
    } catch {
      setError("Không thể lấy địa chỉ hiện tại.");
    }
  };

  const handleInputFocus = () => {
    if (hasSelected) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCurrentLocation(latitude, longitude);
        },
        () => {
          setError("Không thể lấy vị trí hiện tại.");
        }
      );
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!manualAddress.trim()) {
        setSuggestions(currentLocation ? [currentLocation] : []);
        return;
      }

      setLoadingSuggestions(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            manualAddress
          )}`
        );
        const data = await response.json();

        setSuggestions(
          currentLocation ? [currentLocation, ...data] : data
        );
      } catch {
        setError("Không thể lấy dữ liệu gợi ý.");
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (!hasSelected) fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [manualAddress, currentLocation, hasSelected]);

  const handleSuggestionClick = (suggestion: any) => {
    const { lat, lon, display_name } = suggestion;

    const cleanedAddress = display_name.replace(/,\s*\d{5,}(?=,|$)/, "");

    setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setManualAddress(cleanedAddress);
    setSuggestions([]);
    setError(null);
    setHasSelected(true);
  };

  return (
    <div className="p-4">
      {/* Form Nhập Địa Chỉ */}
      <div className="mt-4 relative">
        <div className="relative flex items-center">
          {/* Icon Bản Đồ */}
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="absolute left-3 text-gray-500"
          />
          {/* Input */}
          <input
            type="text"
            placeholder="Nhập địa chỉ (vd: 8 Bùi Ngọc Dương, Thanh Nhàn, Hai Bà Trưng, Việt Nam)"
            value={manualAddress}
            onFocus={handleInputFocus}
            onChange={(e) => {
              setManualAddress(e.target.value);
              setHasSelected(false);
            }}
            className="border border-gray-300 rounded-lg pl-10 px-4 py-2 w-96 mb-2"
          />
        </div>

        {loadingSuggestions && !hasSelected && (
          <p className="text-gray-500">Đang tải gợi ý...</p>
        )}

        {/* Danh sách gợi ý */}
        {!hasSelected && (
          <ul
            className="absolute border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto w-full mt-1"
            style={{ width: "calc(100% - 2px)" }} // Tính toán độ rộng danh sách khớp với ô input
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Location;
