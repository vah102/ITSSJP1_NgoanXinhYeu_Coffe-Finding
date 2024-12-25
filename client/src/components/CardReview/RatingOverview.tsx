import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type RatingOverviewProps = {
  reviews: {
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
  averageRating: number; // Điểm trung bình từ thông tin quán
};

function RatingOverview({ reviews, averageRating }: RatingOverviewProps) {
  // Tính toán tỷ lệ phần trăm của mỗi sao (1 sao, 2 sao, v.v.)
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    percentage: (reviews.filter(review => review.rate === star).length / reviews.length) * 100,
  }));

  return (
    <div className="flex gap-8 p-6">
      {/* Hiển thị điểm trung bình của quán */}
      <div className="flex flex-col items-center justify-center flex-[2] space-y-2">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={
                index + 1 <= averageRating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
              size="2x"
            />
          ))}
        </div>
        <span className="text-4xl font-bold">{averageRating}</span>
        <span className="text-4xl text-gray-500">Rating Overall</span>
      </div>

      {/* Hiển thị tỷ lệ phần trăm cho từng sao */}
      <div className="flex-[3]">
        {ratingBreakdown.map(({ stars, percentage }) => (
          <div key={stars} className="flex items-center gap-2 mb-2">
            <span className="w-20 text-lg font-semibold">{stars} stars</span>
            <div className="flex-1 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-20 text-lg font-semibold text-right">{percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingOverview;
