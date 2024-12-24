import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

interface Parameter {
  className?: string;
}

const Location: React.FC = ({ className }: Parameter) => {
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
        const locationData = {
          display_name: data.display_name, // Địa chỉ đầy đủ
          short_name: "Current Location", // Tên ngắn gọn
          lat,
          lon,
        };
        setCurrentLocation(locationData);

        // Điền trực tiếp vào ô input nếu chưa có dữ liệu
        if (!manualAddress) {
          setManualAddress(locationData.display_name);
          setHasSelected(true); // Đánh dấu là đã chọn
        }
      }
    } catch {
      setError("Cannot fetch current location.");
    }
  };

  const handleInputFocus = () => {
    if (hasSelected) return; // Không thực hiện nếu đã chọn địa chỉ
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCurrentLocation(latitude, longitude);
        },
        () => {
          setError("Unable to access location.");
        }
      );
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!manualAddress.trim()) {
        // Hiển thị "Current Location" nếu ô nhập trống
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

        setSuggestions(data); // Hiển thị danh sách gợi ý từ API
      } catch {
        setError("Cannot fetch suggestions.");
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

    setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setManualAddress(display_name);
    setSuggestions([]);
    setError(null);
    setHasSelected(true);
  };

  return (
    <div className="mt-3">
      {/* Form Nhập Địa Chỉ */}
      <div className="relative">
        <div className="relative flex items-center mt-10">
          {/* Icon Bản Đồ */}
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="absolute left-3 text-gray-500"
          />
          {/* Input */}
          <input
            type="text"
            placeholder="Enter address (e.g., 8 Bùi Ngọc Dương, Thanh Nhàn, Hai Bà Trưng, Việt Nam)"
            value={manualAddress}
            onFocus={handleInputFocus}
            onChange={(e) => {
              setManualAddress(e.target.value);
              setHasSelected(false);
            }}
            className="border border-gray-300 rounded-lg pl-10 px-4 py-2 w-96 mb-1"
          />
        </div>

        {/* Danh sách gợi ý */}
        {!hasSelected && suggestions.length > 0 && (
          <ul className="absolute z-50 border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto w-96 mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                {/* Hiển thị icon cho "Current Location" */}
                {suggestion.short_name === "Current Location" && (
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-2 text-blue-500" />
                )}
                {suggestion.short_name || suggestion.display_name}
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
