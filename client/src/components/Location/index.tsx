import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../services/contexts/SearchContext";

function Location() {
  const search = useSearchContext();

  const [error, setError] = useState<string | null>(null);
  const [manualAddress, setManualAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  // Tự động lấy vị trí người dùng khi vào trang
  useEffect(() => {
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
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Lấy vị trí hiện tại và đặt địa chỉ
  const fetchCurrentLocation = async (lat: number, lon: number) => {
    search.saveLocationValues({ lat, lon });
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setManualAddress(data.display_name);
        setHasSelected(true);
      }
    } catch {
      setError("Unable to fetch current location address.");
    }
  };

  // Lấy danh sách gợi ý địa chỉ từ API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!manualAddress.trim() || hasSelected) return;

      setLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            manualAddress
          )}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch {
        setError("Unable to fetch suggestions.");
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceFetch);
  }, [manualAddress, hasSelected]);

  // Xử lý khi người dùng chọn gợi ý
  const handleSuggestionClick = (suggestion: any) => {
    const { lat, lon, display_name } = suggestion;
    search.saveLocationValues({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setManualAddress(display_name);
    setSuggestions([]);
    setError(null);
    setHasSelected(true);
  };

  return (
    <div className="mt-3">
      {/* Form nhập địa chỉ */}
      <div className="relative">
        <div className="relative flex items-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="absolute left-3 text-gray-500"
          />
          <input
            type="text"
            placeholder="Enter address (or auto-detected)"
            value={manualAddress}
            onFocus={() => setHasSelected(false)}
            onChange={(e) => {
              setManualAddress(e.target.value);
              setHasSelected(false);
            }}
            className="border border-gray-300 rounded-lg pl-10 px-4 py-2 w-[250px] mb-1"
          />
        </div>

        {/* Danh sách gợi ý */}
        {loadingSuggestions ? (
          <p className="mt-2 text-gray-500">Loading suggestions...</p>
        ) : (
          !hasSelected &&
          suggestions.length > 0 && (
            <ul className="absolute z-50 border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto w-96 mt-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )
        )}
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Location;
