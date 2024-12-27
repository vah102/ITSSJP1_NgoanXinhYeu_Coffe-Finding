import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
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
import Menu from "../../components/Menu/Menu";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import ReviewCard from "../../components/CardReview/ReviewCard";
import RatingOverview from "../../components/CardReview/RatingOverview";
import ReviewForm from "../../components/CardReview/ReviewForm";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination";

type User = {
  username: string;
  avatar: string;
};

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
  Reviews: {
    id: number;
    user_id: number;
    rate: number;
    comment: string;
    image: string;
    User: {
      username: string;
      avatar: string;
    };
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
  const{t}=useTranslation();
  const { store_id } = useParams(); // Lấy id từ URL để gọi dữ liệu cho quán
  const navigate = useNavigate(); // Hook điều hướng
  const { data, loading } = useFetch<Store>(
    `http://localhost:3000/api/store-details/${store_id}`
  );
  const { data: user, loading: userLoading } = useFetch<User>(
    `http://localhost:3000/api/user/profile`
  );
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  const menuDetails = data?.Menus?.flatMap((menu) => menu.MenuDetails) || [];
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí bắt đầu

  const itemsPerPage = 3; // Số mục hiển thị mỗi lần
  const totalPages = Math.ceil(menuDetails.length / itemsPerPage);

  // Xử lý nút sang trái
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  // Xử lý nút sang phải
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Lấy các mục cần hiển thị
  const visibleItems = menuDetails.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );
  const paddedItems =
    visibleItems.length < itemsPerPage
      ? [
          ...visibleItems,
          ...menuDetails.slice(0, itemsPerPage - visibleItems.length),
        ]
      : visibleItems;

  const Features = data?.Features || [];
  const Reviews = data?.Reviews || [];
  const itemsPerPageReview = 2; // Số review mỗi trang
  const [currentPage, setCurrentPage] = useState(0);

  // Tính toán dữ liệu hiển thị
  const currentItems = Reviews.slice(
    currentPage * itemsPerPageReview,
    (currentPage + 1) * itemsPerPageReview
  );
  const pageCount = Reviews
    ? Math.ceil(Reviews.length / itemsPerPageReview)
    : 1;

  // Hàm xử lý khi chuyển trang
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  const token = Cookies.get("token");

  const API_URL = "http://localhost:3000/api/blacklist";
  const handleBlacklist = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        { store_id: store_id },
        {
          withCredentials: true,
        }
      );
      setIsBlacklisted(true);
      navigate("/");
      return response.data; // Trả về dữ liệu blacklist detail mới được thêm
    } catch (error) {
      throw new Error("Failed to add store to blacklist");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blacklist/all`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        response.data.Blacklist_details.forEach((item: any) => {
          if (item.store_id === store_id) {
            setIsBlacklisted(true);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching blacklist details:", error);
      });

    //review
    const handleReviewSubmit = (
      rating: number,
      comment: string,
      photo: string | null
    ) => {
      console.log("Submitted Review:");
      console.log("Rating:", rating);
      console.log("Comment:", comment);
      console.log("Photo:", photo);
      // Gửi dữ liệu lên server hoặc cập nhật lại state
    };
  }, [store_id, token]);

  function handleReviewSubmit(
    rating: number,
    comment: string,
    photo: string | null
  ): void {
    throw new Error("Function not implemented.");
  }

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
        <div className="relative w-[480px] min-w-96 z-10 flex items-end h-full p-16 ml-24">
          {/* Container bọc thông tin */}
          <div className="h-64 bg-white p-6 rounded-lg shadow-lg flex items-center w-[1000px]">
            {/* Logo */}
            <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-2 border-gray-300 mr-6">
              <img src={data?.logo} className="object-cover w-full h-full" />
            </div>
            <div className="ml-6 flex flex-col space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">{data?.name}</h1>
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStarSolid}
                    className={
                      index + 1 <= (data?.rate ?? 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                    size="lg"
                  />
                ))}
                <span className="pl-6 text-3xl font-semibold text-gray-700">
                  {data?.rate ?? 0}
                </span>
              </div>
              <h2 className="text-2xl text-gray-700 font-semibold">
                {data?.style}
              </h2>
              <h3 className="text-2xl text-green-400 font-semibold">
                {t("store.open_now")}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex px-16 py-8 space-x-8">
        {/* left */}
        <div className="w-2/3 space-y-8">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              isBlacklisted
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => {
              handleBlacklist();
            }}
            disabled={isBlacklisted}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>{t("store.blacklist")}</span>
          </button>

          {/* Menu */}
          <div className="bg-white p-12 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{t("store.menu")}</h2>
            <div className="relative">
              {/* Bao bọc menu và nút trong container */}
              <div className="">
                {/* Nút Sang Trái */}
                <button
                  onClick={handlePrev}
                  className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 p-16 z-10"
                >
                  <FontAwesomeIcon icon={faCircleChevronLeft} />
                </button>

                {/* Danh sách Menu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-6">
                  {paddedItems.map((item, index) => (
                    <div key={index} className="relative">
                      <Menu item={item} />
                    </div>
                  ))}
                </div>

                {/* Nút Sang Phải */}
                <button
                  onClick={handleNext}
                  className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 p-16 z-10"
                >
                  <FontAwesomeIcon icon={faCircleChevronRight} />
                </button>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="bg-white p-12 rounded shadow">
            <h2 className="text-3xl font-bold mb-4 p-6">{t("store.location_hour")}</h2>
            <div className="flex space-x-4">
              <div className="w-1/2 h-96 bg-gray-300">
                <iframe
                  src={data?.map}
                  style={{ border: "0" }}
                  loading="lazy"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              <div className="w-1/2 p-12">
                <p className="text-2xl font-semibold mb-2">{t("store.open_hour")}</p>
                <ul className="text-2xl space-y-2">
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.mon")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.tue")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.wed")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.thu")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                    <span></span>
                    <span className="text-green-500">{t("store.open_now")}</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.fri")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.sat")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                  <li className="grid grid-cols-5 gap-0">
                    <span>{t("store.sun")}:</span>
                    <span>{data?.time_open} AM -</span>
                    <span>{data?.time_close} PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*Amenities and more*/}
          <div className="bg-white p-12 rounded shadow">
            <h2 className="text-3xl font-bold mb-4">{t("store.amenities")}</h2>
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
          {/* Review */}
          <div className="bg-white p-12 rounded shadow">
            <h2 className="text-3xl font-bold mb-4">{t("store.review")}</h2>
            {/* Phần ReviewForm */}
            {token ? (
              <ReviewForm
                username={user?.username ?? ""} // Tên người dùng lấy từ auth hoặc props
                avatar={user?.avatar ?? ""} // Avatar người dùng
                store_id={data?.store_id ?? ""}
                onSubmit={handleReviewSubmit} // Hàm gửi review
              />
            ) : (
              <p className="text-gray-600">Please log in to submit a review.</p> // Thông báo nếu chưa đăng nhập
            )}
            {/* Tổng quan đánh giá */}
            <RatingOverview
              reviews={data?.Reviews ?? []}
              averageRating={data?.rate ?? 0}
            />{" "}
            {/* Danh sách review */}
            {Reviews.length > 0 ? (
              <div className="space-y-8">
                {currentItems.map((review) => {
                  const user = review.User || {};
                  return (
                    <ReviewCard
                      key={review.id}
                      item={{
                        avatar: user.avatar || "default-avatar.png",
                        username: user.username || "Anonymous",
                        time: "24/12/2024", // Nếu có thời gian thực trong dữ liệu review, hãy thay vào đây
                        rate: review.rate,
                        comment: review.comment,
                        image: review.image || "",
                      }}
                    />
                  );
                })}

                {/* Pagination */}
                <Pagination pages={pageCount} onPageChange={handlePageClick} />
              </div>
            ) : (
              <p className="text-black">No reviews yet.</p>
            )}
          </div>
        </div>
        {/* right */}
        {/* Right Column */}
        <div className="w-1/3 h-full flex flex-col space-y-8 bg-[#F6F7F1] sticky top-32 mb-6 gap-4 p-12 ">
          {/* Description */}
          <div className="bg-white p-12">
            <p className="flex items-center space-x-2">
              <span> {data?.description}</span>
            </p>
          </div>
          {/* Contact Info */}
          <div className="bg-white p-12">
            <p className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="pr-6" />
              <span>{data?.phone}</span>
            </p>
          </div>

          {/* Map */}
          <div className="bg-white p-12">
            <p className="flex items-center space-x-2 mt-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="pr-6" />
              <span>{data?.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
