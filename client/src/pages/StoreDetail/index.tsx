import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import {
  faSnowflake,
  faPhone,
  faMapMarkerAlt,
  faChild,
  faPlug,
  faSmoking,
  faWifi,
  faCreditCard,
  faChair,
  faPaw,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../services/hooks/useFetch";
import Menu from "../../components/Menu";

type Store = {
  store_id: string;
  name: string;
  address: string;
  logo: string;
  banner: string;
  style: string;
  rate: number;
  min_price: number;
  max_price: number;
  description: string;
  phone: string;
  map: string;
  time_close: string;
  time_open: string;
  Features: {
    feature_id: string;
    features_name: string;
  }[];
  Menus: {
    menu_id: string;
    store_id: string;
    MenuDetails: {
      id: string;
      dish_name: string;
      dish_price: number;
      description: string;
      dish_image: string;
    }[];
  }[];
};

const featureIcons: Record<string, JSX.Element> = {
  "Free wifi": <FontAwesomeIcon icon={faWifi} className="text-blue-500" />,
  "Air Conditioned": (
    <FontAwesomeIcon icon={faSnowflake} className="text-blue-500" />
  ),
  "Pet allowed": <FontAwesomeIcon icon={faPaw} className="text-blue-500" />,
  "Good for kids": <FontAwesomeIcon icon={faChild} className="text-blue-500" />,
  "Outdoor seating": (
    <FontAwesomeIcon icon={faChair} className="text-blue-500" />
  ),
  "Power Outlet": <FontAwesomeIcon icon={faPlug} className="text-blue-500" />,
  "Card payment": (
    <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />
  ),
  "Smoking room": (
    <FontAwesomeIcon icon={faSmoking} className="text-blue-500" />
  ),
  "Seeking Not Allowed": (
    <FontAwesomeIcon icon={faBan} className="text-blue-500" />
  ),
};

function StoreDetail() {
  const { store_id } = useParams(); // Lấy id từ URL để gọi dữ liệu cho quán
  const { data, loading } = useFetch<Store>(
    `http://localhost:3000/api/store-details/${store_id}`
  );
  const menuDetails = data?.Menus?.flatMap((menu) => menu.MenuDetails) || [];
  const Features = data?.Features || [];
  console.log(menuDetails);
  return (
    <div className="">
      <div className="w-full h-[320px] overflow-hidden relative">
        {/* Banner */}
        <img
          src={data?.banner}
          className="absolute inset-0 object-cover w-full h-full blur-sm"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Nội dung */}
        <div className="relative z-10 flex items-end h-full p-16 ml-24">
          {/* Container bọc thông tin */}
          <div className="h-64 bg-white p-6 rounded-lg shadow-lg flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-2 border-gray-300 mr-6">
              <img src={data?.logo} className="object-cover w-full h-full" />
            </div>
            <div className="ml-6 flex flex-col space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">{data?.name}</h1>
              <div className="flex items-center mt-2 text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                {data?.rate}
              </div>
              <h2 className="text-xl text-gray-700 font-semibold">
                {data?.style}
              </h2>
              <h3 className="text-xl text-green-500 font-semibold">Open now</h3>
            </div>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex px-16 py-8 space-x-8">
        {/* left */}
        <div className="w-2/3 space-y-8">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded">
            <FontAwesomeIcon icon={faBan} />
            <span>Blacklist</span>
          </button>
          {/* Menu */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuDetails &&
                menuDetails.map((item, index) => (
                  <div>
                    <Menu key={index} item={item} />
                  </div>
                ))}
            </div>
          </div>
          {/* Location & Hours */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Location & Hours</h2>
            <div className="flex space-x-4">
              <div className="w-1/2 h-48 bg-gray-300">
                <iframe
                  src={data?.map}
                  style={{ border: "0" }}
                  loading="lazy"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              <div className="w-1/2">
                <p className="text-lg font-semibold mb-2">Opening Hours:</p>
                <ul className="text-2xl space-y-1">
                  <li className="grid grid-cols-6 gap-0">
                    <span>Mon:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Tue:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Wed:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Thu:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Fri:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Sat:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-6 gap-0">
                    <span>Sun:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*Amenities and more*/}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Amenities and More</h2>
            <div className="grid grid-cols-2 gap-4">
              {Features &&
                Features.map((item, index) => (
                  <div className="flex items-center space-x-2">
                    {featureIcons[item.features_name] || (
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="text-gray-500"
                      />
                    )}
                    <span>{item.features_name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* right */}
        {/* Right Column */}
        <div className="w-1/3 min-h-5 space-y-8 bg-white">
          {/* Description */}
          <div className="bg-white p-6 ">
            <p className="flex items-center space-x-2">
              <span> {data?.description}</span>
            </p>
          </div>
          {/* Contact Info */}
          <div className="bg-white p-6 ">
            <p className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>{data?.phone}</span>
            </p>
          </div>

          {/* Map */}
          <div className="bg-white p-6 ">
            <p className="flex items-center space-x-2 mt-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{data?.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
