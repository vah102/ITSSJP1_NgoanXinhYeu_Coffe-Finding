import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type RatingOverviewProps = {
  item?: {
    average_rating: number;
    ratings: {
      stars: number;
      percentage: number;
    }[];
  };
};

function RatingOverview({ item }: RatingOverviewProps) {
  const mockData = {
    average_rating: 4.5,
    ratings: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
  };

  const data = item || mockData;

  return (
    <div className="flex gap-8 p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={
                index + 1 <= data.average_rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
              size="lg"
            />
          ))}
        </div>
        <span className="text-3xl font-bold">{data.average_rating}</span>
        <span className="text-gray-500">Overall</span>
      </div>

      <div className="flex-1">
        {data.ratings.map(({ stars, percentage }) => (
          <div key={stars} className="flex items-center gap-2 mb-2">
            <span className="w-12 text-sm">{stars} stars</span>
            <div className="flex-1 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-12 text-sm text-right">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingOverview;
