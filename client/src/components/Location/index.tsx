import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useTranslation } from "react-i18next";

function Location () {
  const search = useSearchContext();
  const{t}=useTranslation();
  // const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({
  //   lat: null,
  //   lon: null,
  // });
  const [error, setError] = useState<string | null>(null);
  const [manualAddress, setManualAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  // Lấy vị trí hiện tại của người dùng
  const fetchCurrentLocation = async (lat: number, lon: number) => {
    // setLocation({ lat, lon }); // Lưu tọa độ vào state
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

  // Xử lý khi người dùng focus vào ô input
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

  // Lấy danh sách gợi ý địa chỉ từ API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!manualAddress.trim()) return;

      setLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            manualAddress
          )}`
        );
        const data = await response.json();
        console.log("Dữ liệu API trả về:", data); 
        setSuggestions(data);
      } catch {
        setError("Unable to fetch suggestions.");
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (!hasSelected) fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [manualAddress, hasSelected]);

  // Xử lý khi người dùng chọn gợi ý
  const handleSuggestionClick = (suggestion: any) => {
    const { lat, lon, display_name } = suggestion;
    search.saveLocationValues({ lat: parseFloat(lat), lon: parseFloat(lon) });
    // setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) }); // Lưu tọa độ
    setManualAddress(display_name); // Hiển thị địa chỉ
    setSuggestions([]);
    setError(null);
    setHasSelected(true);
  };
    // // Log tọa độ khi state location thay đổi
    // useEffect(() => {
    //   if (location.lat && location.lon) {
    //     console.log("Tọa độ người dùng:");
    //     console.log("Vĩ độ (Latitude):", location.lat);
    //     console.log("Kinh độ (Longitude):", location.lon);
    //   }
    // }, [location]);

    const sendLocationToBackend = async (latitude: number, longitude: number) => {
      try {
        // Xây dựng URL với query string
        const url = `http://localhost:3000/api/home/search-filter?latitude=${latitude}&longitude=${longitude}&sortOrder=ASC`;
    
        // Gửi yêu cầu GET tới API
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        // Kiểm tra phản hồi
        if (!response.ok) {
          throw new Error("Failed to send location to the server.");
        }
    
        const data = await response.json();
        console.log("Location sent successfully:", data);
      } catch (error) {
        console.error("Error sending location:", error);
      }
    };
    
  
    // Log và gửi tọa độ khi state location thay đổi
    useEffect(() => {
      if (search.location.lat && search.location.lon) {
        console.log("Tọa độ người dùng:");
        console.log("Vĩ độ (Latitude):", search.location.lat);
        console.log("Kinh độ (Longitude):", search.location.lon);
  
        // Gửi tọa độ đến Backend
        // sendLocationToBackend(location.lat, location.lon);
      }
    }, [location]);

  return (
    <div className={`mt-3`}>
      {/* Form nhập địa chỉ */}
      <div className="relative">
        <div className="relative flex items-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="absolute left-3 text-gray-500"
          />
          <input
            type="text"
            placeholder={t("home.enter_address")}
            value={manualAddress}
            onFocus={handleInputFocus}
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
  
};

export default Location;
