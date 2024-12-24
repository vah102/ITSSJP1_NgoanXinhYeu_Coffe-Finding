type ReviewCardProps = {
  item: {
    avatar: string;
    username: string;
    time: string;
    rating: number;
    comment: string;
    images: string[];
  };
};

// function ReviewCard({ item }: ReviewCardProps) 
function ReviewCard() {
  return (
    <div >
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src="https://i.pinimg.com/1200x/18/78/5d/18785dd07c09465d01beef679baf1846.jpg"
          alt="user avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-2xl font-semibold">nguyen_van_anh</h3>
          <p className="text-xl text-gray-500">24/12/2024</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 ${
              star <= 5 ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927a1 1 0 011.902 0l1.716 3.485 3.847.558a1 1 0 01.554 1.705l-2.783 2.713.657 3.833a1 1 0 01-1.451 1.054L10 13.347l-3.442 1.81a1 1 0 01-1.451-1.054l.657-3.833L3.013 8.675a1 1 0 01.554-1.705l3.847-.558 1.716-3.485z" />
          </svg>
        ))}
      </div>

      {/* Comment */}
      <p className="text-xl text-gray-700 mb-4 line-clamp-3">Day la comment cua tui hello</p>

      {/* Images */}
      <div className="mb-4">
    <img
      src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/470206186_596848982706216_4750959494286782043_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEevazFLx2FYB91yg1n6cZmTEhqlEz4c_tMSGqUTPhz-3vbt17ry8A8dZyaoygupLMHZ08AaxXOVSRZoxDUDA-f&_nc_ohc=u_IkqFOHrToQ7kNvgHH1GcK&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=ApAxDDmAYfcdmFIzk1nvYCG&oh=00_AYB05ToU5HUpjgvTqUCTX_6Hg0aYkPqZTzRgXUnTHNXqfQ&oe=67706814"// Chỉ hiển thị ảnh đầu tiên
      alt={`Review Image`}
      className="w-full h-32 object-cover rounded-lg"
    />
  </div>
  </div>
  );
}

export default ReviewCard;
